import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete.task.dto';

@Controller('tasks')
@UsePipes(new ValidationPipe({
    transform: true,
    transformOptions: {
        enableImplicitConversion: true
    }
}))
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

    @Delete(":id")
    deleteTask(
        @Param("id") id: string
    ) {
        return this.tasksService.deleteTask(id)
    }

    @Patch(":id/status")
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task {
        return this.tasksService.updateTaskStatus(id, status)
    }
}
