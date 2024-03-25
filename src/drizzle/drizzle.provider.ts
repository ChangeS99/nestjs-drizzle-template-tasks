import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

import * as schema from "./schema"

export const DrizzleAsyncProvider = "DRIZZLE_PROVIDER"

export const drizzleProvider = [
    {
        provide: DrizzleAsyncProvider,
        useFactory: async () => {
            const sqlite = new Database("demo2.db")

            const db = drizzle(sqlite, {
                schema
            })


            return db
        },
        export: [DrizzleAsyncProvider]
    }
]