import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class GetAllTasksQueryDTO {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;
}
