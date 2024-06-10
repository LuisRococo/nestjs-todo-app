import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/user.entity';
import { TaskStatus } from './task.identity';

@UseGuards(AuthGuard)
@Resolver((of) => Task)
export class TaskResolver {
  constructor(private readonly tasksService: TasksService) {}

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
}
