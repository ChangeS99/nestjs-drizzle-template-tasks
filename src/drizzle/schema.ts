/**
* Schema file for drizzle
*/

import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { v4 as uuid } from "uuid"

export const tasks = sqliteTable('tasks', {
    id: text("id").primaryKey().$defaultFn(() => uuid()),
    title: text('title').notNull(),
    description: text('description').notNull(),
    status: text("status", {
        enum: ["OPEN", "IN_PROGRESS", "DONE"]
    }).default("OPEN")
});


export const users = sqliteTable("users", {
    id: text("id").primaryKey().$defaultFn(() => uuid()),
    username: text("username").unique().notNull(),
    password: text("password").notNull()
})