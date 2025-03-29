import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from './schema';
import localforage from "localforage";

// this will be our singleton 
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema });

// offline support for db storage (using localForage)
localforage.config({
    driver: localforage.INDEXEDDB, // Prioritize IndexedDB
    name: 'myOfflineAppDB',
});


