import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import {
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/user.entity';
import { TaskStatus } from './task.identity';

@UseGuards(AuthGuard)
@Resolver((of) => Task)
export class TaskResolver {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Query((returns) => [Task])
  async tasks(
    @Context('user') user: User,
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('status', { type: () => TaskStatus, nullable: true })
    status?: TaskStatus,
  ): Promise<Task[]> {
    const tasks = await this.tasksService.getAll(
      user.id,
      { page, limit: 10 },
      status,
    );

    return tasks;
  }

  @UseGuards(AuthGuard)
  @Query((returns) => Task)
  async Task(
    @Context('user') user: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Task> {
    const task = await this.tasksService.getOne(id);

    if (!task) throw new NotFoundException('The task was not found');

    if (task.userId !== user.id)
      throw new UnauthorizedException(
        `You dont have access to task with ${task.id} id`,
      );

    return task;
  }
}
