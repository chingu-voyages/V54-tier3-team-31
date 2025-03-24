import { habit, user } from "@/lib/drizzle";
import { db } from "../db";


export async function getUsers() {
    const users = await db.select().from(user)
    return users;
}

export async function getHabits(){
    const habits = await db.select().from(habit);
    return habits
}
