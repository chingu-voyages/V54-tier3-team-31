import { db } from "@/lib/db";
import { user } from "@/lib/drizzle";
export async function getUsers() {
    const users = await db.select().from(user)
    return users;
}
