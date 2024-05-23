import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.identity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(taskData: CreateTaskDto, userId: number) {
    return await this.taskRepository.save({
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate,
      status: taskData.status,
      parentTaskId: taskData.parentTask,
      userId,
    });
  }
}
