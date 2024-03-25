
import { Inject, NotFoundException } from "@nestjs/common";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { DrizzleService } from "src/drizzle/drizzle.service";
import { Task } from "src/drizzle/schema.types";
import * as schema from "../drizzle/schema"
import { eq } from "drizzle-orm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";

export class TaskRepository {
    constructor(
        @Inject(DrizzleAsyncProvider)
        private drizzle: BetterSQLite3Database<typeof schema>
        // private drizzle: DrizzleService
    ) { }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.drizzle.query.tasks.findFirst({
            where: (tasks, { eq }) => eq(tasks.id, id)
        })
        if (!task) {
            throw new NotFoundException(`Task with ${id} not found.`)
        }
        return task
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const newTask = await this.drizzle.insert(schema.tasks).values({
            title: createTaskDto.title,
            description: createTaskDto.description
        }).returning()

        return newTask[0]
    }

    async deleteTask(id: string): Promise<Task> {
        const deleted = await this.drizzle.delete(schema.tasks).where(eq(schema.tasks.id, id)).returning()

        if (deleted.length === 0) {
            throw new NotFoundException(`Task with ${id} not found.`)
        }

        return deleted[0]
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)

        const updated = await this.drizzle.update(schema.tasks).set({
            status
        }).returning()

        return updated[0]
    }
}