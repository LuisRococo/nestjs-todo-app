import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { TaskStatus } from './task.identity';
import { User } from 'src/users/user.model';

@ObjectType({ description: 'task' })
export class Task {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field((type) => TaskStatus)
  status: TaskStatus;

  @Field()
  parentTaskId?: number;

  @Field((type) => Task, { nullable: true })
  parentTask?: Task;

  @Field()
  userId: number;

  @Field((type) => User, { nullable: true })
  user?: User;

  @Field((type) => Date)
  dueDate: Date;

  @Field((type) => [Task])
  children: Task[];
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});
