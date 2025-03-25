import { db } from "@/lib/db";
import { user } from "@/lib/schema";
export async function getUsers() {
    const users = await db.select().from(user)
    return users;
}
