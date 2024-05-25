import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { TaskStatus } from '../task.identity';

export class GetAllTasksQueryDTO {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
