"use server";

import { TaskStatus } from "@/app/interfaces/models/task";

export const getUserTasks = async (
  token: string,
  page: number,
  status: TaskStatus | "all"
) => {
  let url = `http://backend:3000/api/tasks?page=${page}`;
  if (status !== "all") {
    url += `&status=${status}`;
  }

  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resultData = await result.json();

  return { status: result.status, tasks: resultData };
};
