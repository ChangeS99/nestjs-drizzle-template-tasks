import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

import { v4 as uuid } from "uuid"
import { CreateTaskDto } from "./dto/create-task.dto";
import { DeleteTaskDto } from "./dto/delete.task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    fetchAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto) {
        const { status, search } = filterDto;
        let tasks = this.fetchAllTasks()
        // search status
        if (status) {
            tasks = tasks.filter(t => t.status = status)
        }
        // search search
        if (search) {
            tasks = tasks.filter(t => {
                if (t.title.includes(search) || t.description.includes(search)) {
                    return true
                }
                return false
            })
        }
        // return final

        return tasks
    }

    fetchTaskById(id: string): Task | null {
        // try to get task by id
        const task = this.tasks.find(task => task.id === id)

        // if not found return 404 error
        if (!task) {
            throw new NotFoundException()
        }

        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto

        const task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)

        return task
    }

    deleteTask(id: string) {
        const taskExist = this.tasks.find(f => f.id === id)

        if (!taskExist) {

        }

        this.tasks = this.tasks.filter(f => f.id !== id);
    }


    updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.fetchTaskById(id);

        task.status = status;

        return task;
    }
}