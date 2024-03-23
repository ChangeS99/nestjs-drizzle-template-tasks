import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

import { v4 as uuid } from "uuid"
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    fetchAllTasks(): Task[] {
        return this.tasks;
    }

    fetchTaskById(id: string): Task | null {
        const task = this.tasks.find(task => task.id === id)

        return task ? task : null;
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

}