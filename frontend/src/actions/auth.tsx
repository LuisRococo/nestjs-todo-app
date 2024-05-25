"use server";

export const login = async (data: { email: string; password: string }) => {
  const result = await fetch("http://backend:3000/api/auth/signin", {
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
  const result = await fetch("http://backend:3000/api/auth/current-user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resultData = await result.json();

  return { status: result.status, user: resultData };
};
