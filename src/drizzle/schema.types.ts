import { tasks, users } from "./schema";

export type Task = typeof tasks.$inferSelect;

export type User = typeof users.$inferSelect