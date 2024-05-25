"use client";

import { getUserTasks } from "@/actions/tasks";
import { ITask, TaskStatus } from "@/app/interfaces/models/task";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface ITaskContext {
  tasks: ITask[];
  statusFilter?: undefined;
  page: number;
  status: TaskStatus | "all";
  setStatus: (newStatus: TaskStatus | "all") => void;
}

export const CreatedTaskContext = createContext<ITaskContext>({
  tasks: [],
  page: 1,
  status: "all",
  setStatus: () => {},
});

export const TaskContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<TaskStatus | "all">("all");
  const { push } = useRouter();

  const init = async () => {
    const result = await getUserTasks(Cookies.get("token")!, page, status);

    if (result.status !== 200) {
      alert("There was an error loading the tasks");
      push("/todo");
      return;
    }

    setTasks(result.tasks);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [status]);

  return (
    <CreatedTaskContext.Provider value={{ page, tasks, status, setStatus }}>
      {children}
    </CreatedTaskContext.Provider>
  );
};
