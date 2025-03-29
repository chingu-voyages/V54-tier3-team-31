import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { users, habits, habitLogs } from './db/schema'
import * as dotenv from 'dotenv'

dotenv.config()

// Make sure to use environment variables for the database URL
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is required')
}
// databaseUrl=databaseUrl.replace('-pooler', '');
// console.log('databaseUrl:', databaseUrl);

async function main() {
    console.log('Seeding database...')

    // Create the connection
    const pool = neon(process.env.DATABASE_URL!)
    const db = drizzle({ client: pool })

    // Clear existing data (optional - remove if you don't want to clear tables first)
    console.log('Clearing existing data...')
    await db.delete(habitLogs)
    await db.delete(habits)
    // await db.delete(users);

    // Seed users
    console.log('Creating users...')
    const usersResp = await db
        .insert(users)
        .values([
            {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                image: 'https://randomuser.me/api/portraits',
            },
            {
                id: '2',
                name: 'Jane Doe',
                email: 'jane@example.com',
                image: 'https://randomuser.me/api/portraits',
            },
        ])
        .returning()
    console.log('usersResp:', usersResp)

    // Seed habits
    console.log('Creating habits...')
    const habitsResp = await db
        .insert(habits)
        .values([
            {
                name: 'Morning Meditation',
                description: 'Meditate for 10 minutes every morning',
                userId: usersResp[0].id,
                frequency: 'daily',
                startDate: new Date(),
            },
            {
                name: 'Drink Water',
                description: 'Drink 8 glasses of water daily',
                userId: usersResp[0].id,
                frequency: 'daily',
                startDate: new Date(),
            },
            {
                name: 'Exercise',
                description: 'Go to the gym 3 times a week',
                userId: usersResp[1].id,
                frequency: 'weekly',
                startDate: new Date(),
            },
        ])
        .returning()

    // Seed habits logs
    console.log('Creating habits logs...')
    await db.insert(habitLogs).values([
        {
            date: new Date(),
            completed: true,
            description: 'Felt more focused after 10-minute morning meditation',
            habitId: habitsResp[0].id,
            userId: usersResp[0].id,
        },
        {
            date: new Date(Date.now() - 86400000), // yesterday
            completed: true,
            description: 'Completed all 8 glasses throughout the day',
            habitId: habitsResp[1].id,
            userId: usersResp[0].id,
        },
        {
            date: new Date(Date.now() - 86400000 * 2), // 2 days ago
            completed: false,
            description:
                'Was too busy with work, will try to make it to the gym tomorrow',
            habitId: habitsResp[2].id,
            userId: usersResp[1].id,
        },
    ])

    console.log('Database seeded successfully!')
    process.exit(0)
}

main().catch((error) => {
    console.error('Seeding failed:')
    console.error(error)
    process.exit(1)
})
