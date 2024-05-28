import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from './task.identity';
import { FindManyOptions, IsNull, Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create';
import { UpdateTaskDTO } from './dtos/update';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async getOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['children'],
    });

    if (!task) throw new NotFoundException('The task was not found');

    return task;
  }

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
    { page, limit }: { page: number; limit?: number },
    status: TaskStatus | null,
  ) {
    let queryOptions: FindManyOptions<Task> = {
      where: { userId, parentTaskId: IsNull(), status },
      relations: ['children'],
    };

    if (page) {
      queryOptions = { ...queryOptions, skip: (page - 1) * limit, take: limit };
    }

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

    const newTaskData = {
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate,
      status: taskData.status,
      parentTaskId: taskData.parentTask,
    };

    await this.taskRepository.update(id, newTaskData);

    return await this.taskRepository.findOneBy({ id });
  }

  async getTaskMetadata(userId: number, status: TaskStatus | null) {
    const count = await this.taskRepository.count({
      where: { status, userId },
    });
    return { count };
  }
}
