'use server'

import { auth } from '@/lib/auth' // Corrected path
import { db } from '@/lib/db/db' // Corrected path
import { tasks, Task } from '@/lib/db/schema' // Corrected path and added Task type export assumption
import { TaskFormValues } from '@/lib/types/types' // Corrected path
import { eq, and, isNull, desc } from 'drizzle-orm' // Import isNull
import { revalidatePath } from 'next/cache'

export async function getTasksForUser(): Promise<Task[]> {
    const session = await auth()
    if (!session?.user?.id) return []
    // Fetch only tasks that are not associated with a goal (plan tasks)
    return await db.select().from(tasks)
        .where(and(eq(tasks.userId, session.user.id), isNull(tasks.goalId)))
        .orderBy(desc(tasks.createdAt)) // Order by newly created (newest first)
}

export async function addTaskForUser(values: TaskFormValues, goalId?: number, isInFocus?: boolean): Promise<Task> {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Not authenticated')

    const [newTask] = await db.insert(tasks).values({
        title: values.title,
        frequency: values.frequency,
        duration: values.duration,
        userId: session.user.id,
        goalId: goalId ?? null,
        isInFocus: isInFocus ?? false,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false, // Ensure default value
        completedAt: null, // Ensure default value
    }).returning()

    // Revalidate paths relevant to where the task might appear
    revalidatePath('/app') // General app view might show tasks
    if (goalId) {
        revalidatePath('/plans') // Goals are primarily in plans
    } else {
        revalidatePath('/plans') // Plan tasks are in plans
    }
    if (isInFocus) {
        revalidatePath('/focus') // If added directly to focus
    }

    return newTask
}

export async function editTaskForUser(taskId: number, values: Partial<TaskFormValues>, goalId?: number | null): Promise<void> {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Not authenticated')

    await db.update(tasks).set({
        title: values.title,
        frequency: values.frequency,
        duration: values.duration,
        goalId: goalId === undefined ? undefined : (goalId ?? null), // Handle null explicitly if passed
        updatedAt: new Date(),
    }).where(and(eq(tasks.id, taskId), eq(tasks.userId, session.user.id)))

    revalidatePath('/app')
    revalidatePath('/focus')
    revalidatePath('/plans')
}

export async function deleteTaskForUser(taskId: number): Promise<void> {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Not authenticated')

    await db.delete(tasks).where(and(eq(tasks.id, taskId), eq(tasks.userId, session.user.id)))

    revalidatePath('/app')
    revalidatePath('/focus')
    revalidatePath('/plans')
}

export async function toggleTaskFocusForUser(taskId: number, isInFocus: boolean): Promise<void> {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Not authenticated')

    await db.update(tasks).set({
        isInFocus,
        updatedAt: new Date(),
    }).where(and(eq(tasks.id, taskId), eq(tasks.userId, session.user.id)))

    revalidatePath('/focus')
    revalidatePath('/plans') // Revalidate plans too as focus star might be there
}

 export async function updateTaskCompletionForUser(taskId: number, completed: boolean, completedAt?: Date | null): Promise<void> {
    const session = await auth()
    if (!session?.user?.id) throw new Error('Not authenticated')

    await db.update(tasks).set({
        completed,
        completedAt: completed ? (completedAt ?? new Date()) : null, // Use provided date or now if completing, else null
        updatedAt: new Date(),
    }).where(and(eq(tasks.id, taskId), eq(tasks.userId, session.user.id)))

    revalidatePath('/focus') // Primarily affects focus view
    revalidatePath('/plans') // Also revalidate plans if checkboxes are used there
    revalidatePath('/progress') // Completion affects progress view
}

// Add other task-related server actions if needed (e.g., simplify)
