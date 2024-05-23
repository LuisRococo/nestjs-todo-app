import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { IRequest } from 'src/auth/interfaces';

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(private readonly tasksService: TasksService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as IRequest;
    const taskId = request.params.id;
    const user = request.user;

    const task = await this.tasksService.getOne(+taskId);

    if (!task) {
      throw new NotFoundException('Task does not exists');
    }

    return task.userId === user.id;
  }
}
