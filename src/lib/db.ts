import { drizzle } from "drizzle-orm/neon-http";
import * as schema from './schema';
import { neon } from "@neondatabase/serverless";

// this will be our singleton 
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema });
