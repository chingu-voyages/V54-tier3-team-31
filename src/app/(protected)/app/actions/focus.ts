'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db/db'
import { tasks } from '@/lib/db/schema'
import { eq, and, or, not, gte, lt, isNotNull } from 'drizzle-orm' // Import necessary operators
import { revalidatePath } from 'next/cache'
import { Task } from '@/lib/db/schema'

export async function getFocusTasksForUser(): Promise<Task[]> {
    const session = await auth()
    if (!session?.user?.id) return []

    // Get current date at midnight for comparison
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Get the tasks that are in focus and either:
    // - not completed, or 
    // - completed today
    const focusTasks = await db.select().from(tasks).where(
        and(
            eq(tasks.userId, session.user.id),
            eq(tasks.isInFocus, true),
            // Condition: Task is not completed OR it was completed today or later
            or(
                not(eq(tasks.completed, true)), // Task is not completed
                and( // Task is completed...
                    eq(tasks.completed, true),
                    isNotNull(tasks.completedAt), // ...and completedAt is not null...
                    gte(tasks.completedAt, today) // ...and completedAt is today or later
                )
            )
        )
    )

    return focusTasks
}

export async function cleanupOldFocusTasks(): Promise<void> {
    const session = await auth()
    if (!session?.user?.id) return
    
    // Get yesterday's date
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    // Find completed tasks in focus from before yesterday and remove them from focus
    await db.update(tasks).set({
        isInFocus: false,
    }).where(
        and(
            eq(tasks.userId, session.user.id),
            eq(tasks.isInFocus, true),
            eq(tasks.completed, true),
            isNotNull(tasks.completedAt), // Ensure completedAt is not null before comparing
            lt(tasks.completedAt, yesterday) // completedAt is before yesterday
        )
    )

    revalidatePath('/focus')
}
