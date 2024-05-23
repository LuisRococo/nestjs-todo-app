import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN PROGRESS',
  DONE = 'DONE',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({})
  description: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'enum', enum: TaskStatus })
  status: TaskStatus;

  // Task Relationship
  @ManyToOne(() => Task, (task) => task.children, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentTaskId' })
  parentTask: Task;

  @Column({ name: 'parentTaskId', nullable: true })
  parentTaskId: number;

  @OneToMany(() => Task, (task) => task.parentTask)
  children: Task[];

  // User Relationship
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column()
  userId: number;
}
