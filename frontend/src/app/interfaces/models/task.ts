import { IUser } from "./user";

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN PROGRESS",
  DONE = "DONE",
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  parentTaskId?: number;
  parentTask?: ITask;
  children?: ITask[];
  userId: number;
  user?: IUser;
}
