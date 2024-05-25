"use client";

import { IUser } from "@/app/interfaces/models/user";
import useAuth from "@/hooks/useAuth";
import { createContext, FC, ReactNode, useEffect } from "react";

interface IAuthContext {
  user?: IUser;
  saveToken?: (token: string) => void;
  loadUser?: () => void;
}

export const CreatedAuthContext = createContext<IAuthContext>({});

export const AuthContext: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, saveToken, loadUser } = useAuth();

  const init = async () => {
    await loadUser();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <CreatedAuthContext.Provider value={{ user, saveToken, loadUser }}>
      {children}
    </CreatedAuthContext.Provider>
  );
};
