import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "better-sqlite3",
      database: "../demo.db",
      synchronize: true,
      autoLoadEntities: true,
      entities: []
    }),
    TasksModule, DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
