import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { UpdateTaskDTO } from './dtos/update';
import { TaskGuard } from './task.guard';

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

  @UseGuards(TaskGuard)
  @Delete('/:id')
  delete(@Param('id') taskId: number) {
    return this.tasksService.delete(taskId);
  }

  @UseGuards(TaskGuard)
  @Patch('/:id')
  patch(@Param('id') taskId: number, @Body() taskData: UpdateTaskDTO) {
    return this.tasksService.update(taskId, taskData);
  }
}
