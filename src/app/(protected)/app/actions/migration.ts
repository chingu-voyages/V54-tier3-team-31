'use server'

import { auth } from '@/lib/auth' // Corrected path
import { db } from '@/lib/db/db' // Corrected path
import { goals, tasks, Task as TaskSchema } from '@/lib/db/schema' // Corrected path, removed unused Goal type
import { GoalWithTasks } from '@/lib/types/types' // Corrected path, assuming TaskFormValues is not needed here
import { eq } from 'drizzle-orm';

// Type for the data structure expected from localForage
interface LocalData {
    tasks: TaskSchema[]; // Standalone plan tasks from localForage
    goals: GoalWithTasks[]; // Goals with their nested tasks from localForage
}

export async function migrateLocalDataToDb(localData: LocalData) {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Not authenticated')
    const userId = session.user.id;

    console.log("Starting migration for user:", userId);
    console.log("Local Plan Tasks:", localData.tasks);
    console.log("Local Goals (with tasks):", localData.goals);


    // --- Migrate Standalone Tasks ---
    // Filter out any tasks that might have accidentally gotten a goalId in local storage
    const standaloneTasks = localData.tasks.filter(t => !t.goalId);
    if (standaloneTasks.length > 0) {
         console.log(`Migrating ${standaloneTasks.length} standalone tasks...`);
        // Prepare tasks for insertion, ensuring required fields and userId
        const tasksToInsert = standaloneTasks.map(task => ({
            // Explicitly map fields from TaskSchema, letting DB generate ID
            title: task.title,
            description: task.description,
            frequency: task.frequency,
            duration: task.duration,
            difficulty: task.difficulty,
            userId: userId, // Assign current user ID
            goalId: null, // Ensure goalId is null for plan tasks
            isInFocus: task.isInFocus ?? false,
            completed: task.completed ?? false,
            completedAt: task.completedAt,
            createdAt: task.createdAt || new Date(), // Use existing or new date
            updatedAt: new Date(),
        }));
        // Insert tasks, ignoring conflicts (e.g., if migration runs twice)
        await db.insert(tasks).values(tasksToInsert).onConflictDoNothing();
    }

    // --- Migrate Goals and Their Associated Tasks ---
    for (const localGoal of localData.goals) {
         console.log(`Migrating goal: ${localGoal.name}`);
         // Check if a goal with the same name already exists for this user
         const existingGoal = await db.select({ id: goals.id })
            .from(goals)
            .where(eq(goals.userId, userId) && eq(goals.name, localGoal.name))
            .limit(1);

         let newGoalId: number;

         if (existingGoal.length > 0) {
             // Goal already exists, use its ID. Optionally update it?
             newGoalId = existingGoal[0].id;
             console.log(`Goal "${localGoal.name}" already exists with ID ${newGoalId}. Skipping goal creation, migrating tasks.`);
             // Optionally update existing goal fields here if desired
             // await db.update(goals).set({ ... }).where(eq(goals.id, newGoalId));
         } else {
             // Insert the new goal
             const [newGoal] = await db.insert(goals).values({
                 // Map fields from GoalWithTasks (which includes Goal fields)
                 name: localGoal.name,
                 description: localGoal.description,
                 bestTimeTitle: localGoal.bestTimeTitle,
                 bestTimeDescription: localGoal.bestTimeDescription,
                 startDate: localGoal.startDate || new Date(),
                 endDate: localGoal.endDate,
                 frequency: localGoal.frequency,
                 userId: userId,
                 createdAt: localGoal.createdAt || new Date(),
                 updatedAt: new Date(),
                 // id: undefined, // Let DB generate ID
             }).returning({ id: goals.id });
             newGoalId = newGoal.id;
             console.log(`Created new goal "${localGoal.name}" with ID ${newGoalId}.`);
         }

        // Migrate tasks associated with this goal
        const goalTasks = localGoal.tasks || []; // Ensure tasks array exists
         if (goalTasks.length > 0) {
             console.log(`Migrating ${goalTasks.length} tasks for goal ID: ${newGoalId}`);
             // Prepare tasks for insertion
             const goalTasksToInsert = goalTasks.map(task => ({
                 title: task.title,
                 description: task.description,
                 frequency: task.frequency,
                 duration: task.duration,
                 difficulty: task.difficulty,
                 userId: userId, // Assign current user ID
                 goalId: newGoalId, // Link to the migrated/existing goal ID
                 isInFocus: task.isInFocus ?? false,
                 completed: task.completed ?? false,
                 completedAt: task.completedAt,
                 createdAt: task.createdAt || new Date(),
                 updatedAt: new Date(),
             }));
             // Insert tasks, ignoring conflicts
             await db.insert(tasks).values(goalTasksToInsert).onConflictDoNothing();
         }
    }
     console.log("Migration completed successfully for user:", userId);
}
