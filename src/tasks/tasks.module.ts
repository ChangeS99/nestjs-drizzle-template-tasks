import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { DrizzleService } from 'src/drizzle/drizzle.service';

import { TaskRepository } from './tasks.repository';
import { DrizzleAsyncProvider, drizzleProvider } from 'src/drizzle/drizzle.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Module({
    imports: [
        // TypeOrmModule.forFeature([Task]),
        DrizzleModule
    ],
    providers: [
        TasksService,
        TaskRepository,

    ],
    controllers: [TasksController]
})
export class TasksModule { }
