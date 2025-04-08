import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { habits } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
    const TEST_USER_ID = '1' // Replace with the session userid after account/auth is set up

    const allHabits = await db.query.habits.findMany({
        where: eq(habits.userId, TEST_USER_ID),
        with: {
            habitLogs: true,
        },
    })

    const result = allHabits.map((habit) => ({
        id: habit.id.toString(),
        title: habit.name,
        count: habit.habitLogs.filter((log) => log.completed).length,
        completions: habit.habitLogs
            .filter((log) => log.completed)
            .map((log) => ({
                id: log.id,
                name: habit.name,
                frequency: habit.frequency || 'unknown',
                duration: log.date.toISOString(),
            })),
    }))
    return NextResponse.json(result)
}
