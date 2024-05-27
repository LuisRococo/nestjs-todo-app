"use server";

import { TaskStatus } from "@/app/interfaces/models/task";

export const getUserTasks = async (
  token: string,
  page: number,
  status: TaskStatus | "all"
) => {
  let url = `${process.env.BACKEND_HOST}/api/tasks?page=${page}`;
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

export const getTasksMetadata = async (
  token: string,
  status: TaskStatus | "all"
) => {
  let url = `${process.env.BACKEND_HOST}/api/tasks/metadata`;
  if (status !== "all") {
    url += `?status=${status}`;
  }

  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resultData = await result.json();

  return { status: result.status, ...resultData };
};

export const getTask = async (token: string, taskId: number) => {
  const result = await fetch(
    `${process.env.BACKEND_HOST}/api/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const resultData = await result.json();

  return { status: result.status, task: resultData };
};
