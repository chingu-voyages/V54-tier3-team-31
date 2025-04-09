import { NextResponse } from 'next/server'
import { db } from '@/lib/db/db'
import { goals, tasks } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'

export async function GET() {
    const TEST_USER_ID = 'seed-user-1' // Replace with the session userid after account/auth is set up

    try {
        // get completed tasks for the user
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
                and(eq(tasks.userId, TEST_USER_ID), eq(tasks.completed, true))
            )

        // Group tasks by goal
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
        const data = Object.values(groupedByGoal)

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching progress:', error)
        return NextResponse.json(
            { error: 'Failed to fetch progress' },
            { status: 500 }
        )
    }
}
