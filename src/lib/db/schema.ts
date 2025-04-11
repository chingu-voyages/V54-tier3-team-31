import { relations } from 'drizzle-orm'
import {
    pgTable,
    integer,
    serial,
    text,
    timestamp,
    boolean,
    primaryKey,
    date,
} from 'drizzle-orm/pg-core'

import type { AdapterAccountType } from 'next-auth/adapters'

export const users = pgTable('user', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text('name'),
    email: text('email').unique(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
})

export const accounts = pgTable(
    'account',
    {
        userId: text('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        type: text('type').$type<AdapterAccountType>().notNull(),
        provider: text('provider').notNull(),
        providerAccountId: text('providerAccountId').notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: text('token_type'),
        scope: text('scope'),
        id_token: text('id_token'),
        session_state: text('session_state'),
    },
    (account) => [
        {
            compoundKey: primaryKey({
                columns: [account.provider, account.providerAccountId],
            }),
        },
    ]
)

export const sessions = pgTable('session', {
    sessionToken: text('sessionToken').primaryKey(),
    userId: text('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
    'verificationToken',
    {
        identifier: text('identifier').notNull(),
        token: text('token').notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (verificationToken) => [
        {
            compositePk: primaryKey({
                columns: [
                    verificationToken.identifier,
                    verificationToken.token,
                ],
            }),
        },
    ]
)

export const authenticators = pgTable(
    'authenticator',
    {
        credentialID: text('credentialID').notNull().unique(),
        userId: text('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        providerAccountId: text('providerAccountId').notNull(),
        credentialPublicKey: text('credentialPublicKey').notNull(),
        counter: integer('counter').notNull(),
        credentialDeviceType: text('credentialDeviceType').notNull(),
        credentialBackedUp: boolean('credentialBackedUp').notNull(),
        transports: text('transports'),
    },
    (authenticator) => [
        {
            compositePK: primaryKey({
                columns: [authenticator.userId, authenticator.credentialID],
            }),
        },
    ]
)

export const goals = pgTable('goal', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    bestTimeTitle: text('best_time_title'),
    bestTimeDescription: text('best_time_description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    startDate: timestamp('start_date'),
    endDate: timestamp('end_date'),
    frequency: text('frequency'), // daily, weekly, etc.
    userId: text('user_id')
        .references(() => users.id)
        .notNull(),
})

// Removed goalLogs table definition

export const tasks = pgTable('task', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    difficulty: text('difficulty'), // e.g., 'Simpler', 'Medium', 'Hard'
    goalId: integer('goal_id') // Make goalId nullable
        .references(() => goals.id, { onDelete: 'set null' }), // Set null on goal deletion
    userId: text('user_id') // Add userId, referencing users table, this indicates that a task is a planTask
        .references(() => users.id, { onDelete: 'cascade' }) // Cascade delete tasks on user deletion
        .notNull(),
    frequency: text('frequency'), // Added frequency
    duration: text('duration'), // Added duration (e.g., '5 mins')
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    completed: boolean('completed').default(false), // Keep completion status on the task itself
    completedAt: timestamp('completed_at'), // Add timestamp for when the task was completed
    description: text('description'),
    isInFocus: boolean('is_in_focus').default(false), // New field to track if task is in focus
})

// Relations
export const userRelations = relations(users, ({ many }) => ({
    goals: many(goals),
    tasks: many(tasks),
}))

export const goalRelations = relations(goals, ({ many, one }) => ({
    // Renamed relation
    user: one(users, {
        fields: [goals.userId],
        references: [users.id],
    }),
    tasks: many(tasks),
}))

export const taskRelations = relations(tasks, ({ one }) => ({
    goal: one(goals, {
        fields: [tasks.goalId],
        references: [goals.id],
    }),
    user: one(users, {
        // Add relation from task to its user
        fields: [tasks.userId],
        references: [users.id],
    }),
}))

export const heatmapStatisticsView = pgTable('heatmap_statistics', {
    userId: text('user_id').notNull(),
    completionDate: date('completion_date').notNull(),
    completedTasks: text('completed_tasks').notNull(),
})

// Types
export type User = typeof users.$inferSelect
export type Account = typeof accounts.$inferSelect
export type Session = typeof sessions.$inferSelect
export type Goal = typeof goals.$inferSelect
export type Task = typeof tasks.$inferSelect
