import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.identity';
import { TasksService } from './tasks.service';
import { TaskResolver } from './task.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService, TaskResolver],
  controllers: [TasksController],
})
export class TasksModule {}
