import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { user, habit, habitLog } from './drizzle';
import * as dotenv from 'dotenv';

dotenv.config();

// Make sure to use environment variables for the database URL
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required');
}

async function main() {
  console.log('Seeding database...');
  
  // Create the connection
  const pool = new Pool({ connectionString: databaseUrl });
  const db = drizzle(pool);
  
  // Clear existing data (optional - remove if you don't want to clear tables first)
  console.log('Clearing existing data...');
  await db.delete(habitLog);
  await db.delete(habit);
  await db.delete(user);
  
  // Seed users
  console.log('Creating users...');
  const users = await db.insert(user).values([
    {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      passwordHash: '$2a$12$K8xVb98Lh4hS9ZKYOGoZpeyROD5Ap/S0GpYGjVB9oQSqSs3DvtfVy', // hashed 'password123'
      role: 'user',
    },
    {
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      passwordHash: '$2a$12$K8xVb98Lh4hS9ZKYOGoZpeyROD5Ap/S0GpYGjVB9oQSqSs3DvtfVy', // hashed 'password123'
      role: 'admin',
    },
  ]).returning();
  
  // Seed habits
  console.log('Creating habits...');
  const habits = await db.insert(habit).values([
    {
      name: 'Morning Meditation',
      description: 'Meditate for 10 minutes every morning',
      userId: users[0].id,
      frequency: 'daily',
      startDate: new Date(),
    },
    {
      name: 'Drink Water',
      description: 'Drink 8 glasses of water daily',
      userId: users[0].id,
      frequency: 'daily',
      startDate: new Date(),
    },
    {
      name: 'Exercise',
      description: 'Go to the gym 3 times a week',
      userId: users[1].id,
      frequency: 'weekly',
      startDate: new Date(),
    },
  ]).returning();
  
  // Seed habit logs
  console.log('Creating habit logs...');
  await db.insert(habitLog).values([
    {
      date: new Date(),
      completed: true,
      description: 'Felt more focused after 10-minute morning meditation',
      habitId: habits[0].id,
      userId: users[0].id,
    },
    {
      date: new Date(Date.now() - 86400000), // yesterday
      completed: true,
      description: 'Completed all 8 glasses throughout the day',
      habitId: habits[1].id,
      userId: users[0].id,
    },
    {
      date: new Date(Date.now() - 86400000 * 2), // 2 days ago
      completed: false,
      description: 'Was too busy with work, will try to make it to the gym tomorrow',
      habitId: habits[2].id,
      userId: users[1].id,
    },
  ]);
  
  console.log('Database seeded successfully!');
  await pool.end();
  process.exit(0);
}

main().catch((error) => {
  console.error('Seeding failed:');
  console.error(error);
  process.exit(1);
});