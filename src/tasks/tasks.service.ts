import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateTaskDto } from "./dto/create-task.dto";
import { DeleteTaskDto } from "./dto/delete.task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskRepository } from "./tasks.repository";
import { TaskStatus } from "./task-status.enum";
import { Task, User } from "@src/drizzle/schema.types"

@Injectable()
export class TasksService {
    // private tasks: Task[] = []
    constructor(
        private taskRepository: TaskRepository
    ) { }


    // fetchAllTasks(): Task[] {
    //     return this.tasks;
    // }

    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[] | any[]> {
        const { status, search } = filterDto;
        let tasks = this.taskRepository.getTasks(filterDto, user)


        return tasks
    }

    async getTaskById(id: string): Promise<Task> {
        return this.taskRepository.getTaskById(id)
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user)
    }

    async deleteTask(id: string): Promise<void> {
        return this.taskRepository.deleteTask(id)
    }



    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        return this.taskRepository.updateTaskStatus(id, status)

    }
}