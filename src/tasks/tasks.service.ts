import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateTaskDto } from "./dto/create-task.dto";
import { DeleteTaskDto } from "./dto/delete.task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskRepository } from "./tasks.repository";
import { TaskStatus } from "./task-status.enum";
import { Task } from "@src/drizzle/schema.types"

@Injectable()
export class TasksService {
    // private tasks: Task[] = []
    constructor(
        private taskRepository: TaskRepository
    ) { }


    // fetchAllTasks(): Task[] {
    //     return this.tasks;
    // }

    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        let tasks = this.taskRepository.getTasks(filterDto)


        return tasks
    }

    async getTaskById(id: string): Promise<Task> {
        return this.taskRepository.getTaskById(id)
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto)
    }

    async deleteTask(id: string): Promise<void> {
        return this.taskRepository.deleteTask(id)
    }



    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        return this.taskRepository.updateTaskStatus(id, status)

    }
}