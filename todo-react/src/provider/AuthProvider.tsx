import { createContext, FC, ReactNode, useEffect, useState } from "react";
import axios from "axios";

export interface AuthContextType {
  tokens: AuthToken;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  setTokens: React.Dispatch<React.SetStateAction<AuthToken>>;
}
export const AuthContext = createContext<AuthContextType | null>(null);

type AuthToken = {
  access: string;
  refresh: string;
} | null;

type Credentials = {
  username: string;
  password: string;
};

const login = async (credentials: Credentials) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  try {
    const { data, status } = await axios.post(
      `${BACKEND_URL}/token/`,
      credentials
    );
    localStorage.setItem("todo_token", JSON.stringify(data));
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const logout = () => {
  localStorage.removeItem("todo_token");
};

const getLocalToken = () => localStorage.getItem("todo_token");

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tokens, setTokens] = useState<AuthToken>(null);

  useEffect(() => {
    const localToken = getLocalToken();
    if (localToken !== null) {
      const parsedTokens = JSON.parse(localToken) as AuthToken;
      setTokens(parsedTokens);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ tokens, login, logout, setTokens }}>
      {children}
    </AuthContext.Provider>
  );
};
