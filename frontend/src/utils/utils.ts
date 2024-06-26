import { ITask, TaskStatus } from "@/app/interfaces/models/task";
import { FormSelectItem } from "@/components/FormSelect";

export const taskToFormSelectItems = (tasks: ITask[]) => {
  const list: FormSelectItem[] = [];

  tasks.forEach((task) => {
    list.push({ id: task.id, title: task.title });
  });

  return list;
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const taskStatusFormSelectItems = () => {
  return [
    { id: TaskStatus.DONE, title: TaskStatus.DONE.toString() },
    { id: TaskStatus.IN_PROGRESS, title: TaskStatus.IN_PROGRESS.toString() },
    { id: TaskStatus.TODO, title: TaskStatus.TODO.toString() },
  ];
};
