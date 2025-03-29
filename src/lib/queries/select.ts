import { db } from '../db'
import { habits, users } from '../db/schema'

export async function getUsers() {
    const usersRes = await db.select().from(users)
    return usersRes
}

export async function getHabits() {
    const habitsRes = await db.select().from(habits)
    return habitsRes
}
