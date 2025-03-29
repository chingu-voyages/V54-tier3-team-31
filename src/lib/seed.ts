import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
// Import tasks, remove goalLogs
import { users, goals, tasks } from './schema';
import * as dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required');
}

async function main() {
  console.log('Seeding database...');

  const pool = neon(process.env.DATABASE_URL!);
  // Pass the schema to drizzle
  const db = drizzle({ client: pool, schema: { users, goals, tasks } });

  // Clear existing data (optional)
  console.log('Clearing existing data...');
  // Remove goalLogs delete
  await db.delete(tasks); // Clear tasks first due to foreign key constraint
  await db.delete(goals);
  // Keep users for simplicity, or add await db.delete(users); if needed

  // Seed users
  console.log('Creating users...');
  const usersResp = await db.insert(users).values([
    {
      id: 'seed-user-1', // Use a more descriptive ID for seeding
      name: 'John Doe',
      email: 'john.seed@example.com', // Use distinct emails for seeding
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 'seed-user-2',
      name: 'Jane Doe',
      email: 'jane.seed@example.com',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    }
  ]).returning();
  console.log('Users created:', usersResp);

  // Seed goals
  console.log('Creating goals...');
  const goalsResp = await db.insert(goals).values([
    {
      name: 'Exercise to Get Healthier',
      description: 'Incorporate short exercises into the daily routine.',
      userId: usersResp[0].id,
      frequency: 'daily',
      startDate: new Date(),
      // Add bestTime fields if applicable at the goal level
      // bestTimeTitle: 'Best Time for Goal',
      // bestTimeDescription: 'Description for goal best time',
    },
    {
      name: 'Sleep Early',
      description: 'Improve sleep hygiene for better rest.',
      userId: usersResp[0].id,
      frequency: 'daily',
      startDate: new Date(),
      // bestTimeTitle: 'Best Time for Sleep Goal',
      // bestTimeDescription: '30 minutes before bed.',
    },
    {
      name: 'Learn Drizzle ORM',
      description: 'Spend time learning Drizzle ORM features.',
      userId: usersResp[1].id,
      frequency: 'weekly',
      startDate: new Date(),
    },
  ]).returning();
  console.log('Goals created:', goalsResp);

  // Seed tasks for each goal
  console.log('Creating tasks...');
  await db.insert(tasks).values([
    // Tasks for Goal 1: Exercise
    {
      title: 'Stretch (neck, shoulders, back)',
      difficulty: 'Simpler',
      goalId: goalsResp[0].id,
      bestTimeTitle: 'Best Time',
      bestTimeDescription: 'After a long coding session.',
      completed: false,
      description: 'Quick 5-minute stretch routine.',
    },
    {
      title: '10 push-ups, squats, or jumping jacks',
      difficulty: 'Simpler',
      goalId: goalsResp[0].id,
      bestTimeTitle: 'Best Time',
      bestTimeDescription: 'Before lunch to refresh.',
      completed: false,
    },
    // Tasks for Goal 2: Sleep Early
    {
      title: 'Dim lights, activate night mode',
      difficulty: 'Simpler',
      goalId: goalsResp[1].id,
      bestTimeTitle: 'Best Time',
      bestTimeDescription: '1 hour before intended sleep time.',
      completed: false,
    },
    {
      title: 'Write one sentence about your day',
      difficulty: 'Simpler',
      goalId: goalsResp[1].id,
      bestTimeTitle: 'Best Time',
      bestTimeDescription: 'Just before getting into bed.',
      completed: false,
      description: 'Reflect briefly on the day.',
    },
    // Tasks for Goal 3: Learn Drizgzle
    {
      title: 'Read Drizzle documentation for 30 mins',
      difficulty: 'Medium',
      goalId: goalsResp[2].id,
      bestTimeTitle: 'Focus Time',
      bestTimeDescription: 'During dedicated learning blocks.',
      completed: false,
    },
    {
      title: 'Try a Drizzle query example',
      difficulty: 'Medium',
      goalId: goalsResp[2].id,
      completed: false,
    },
  ]);
  console.log('Tasks created.');

  // Remove goal logs seeding section
  // console.log('Creating goal logs...');
  // ... (removed goal log insertion code)

  console.log('Database seeded successfully!');
  process.exit(0);
}

main().catch((error) => {
  console.error('Seeding failed:');
  console.error(error);
  process.exit(1);
});