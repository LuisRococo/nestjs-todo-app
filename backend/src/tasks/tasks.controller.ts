import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create';
import { IRequest } from 'src/auth/interfaces';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/')
  create(@Body() taskData: CreateTaskDto, @Req() req: IRequest) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.tasksService.create(taskData, req.user!.id);
  }
}
