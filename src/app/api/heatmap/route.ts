import { NextResponse } from 'next/server'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'

dotenv.config()

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

import { pgTable, text, date } from 'drizzle-orm/pg-core'
import { eq } from 'drizzle-orm'

const heatmapStatisticsView = pgTable('heatmap_statistics', {
    userId: text('user_id').notNull(),
    completionDate: date('completion_date').notNull(),
    completedTasks: text('completed_tasks').notNull(),
})

export async function GET() {
    const TEST_USER_ID = 'seed-user-1'
    try {
        const completedTasks = await db
            .select()
            .from(heatmapStatisticsView)
            .where(eq(heatmapStatisticsView.userId, TEST_USER_ID))
        return NextResponse.json({ data: completedTasks })
    } catch (error) {
        console.error('Error fetching completed tasks view: ', error)
        return NextResponse.json(
            { error: 'Internal server Error' },
            { status: 500 }
        )
    }
}
