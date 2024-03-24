import { Inject, Injectable } from "@nestjs/common";
import { DrizzleAsyncProvider } from "./drizzle.provider";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

import * as schema from "./schema"

@Injectable()
export class DrizzleService {
    constructor(
        @Inject(DrizzleAsyncProvider) readonly db: BetterSQLite3Database<typeof schema>
    ) { }
}