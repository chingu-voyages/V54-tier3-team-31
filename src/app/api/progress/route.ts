import { NextResponse } from 'next/server'
import { db } from '@/lib/db/db'
import { goals, Goal, Task } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
    const TEST_USER_ID = '1' // Replace with the session userid after account/auth is set up

    const allGoals = await db.query.goals.findMany({
        where: eq(goals.userId, TEST_USER_ID),
        with: {
            tasks: true,
        },
    })

    const result = allGoals.map((goal: Goal & { tasks: Task[] }) => ({
        id: goal.id.toString(),
        title: goal.name,
        count: goal.tasks.filter((log: Task) => log.completed).length,
        completions: goal.tasks
            .filter((log: Task) => log.completed)
            .map((log: Task) => ({
                id: log.id,
                name: goal.name,
                frequency: goal.frequency || 'unknown',
                duration: log.completedAt?.toISOString() ?? log.updatedAt.toISOString(),
            })),
    }))
    return NextResponse.json(result)
}
