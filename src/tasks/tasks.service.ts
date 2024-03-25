import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateTaskDto } from "./dto/create-task.dto";
import { DeleteTaskDto } from "./dto/delete.task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskRepository } from "./tasks.repository";
import { Task } from "src/drizzle/schema.types";
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TasksService {
    // private tasks: Task[] = []
    constructor(
        private taskRepository: TaskRepository
    ) { }


    // fetchAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto) {
    //     const { status, search } = filterDto;
    //     let tasks = this.fetchAllTasks()
    //     // search status
    //     if (status) {
    //         tasks = tasks.filter(t => t.status = status)
    //     }
    //     // search search
    //     if (search) {
    //         tasks = tasks.filter(t => {
    //             if (t.title.includes(search) || t.description.includes(search)) {
    //                 return true
    //             }
    //             return false
    //         })
    //     }
    //     // return final

    //     return tasks
    // }

    async getTaskById(id: string): Promise<Task> {
        return this.taskRepository.getTaskById(id)
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto)
    }

    async deleteTask(id: string): Promise<Task> {
        return this.taskRepository.deleteTask(id)
    }



    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        return this.taskRepository.updateTaskStatus(id, status)

    }
}