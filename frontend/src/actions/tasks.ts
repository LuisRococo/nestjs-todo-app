"use server";

import { TaskStatus } from "@/app/interfaces/models/task";

interface CreateTaskData {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  parentTask: number | null;
}

interface UpdateTaskData extends CreateTaskData {}

export const getUserTasks = async (
  token: string,
  page: number | null,
  status: TaskStatus | "all"
) => {
  let url = `${process.env.BACKEND_HOST}/api/tasks?`;

  if (page) {
    url += `page=${page}`;
  }

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

export const deleteTask = async (token: string, taskId: number) => {
  const result = await fetch(
    `${process.env.BACKEND_HOST}/api/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    }
  );

  const resultData = await result.json();

  return { status: result.status, data: resultData };
};

export const createTask = async (token: string, taskData: CreateTaskData) => {
  const result = await fetch(`${process.env.BACKEND_HOST}/api/tasks/`, {
    body: JSON.stringify(taskData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
  });

  const resultData = await result.json();

  return { status: result.status, data: resultData };
};

export const updateTask = async (
  token: string,
  taskId: number,
  taskData: UpdateTaskData
) => {
  const result = await fetch(
    `${process.env.BACKEND_HOST}/api/tasks/${taskId}`,
    {
      body: JSON.stringify(taskData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
    }
  );

  const resultData = await result.json();

  return { status: result.status, data: resultData };
};
