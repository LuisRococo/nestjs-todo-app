import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.identity';

export class TaskMetadataDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
