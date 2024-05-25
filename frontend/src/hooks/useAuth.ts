import { getCurrentUser, login } from "@/actions/auth";
import { IUser } from "@/app/interfaces/models/user";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const useAuth = () => {
  const [user, setUser] = useState<IUser | undefined>();
  const { push, refresh } = useRouter();

  const saveToken = (token: string) => {
    Cookies.set("token", token);
  };

  const loadUser = async () => {
    const token = Cookies.get("token");

    if (token) {
      const userResponse = await getCurrentUser(token);

      if (userResponse.status === 200) {
        setUser(userResponse.user);
        return;
      }

      Cookies.remove("token");
      push("/");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(undefined);
    push("/");
    refresh();
  };

  return { saveToken, loadUser, user, logout };
};

export default useAuth;
