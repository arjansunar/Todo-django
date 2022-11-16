import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";

export interface AuthContextType {
  tokens: AuthToken;
  login: (credentials: Credentials) => Promise<AuthToken | undefined>;
  logout: () => void;
  setTokens: React.Dispatch<React.SetStateAction<AuthToken>>;
  isAuth: boolean;
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
    return data as AuthToken;
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
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const localToken = getLocalToken();
    if (localToken !== null) {
      const parsedTokens = JSON.parse(localToken) as AuthToken;
      setTokens(parsedTokens);
    }
  }, []);

  useEffect(() => {
    if (!!tokens && tokens.access.length > 0) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [tokens]);

  return (
    <AuthContext.Provider value={{ tokens, login, logout, setTokens, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
