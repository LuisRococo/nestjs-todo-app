import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.identity';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  dueDate: Date;
  @IsOptional()
  parentTask: number;
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
