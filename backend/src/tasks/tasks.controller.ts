import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create';
import { IRequest } from 'src/auth/interfaces';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetAllTasksQueryDTO } from './dtos/getAll';

@Controller('api/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/')
  create(@Body() taskData: CreateTaskDto, @Req() req: IRequest) {
    const userId = req.user!.id;
    return this.tasksService.create(taskData, userId);
  }

  @Get('/')
  getAll(@Req() req: IRequest, @Query() query: GetAllTasksQueryDTO) {
    const userId = req.user!.id;
    const page = query.page ? query.page : 1;
    const limit = 10;

    return this.tasksService.getAll(userId, { page, limit });
  }
}
