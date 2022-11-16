import { FC, useState } from "react";
import { Task } from "../pages";

export const TaskInputContainer: FC = () => {
  const [task, setTask] = useState("");

  const handleCreateTodo = () => {
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
  const handleUpdate = () => {
    // call the api and revalidates cache
    // mutate(
    //   `/api/user/${user}`,
    //   async (todos) => {
    //     const { data: updatedTodo } = await todoUpdater(todo.id, !done);
    //     const index = todos.findIndex((el) => el.id === todo.id);
    //     todos[index] = updatedTodo;
    //     return [...todos];
    //   },
    //   { revalidate: false }
    // );
    setCompleted(!completed);
  };

  const handleDelete = () => {
    // call the api and revalidates cache
    // mutate(
    //   `/api/user/${user}`,
    //   async (todos) => {
    //     todoDeleter(todo.id);
    //     const filteredTodos = todos.filter((el) => el.id !== todo.id);
    //     return [...filteredTodos];
    //   },
    //   { revalidate: false }
    // );
  };
  return task ? (
    <li className="flex justify-between items-center mt-3">
      <div className={`${completed ? "line-through" : ""} flex items-center`}>
        <input
          type="checkbox"
          name="done"
          id={task.id + ""}
          checked={completed}
          onChange={() => handleUpdate()}
        />
        <label
          className="capitalize ml-3 text-sm font-semibold"
          htmlFor={task.id + ""}
        >
          {task.title}
        </label>
      </div>
      <div>
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
      </div>
    </li>
  ) : null;
};
