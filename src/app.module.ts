import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [TasksModule, DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
