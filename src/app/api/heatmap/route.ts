import { db } from '@/lib/db/db'
import { NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'

export async function GET() {
    // to do: get userId from session
    const TEST_USER_ID = 'seed-user-1'

    const userId = TEST_USER_ID

    try {
        const data = await db.execute(
            sql`
                SELECT
                    date,
                    count
                FROM heatmap_statistics
                WHERE user_id = ${userId}
            `
        )

        const heatmapData = data.rows.map((row) => ({
            date: row.date,
            count: Number(row.count),
        }))

        return NextResponse.json(heatmapData)
    } catch (error) {
        console.error('Error fetching heatmap data:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
