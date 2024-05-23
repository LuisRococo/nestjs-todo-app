import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.identity';

export class UpdateTaskDTO {
  @IsOptional()
  title?: string;
  @IsOptional()
  description?: string;
  @IsOptional()
  dueDate?: Date;
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
