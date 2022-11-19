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

// fetchers
import { fetchTasks } from "../api-utils";

export interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TaskContext = createContext<TaskContextType | null>(null);

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
