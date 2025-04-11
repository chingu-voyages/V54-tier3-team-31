import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db/db'
import { eq } from 'drizzle-orm'
import { heatmapStatisticsView } from '@/lib/db/schema'

export async function GET() {
    const session = await auth()
    const user_id = session?.user?.id
    try {
        if (user_id) {
            const completedTasks = await db
                .select()
                .from(heatmapStatisticsView)
                .where(eq(heatmapStatisticsView.userId, user_id))
            return NextResponse.json({ data: completedTasks })
        } else {
            return NextResponse.json({
                message: 'Fetch heatmap data client-side for anonymous users.',
            })
        }
    } catch (error) {
        console.error('Error fetching completed tasks view: ', error)
        return NextResponse.json(
            { error: 'Internal server Error' },
            { status: 500 }
        )
    }
}
