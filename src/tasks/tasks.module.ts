import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { DrizzleService } from 'src/drizzle/drizzle.service';

import { TaskRepository } from './tasks.repository';
import { DrizzleAsyncProvider, drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
    imports: [
        DrizzleModule,
    ],
    providers: [
        TasksService,
        TaskRepository,
        // ...drizzleProvider

    ],
    controllers: [TasksController]
})
export class TasksModule { }
