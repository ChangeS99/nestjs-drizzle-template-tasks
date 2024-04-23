
import { Inject, NotFoundException } from "@nestjs/common";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { DrizzleService } from "src/drizzle/drizzle.service";
import * as schema from "../drizzle/schema"
import { and, eq, ilike, like, or, sql } from "drizzle-orm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task, User } from "@src/drizzle/schema.types";
import { Repository } from "typeorm";

export class TaskRepository {
    constructor(
        @Inject(DrizzleAsyncProvider) readonly db: BetterSQLite3Database<typeof schema>,

        // private drizzle: DrizzleService
    ) { }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.db.query.tasks.findFirst({
            where: (tasks, { eq }) => eq(tasks.id, id)
        })



        if (!task) throw new NotFoundException(`Task with ID ${id} not found`)

        return task
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {


        const task = await this.db.insert(schema.tasks).values({
            title: createTaskDto.title,
            description: createTaskDto.description,
            status: TaskStatus.OPEN,
            authorId: user.id
        }).returning()

        return task[0];
    }

    async deleteTask(id: string): Promise<void> {

        const deleted = await this.db.delete(schema.tasks).returning();

        if (deleted.length === 0) throw new NotFoundException(`Task with ID ${id} not found`)

    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)

        const updated = await this.db.update(schema.tasks).set({
            status
        }).where(eq(schema.tasks.id, id)).returning();

        if (updated.length === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`)
        }



        return updated[0]
    }

    async getTasks(filterDto: GetTasksFilterDto, user: User) {
        const { status, search } = filterDto;
        // if status and search both are defined
        if (status && search) {
            const result = await this.db.select({
                title: schema.tasks.title,
                description: schema.tasks.description,
                id: schema.tasks.id,
                user: {
                    username: schema.users.username,
                    id: schema.users.id
                }
            }).from(schema.tasks).where(
                and(
                    or(
                        sql`lower(${schema.tasks.title}) like lower(${search})`,
                        sql`lower(${schema.tasks.description}) like lower(${search})`
                    ),
                    eq(schema.tasks.status, status),
                    eq(schema.tasks.authorId, user.id)
                )

            ).leftJoin(schema.users, eq(schema.tasks.authorId, schema.users.id),);

            return result

        }

        // if status is given
        if (status) {
            const result = await this.db.select(
                {
                    title: schema.tasks.title,
                    description: schema.tasks.description,
                    id: schema.tasks.id,
                    user: {
                        username: schema.users.username,
                        id: schema.users.id
                    }
                }
            ).from(schema.tasks).where(
                and(
                    eq(schema.tasks.status, status),
                    eq(schema.tasks.authorId, user.id)
                )

            ).leftJoin(schema.users, eq(schema.tasks.authorId, schema.users.id),);

            return result
        }

        // if search is defined 
        if (search) {
            const result = await this.db.select({
                title: schema.tasks.title,
                description: schema.tasks.description,
                id: schema.tasks.id,
                user: {
                    username: schema.users.username,
                    id: schema.users.id
                }
            }).from(schema.tasks).where(
                and(
                    or(
                        sql`lower(${schema.tasks.title}) like lower(${search})`,
                        sql`lower(${schema.tasks.description}) like lower(${search})`
                    ),
                    eq(schema.tasks.status, status),
                    eq(schema.tasks.authorId, user.id)
                )

            ).leftJoin(schema.users, eq(schema.tasks.authorId, schema.users.id),);

            return result
        }

        const result = await this.db.select(
            {
                title: schema.tasks.title,
                description: schema.tasks.description,
                id: schema.tasks.id,
                user: {
                    username: schema.users.username,
                    id: schema.users.id
                }
            }
        ).from(schema.tasks)
            .where(eq(schema.tasks.authorId, user.id))
            .leftJoin(schema.users, eq(schema.tasks.authorId, schema.users.id));

        return result

    }

}