import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { DrizzleService } from 'src/drizzle/drizzle.service';

import { TaskRepository } from './tasks.repository';
import { DrizzleAsyncProvider, drizzleProvider } from 'src/drizzle/drizzle.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { AuthModule } from '@src/auth/auth.module';

@Module({
    imports: [
        // TypeOrmModule.forFeature([Task]),
        DrizzleModule,
        AuthModule
    ],
    providers: [
        TasksService,
        TaskRepository,

    ],
    controllers: [TasksController]
})
export class TasksModule { }
