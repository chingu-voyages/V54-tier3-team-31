import { NextResponse } from 'next/server'
import { db } from '@/lib/db/db'
import { goals, tasks } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'

export async function GET() {
    const session = await auth()
    const user_id = session?.user?.id

    try {
        if (user_id) {
            // Fetch progress for logged-in users
            const completedTasks = await db
                .select({
                    taskId: tasks.id,
                    taskTitle: tasks.title,
                    frequency: tasks.frequency,
                    duration: tasks.duration,
                    goalId: tasks.goalId,
                    goalName: goals.name,
                })
                .from(tasks)
                .leftJoin(goals, eq(tasks.goalId, goals.id))
                .where(
                    and(eq(tasks.userId, user_id), eq(tasks.completed, true))
                )

            const groupedByGoal = completedTasks.reduce<Record<number, any>>(
                (acc, task) => {
                    const goalId = task.goalId ?? 0
                    if (!acc[goalId]) {
                        acc[goalId] = {
                            id: goalId.toString(),
                            title: task.goalName ?? 'Ungrouped',
                            count: 0,
                            completions: [],
                        }
                    }
                    acc[goalId].count += 1
                    acc[goalId].completions.push({
                        id: task.taskId,
                        name: task.taskTitle,
                        frequency: task.frequency ?? '',
                        duration: task.duration ?? '',
                    })

                    return acc
                },
                {}
            )

            return NextResponse.json(Object.values(groupedByGoal))
        } else {
            // Return a message for anonymous users to fetch data client-side
            return NextResponse.json({
                message: 'Fetch progress data client-side for anonymous users.',
            })
        }
    } catch (error) {
        console.error('Error fetching progress:', error)
        return NextResponse.json(
            { error: 'Failed to fetch progress' },
            { status: 500 }
        )
    }
}
