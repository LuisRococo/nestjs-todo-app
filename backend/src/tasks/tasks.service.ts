import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.identity';
import { IsNull, Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create';
import { UpdateTaskDTO } from './dtos/update';

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

  async getAll(
    userId: number,
    { page, limit }: { page: number; limit: number },
  ) {
    const queryOptions = {
      where: { userId, parentTaskId: IsNull() },
      relations: ['children'],
      skip: (page - 1) * limit,
      take: limit,
    };

    const tasks = this.taskRepository.find(queryOptions);
    return tasks;
  }

  async delete(id) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['children'],
    });

    if (!task) {
      throw new NotFoundException('Task was not found');
    }

    if (task.children.length !== 0) {
      throw new HttpException(
        'It is not possible to delete tasks with children',
        400,
      );
    }

    await this.taskRepository.remove(task);
    return task;
  }

  async update(id: number, taskData: UpdateTaskDTO) {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) throw new NotFoundException('Task does not exists');

    await this.taskRepository.update(16, taskData);

    return await this.taskRepository.findOneBy({ id });
  }
}
