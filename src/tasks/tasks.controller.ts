import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete.task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, User } from 'src/drizzle/schema.types';
import { filter } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@src/auth/get-user.decorator';

@Controller('tasks')
@UsePipes(new ValidationPipe({
    transform: true,
    transformOptions: {
        enableImplicitConversion: true
    }
}))
@UseGuards(AuthGuard())
export class TasksController {
    constructor(
        private tasksService: TasksService
    ) { }

    @Get()
    getTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User
    ): Promise<Task[]> {

        return this.tasksService.getTasks(filterDto, user)

    }

    @Get(":id")
    getTaskById(
        @Param('id') id: string
    ) {
        return this.tasksService.getTaskById(id)
    }

    // @Get(":id")
    // getTaskById(
    //     @Param('id') id: string
    // ): Task | null {
    //     return this.tasksService.fetchTaskById(id)
    // }

    @Post("create")
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto, user)
    }

    @Delete(":id")
    deleteTask(
        @Param("id") id: string
    ) {
        return this.tasksService.deleteTask(id)
    }

    // @Post("create")
    // createTask(
    //     @Body() createTaskDto: CreateTaskDto
    // ): Task {
    //     return this.tasksService.createTask(createTaskDto)
    // }

    // @Delete(":id")
    // deleteTask(
    //     @Param("id") id: string
    // ) {
    //     return this.tasksService.deleteTask(id)
    // }

    @Patch(":id/status")
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto
    ): Promise<Task> {
        const { status } = updateTaskStatusDto

        return this.tasksService.updateTaskStatus(id, status)
    }
}
