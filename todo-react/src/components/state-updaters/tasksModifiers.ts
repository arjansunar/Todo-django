import { Task } from "../../pages";

interface AddTaskProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface UpdateTaskProps {
  tasks: Task[];
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

interface DeleteTaskProps {
  id: number;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
export const addToTasksState = ({ task, setTasks }: AddTaskProps) => {
  setTasks((list) => {
    return [...list, task];
  });
};

export const updateTasksState = ({
  tasks,
  task,
  setTasks,
}: UpdateTaskProps) => {
  const taskIndex = tasks.findIndex((el) => (el.id = task.id));
  console.log("taskIndex", taskIndex);
  if (taskIndex >= 0) {
    setTasks((list) => {
      list[taskIndex] = task;
      return list;
    });
  }
};

export const deleteTaskFromTasksState = ({ id, setTasks }: DeleteTaskProps) => {
  setTasks((tasks) => {
    return tasks.filter((el) => el.id != id);
  });
};
