import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService: TasksService
    ) { }

    @Get("all")
    getAllTasks(): Task[] {
        return this.tasksService.fetchAllTasks()
    }

    @Get(":id")
    getTaskById(
        @Param('id') id: string
    ): Task | null {
        return this.tasksService.fetchTaskById(id)
    }

    @Post("create")
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Task {
        return this.tasksService.createTask(createTaskDto)
    }
}
