import { InputType, Field } from '@nestjs/graphql';
import { TaskStatus } from '../task.identity';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field((type) => Date)
  @IsNotEmpty()
  dueDate: Date;

  @Field({ nullable: true })
  @IsOptional()
  parentTask: number;

  @Field((type) => TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
