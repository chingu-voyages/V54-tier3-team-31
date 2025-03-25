import {
  pgTable,
  integer,
  serial,
  text,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  isActive: boolean('is_active').default(true),
  avatarUrl: text('avatar_url'),
  role: text('role').default('user'),
});


export const habit = pgTable('habit', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  frequency: text('frequency'), // daily, weekly, etc.
  userId: integer('user_id')
    .references(() => user.id)
    .notNull(),
});

export const habitLog = pgTable('habit_log', {
  id: serial('id').primaryKey(),
  date: timestamp('date').notNull(),
  completed: boolean('completed').default(false),
  description: text('description'),
  habitId: integer('habit_id')
    .references(() => habit.id)
    .notNull(),
  userId: integer('user_id')
    .references(() => user.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});