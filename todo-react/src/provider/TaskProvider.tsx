import axios from "axios";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Task } from "../pages";
import { AuthContext, AuthContextType } from "./AuthProvider";

export interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const TaskContext = createContext<TaskContextType | null>(null);

interface FetcherProps {
  url: string;
  method: "get" | "post" | "delete" | "patch";
  token: string;
}
const fetcher = async ({ url, method, token }: FetcherProps) => {
  try {
    const { data } = await axios[method](`${BACKEND_URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const fetchTasks = async (token: string) =>
  await fetcher({
    url: "task/list/",
    method: "get",
    token,
  });

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { isAuth, tokens } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    if (isAuth && tokens) {
      (async () => {
        const data: Task[] = await fetchTasks(tokens?.access);
        setTasks(data);
      })();
    }
  }, [isAuth]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
