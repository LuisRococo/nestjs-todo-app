"use server";

export const getUserTasks = async (token: string, page: number) => {
  const result = await fetch(`http://backend:3000/api/tasks?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resultData = await result.json();

  return { status: result.status, tasks: resultData };
};
