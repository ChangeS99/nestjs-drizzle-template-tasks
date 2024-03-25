import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { DrizzleModule } from './drizzle/drizzle.module';

import { AuthModule } from './auth/auth.module';
import { DrizzleService } from './drizzle/drizzle.service';

@Module({
  imports: [
    TasksModule, DrizzleModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, DrizzleService],
})
export class AppModule { }
