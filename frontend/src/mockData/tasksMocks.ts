import { ITask, TaskStatus } from "@/app/interfaces/models/task";

export const taskMock: ITask = {
  id: 1,
  title: "Task Title",
  description: "Task Description",
  dueDate: new Date().toString(),
  status: TaskStatus.TODO,
  userId: 1,
};

export const taskWithChildrenMock: ITask = {
  ...taskMock,
  children: [taskMock, taskMock, taskMock],
};

export const tasksMock: ITask[] = [
  taskWithChildrenMock,
  taskWithChildrenMock,
  taskWithChildrenMock,
  taskMock,
];
