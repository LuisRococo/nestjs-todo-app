"use client";

import { getUserTasks } from "@/actions/tasks";
import { ITask } from "@/app/interfaces/models/task";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface ITaskContext {
  tasks: ITask[];
  statusFilter?: undefined;
  page: number;
}

export const CreatedTaskContext = createContext<ITaskContext>({
  tasks: [],
  page: 1,
});

export const TaskContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [page, setPage] = useState(1);
  const { push } = useRouter();

  const init = async () => {
    const result = await getUserTasks(Cookies.get("token")!, page);

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

  return (
    <CreatedTaskContext.Provider value={{ page, tasks }}>
      {children}
    </CreatedTaskContext.Provider>
  );
};
