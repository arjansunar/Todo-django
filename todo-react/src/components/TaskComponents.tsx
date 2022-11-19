import { FC, useContext, useState } from "react";
import { Task } from "../pages";

// fetchers
import { createTask, deleteTask, patchTask } from "../api-utils";
import { TaskContext, TaskContextType } from "../provider/TaskProvider";
import { AuthContext, AuthContextType } from "../provider";
import {
  addToTasksState,
  deleteTaskFromTasksState,
  updateTasksState,
} from "./state-updaters";

export const TaskInputContainer: FC = () => {
  const [task, setTask] = useState("");
  const { setTasks } = useContext(TaskContext) as TaskContextType;
  const { tokens } = useContext(AuthContext) as AuthContextType;

  const handleCreateTodo = async () => {
    if (task.length < 1) return;
    try {
      const newTask = await createTask(tokens?.access!, { title: task });
      addToTasksState({ task: newTask, setTasks });
    } catch (error) {
      console.log(error);
    }

    setTask("");
  };
  return (
    <div className="flex items-center justify-center text-sm mt-4 gap-3">
      <input
        type="text"
        placeholder="what is your plan for today"
        className=" rounded-sm shadow-sm px-4 py-2 border border-gray-200 w-full"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleCreateTodo}>
        <svg
          className="w-3 h-3  focus:outline-none"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
    </div>
  );
};

interface TaskItemProps {
  task: Task;
}

export const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const [completed, setCompleted] = useState(task.completed);
  const { tasks, setTasks } = useContext(TaskContext) as TaskContextType;
  const { tokens, isMod } = useContext(AuthContext) as AuthContextType;

  const handleUpdate = async () => {
    const updatedTask = await patchTask(tokens?.access!, {
      ...task,
      completed: !completed,
    });
    updateTasksState({ tasks, setTasks, task: updatedTask });
    console.log("task updated", updatedTask);
    setCompleted(!completed);
  };

  const handleDelete = async () => {
    try {
      await deleteTask(tokens?.access!, task.id);
      deleteTaskFromTasksState({
        id: task.id,
        setTasks,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return task ? (
    <li className="flex justify-between items-center mt-3">
      <div className={`${completed ? "line-through" : ""} flex items-center`}>
        {isMod ? (
          <input
            type="checkbox"
            name="done"
            disabled={!isMod}
            id={task.id + ""}
            checked={completed}
            onChange={() => handleUpdate()}
          />
        ) : null}
        <label
          className="capitalize ml-3 text-sm font-semibold"
          htmlFor={task.id + ""}
        >
          {task.title}
        </label>
      </div>
      <div>
        {isMod ? (
          <button onClick={() => handleDelete()}>
            <svg
              className=" w-4 h-4 text-gray-600 fill-current"
              // @click="deleteTodo(todo.id)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        ) : null}
      </div>
    </li>
  ) : null;
};
