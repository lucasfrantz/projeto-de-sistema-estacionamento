import React, { createContext, useState, useEffect, useContext } from "react";

import { api } from "../services/api";

interface User {
  name: string;
  email: string;
  phoneNumber: string;
  login: string;
  isAdmin: boolean;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  Login(user: object): Promise<void>;
  Logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem("@App:user");
    const storagedToken = sessionStorage.getItem("@App:token");

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  async function Login(userData: object) {
    const response = await api.post("/sessions/login", userData);

    setUser(response.data.user);
    api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;

    sessionStorage.setItem("@App:user", JSON.stringify(response.data.user));
    sessionStorage.setItem("@App:token", response.data.token);
  }

  function Logout() {
    setUser(null);
    sessionStorage.removeItem("@App:user");
    sessionStorage.removeItem("@App:token");
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
