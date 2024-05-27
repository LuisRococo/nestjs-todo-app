"use server";

import { revalidatePath } from "next/cache";

export const login = async (data: { email: string; password: string }) => {
  const result = await fetch(`${process.env.BACKEND_HOST}/api/auth/signin`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
  });

  const resultData = await result.json();

  revalidatePath("/");

  return { status: result.status, ...resultData };
};

export const signup = async (data: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}) => {
  const result = await fetch(`${process.env.BACKEND_HOST}/api/auth/signup`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
  });

  const resultData = await result.json();

  return { status: result.status, ...resultData };
};

export const getCurrentUser = async (token: string) => {
  const result = await fetch(
    `${process.env.BACKEND_HOST}/api/auth/current-user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const resultData = await result.json();

  return { status: result.status, user: resultData };
};
