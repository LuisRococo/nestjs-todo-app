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
import { TaskMetadataDto } from './dtos/metadata';

@Controller('api/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/metadata')
  async get(@Req() req, @Query() query: TaskMetadataDto) {
    const status = query.status ? query.status : null;
    const userId = req.user!.id;
    return this.tasksService.getTaskMetadata(userId, status);
  }

  @Get('/:id')
  async getOne(@Param('id') taskId: number) {
    return this.tasksService.getOne(taskId);
  }

  @Post('/')
  async create(@Body() taskData: CreateTaskDto, @Req() req: IRequest) {
    const userId = req.user!.id;
    return this.tasksService.create(taskData, userId);
  }

  @Get('/')
  async getAll(@Req() req: IRequest, @Query() query: GetAllTasksQueryDTO) {
    const userId = req.user!.id;
    const status = query.status ? query.status : null;
    const limit = 10;

    return this.tasksService.getAll(
      userId,
      { page: query.page, limit },
      status,
    );
  }

  @UseGuards(TaskGuard)
  @Delete('/:id')
  async delete(@Param('id') taskId: number) {
    return this.tasksService.delete(taskId);
  }

  @UseGuards(TaskGuard)
  @Patch('/:id')
  async patch(@Param('id') taskId: number, @Body() taskData: UpdateTaskDTO) {
    return this.tasksService.update(taskId, taskData);
  }
}
