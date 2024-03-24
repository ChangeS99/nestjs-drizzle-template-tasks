import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

import * as schema from "./schema"

export const DrizzleAsyncProvider = "DRIZZLE_PROVIDER"

export const drizzleProvider = [
    {
        provide: DrizzleAsyncProvider,
        useFactory: async () => {
            const sqlite = new Database(process.env.DB_URL)

            const db = drizzle(sqlite, {
                schema
            })

            return db
        },
        export: [DrizzleAsyncProvider]
    }
]