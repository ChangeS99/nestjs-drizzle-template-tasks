import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Module({
    imports: [
        DrizzleModule,
    ],
    providers: [
        TasksService,
        DrizzleService
    ],
    controllers: [TasksController]
})
export class TasksModule { }
