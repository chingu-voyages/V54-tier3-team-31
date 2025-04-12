'use server'

import { auth } from '@/lib/auth' // Corrected path
import { db } from '@/lib/db/db' // Corrected path
import { goals, tasks, Goal, Task } from '@/lib/db/schema' // Corrected path, added Goal & Task type
import { GoalFormValues, TaskFormValues, GoalWithTasks } from '@/lib/types/types' // Corrected path
import { eq, and } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { addTaskForUser } from './tasks'; // Import addTaskForUser

// Export the Goal type
export type { Goal };

// Type guard to check if an object is GoalWithTasks
// Refined to avoid 'any' cast if possible
function isGoalWithTasks(goal: unknown): goal is GoalWithTasks {
    return (
        goal !== null &&
        typeof goal === 'object' &&
        'tasks' in goal &&
        Array.isArray((goal as { tasks?: unknown }).tasks) // Check property existence and type
    );
}

export async function getGoalsForUser(): Promise<GoalWithTasks[]> {
    const session = await auth()
    if (!session?.user?.id) return []
    const userId = session.user.id;

    // Fetch goals and their associated tasks for the user using Drizzle relations
    const userGoals = await db.query.goals.findMany({
        where: eq(goals.userId, userId),
        with: {
            tasks: {
                where: eq(tasks.userId, userId) // Ensure tasks also belong to the user
            }
        },
        orderBy: (goals, { desc }) => [desc(goals.createdAt)]
    });

    // Sort tasks within each goal manually
    userGoals.forEach(goal => {
        if (goal.tasks) {
            goal.tasks.sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        }
    });

    // Ensure the return type matches GoalWithTasks[]
    return userGoals.map(goal => {
        if (isGoalWithTasks(goal)) {
            return goal; // If it matches the type guard, return it directly
        }
        // If it doesn't match the type guard (e.g., tasks array is missing),
        // return the goal object but ensure tasks is an empty array.
        // Cast to Goal to access properties, assuming it's at least a Goal object.
        const goalData = goal as Goal;
        return {
            ...goalData, // Spread the known Goal properties
            tasks: [] // Ensure tasks is an empty array
        };
    });
}


export async function addGoalForUser(values: GoalFormValues, isInFocus: boolean): Promise<GoalWithTasks> { // Changed return type to GoalWithTasks
    const session = await auth()
    if (!session?.user?.id) throw new Error('Not authenticated')
    const userId = session.user.id;

    // Create the goal first
    const [insertedGoal] = await db.insert(goals).values({
        name: values.name,
        bestTimeTitle: values.bestTimeTitle,
        bestTimeDescription: values.bestTimeDescription,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        // Set defaults for fields not in GoalFormValues
        description: null, // Default description
        startDate: new Date(), // Default start date
        endDate: null, // Default end date
        frequency: 'Daily', // Default frequency
    }).returning();

    // Add the default task associated with the new goal
    const [insertedTask] = await db.insert(tasks).values({
        title: 'Review and plan your goal steps', // Default task title
        userId: userId,
        goalId: insertedGoal.id, // Use the ID of the newly created goal
        frequency: 'Once', // Default task frequency
        duration: '5 mins', // Default task duration
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false,
        isInFocus,
    }).returning();

    revalidatePath('/app')
    revalidatePath('/plans')
    revalidatePath('/focus') // Revalidate focus in case goal tasks appear there

    // Return the goal with the newly created task included
    return {
        ...insertedGoal,
        tasks: [insertedTask] // Include the task in the tasks array
    };
}

 export async function editGoalForUser(goalId: number, values: Partial<GoalFormValues>): Promise<void> {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Not authenticated')

    // Remove properties not present in GoalFormValues (description, startDate, endDate, frequency)
    await db.update(goals).set({
        name: values.name,
        bestTimeTitle: values.bestTimeTitle,
        bestTimeDescription: values.bestTimeDescription,
        // description: values.description, // Removed
        // startDate: values.startDate, // Removed
        // endDate: values.endDate, // Removed
        // frequency: values.frequency, // Removed
        updatedAt: new Date(),
    }).where(and(eq(goals.id, goalId), eq(goals.userId, session.user.id)))

    revalidatePath('/app')
    revalidatePath('/plans')
    revalidatePath('/focus')
}

export async function deleteGoalForUser(goalId: number): Promise<void> {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Not authenticated')

    // Drizzle handles cascading deletes if set up in the schema (onDelete: 'cascade')
    // If not using cascade, delete associated tasks first:
    // await db.delete(tasks).where(and(eq(tasks.goalId, goalId), eq(tasks.userId, session.user.id)));

    await db.delete(goals).where(and(eq(goals.id, goalId), eq(goals.userId, session.user.id)))

    revalidatePath('/app')
    revalidatePath('/plans')
    revalidatePath('/focus')
}

// Server action for adding a task specifically to a goal for a logged-in user
export async function addTaskToGoalForUser(values: TaskFormValues, goalId: number, isInFocus?: boolean): Promise<Task> {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Not authenticated')
    const userId = session.user.id;

    // Verify the goal belongs to the user before adding the task
    const goalExists = await db.select({ id: goals.id }).from(goals)
        .where(and(eq(goals.id, goalId), eq(goals.userId, userId)))
        .limit(1);

    if (!goalExists.length) {
        throw new Error('Goal not found or access denied');
    }

    // Use the shared addTaskForUser logic, passing the goalId
    const newTask = await addTaskForUser(values, goalId, isInFocus);

    // addTaskForUser already handles revalidation
    return newTask;
}


// Add other goal-related server actions if needed
