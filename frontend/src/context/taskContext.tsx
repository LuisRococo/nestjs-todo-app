"use client";

import { getTasksMetadata, getUserTasks } from "@/actions/tasks";
import { ITask, TaskStatus } from "@/app/interfaces/models/task";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface ITaskContext {
  tasks: ITask[];
  statusFilter?: undefined;
  page: number;
  totalPages?: number;
  status: TaskStatus | "all";
  setStatus: (newStatus: TaskStatus | "all") => void;
  setPage: (newPage: number) => void;
}

export const CreatedTaskContext = createContext<ITaskContext>({
  tasks: [],
  page: 1,
  status: "all",
  totalPages: undefined,
  setStatus: () => {},
  setPage: () => {},
});

export const TaskContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>();
  const [status, setStatus] = useState<TaskStatus | "all">("all");
  const { push } = useRouter();
  const tasksPerPage = 10;

  const loadTasks = async () => {
    const result = await getUserTasks(Cookies.get("token")!, page, status);

    if (result.status !== 200) {
      alert("There was an error loading the tasks");
      push("/todo");
      return;
    }

    setTasks(result.tasks);
  };

  const loadPagination = async () => {
    const result = await getTasksMetadata(Cookies.get("token")!, status);

    if (result.status !== 200) {
      alert(result.message);
      push("/todo");
      return;
    }

    const pages = Math.ceil(result.count / tasksPerPage);
    setTotalPages(pages);
  };

  const init = async () => {
    await loadTasks();
    await loadPagination();
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [status]);

  useEffect(() => {
    loadTasks();
  }, [page]);

  return (
    <CreatedTaskContext.Provider
      value={{ page, tasks, status, setStatus, setPage, totalPages }}
    >
      {children}
    </CreatedTaskContext.Provider>
  );
};
