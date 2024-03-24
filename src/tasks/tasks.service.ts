import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateTaskDto } from "./dto/create-task.dto";
import { DeleteTaskDto } from "./dto/delete.task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskRepository } from "./tasks.repository";
import { Task } from "src/drizzle/schema.types";

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

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto)
    }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto

    //     const task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }

    //     this.tasks.push(task)

    //     return task
    // }

    // deleteTask(id: string) {
    //     const taskExist = this.tasks.find(f => f.id === id)

    //     if (!taskExist) {
    //         throw new NotFoundException(`Task with ${id} not found.`)
    //     }

    //     this.tasks = this.tasks.filter(f => f.id !== id);
    // }


    // updateTaskStatus(id: string, status: TaskStatus) {
    //     const task = this.fetchTaskById(id);

    //     task.status = status;

    //     return task;
    // }
}