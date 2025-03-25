import { db } from '../db';
import { habit, users } from '../schema';

export async function getUsers() {
    const usersRes = await db.select().from(users)
    return usersRes;
}

export async function getHabits() {
    const habits = await db.select().from(habit);
    return habits;
}
