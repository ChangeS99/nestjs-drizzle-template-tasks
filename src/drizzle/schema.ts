/**
* Schema file for drizzle
*/

import { relations } from 'drizzle-orm';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { v4 as uuid } from "uuid"




export const users = sqliteTable("users", {
    id: text("id").primaryKey().$defaultFn(() => uuid()),
    username: text("username").unique().notNull(),
    password: text("password").notNull()
})

export const tasks = sqliteTable('tasks', {
    id: text("id").primaryKey().$defaultFn(() => uuid()),
    title: text('title').notNull(),
    description: text('description').notNull(),
    status: text("status", {
        enum: ["OPEN", "IN_PROGRESS", "DONE"]
    }).default("OPEN"),
    authodId: text('authod_id').references(() => users.id, { onDelete: 'cascade' })
});

// set up relation of users
export const usersRelations = relations(users, ({ many }) => {
    return {
        tasks: many(tasks)
    }
})

// set up relation of posts
export const tasksRelations = relations(tasks, ({ one }) => {
    return {
        user: one(users, {
            fields: [tasks.authodId],
            references: [users.id]
        })
    }
})