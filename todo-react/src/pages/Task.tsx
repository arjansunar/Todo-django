import { FC, useState } from "react";

import { BackBtn, Error, Loading } from "../components";

interface Task {
  id: number;
  user: number;
  title: string;
  completed: boolean;
  created_at: string;
}

const taskList: Task[] = [
  {
    id: 2,
    title: "learn drf",
    completed: false,
    created_at: "2022-11-15T09:14:33.026685Z",
    user: 2,
  },
  {
    id: 9,
    title: "new task test3",
    completed: false,
    created_at: "2022-11-16T02:46:44.244055Z",
    user: 2,
  },
];
export const TaskListContainer = () => {
  const [task, setTask] = useState("");
  console.log(task);

  const handleCreateTodo = () => {
    // mutate(
    //   `/api/user/${user}`,
    //   async (todos) => {
    //     const { data: newTodo } = await createTodo(task, user);
    //     return [...todos, newTodo];
    //   },
    //   { revalidate: false }
    // );
    setTask("");
  };

  return (
    <div className=" bg-gray-200 text-gray-800 flex flex-col  items-center h-screen pt-24">
      <BackBtn />
      {/* user name  */}
      <h2 className="font-bold text-xl uppercase italic mb-4">{`My Todo`} </h2>
      {/* todo container */}
      <div className="container px-3 max-w-md mx-auto">
        {/* todo wrapper */}
        <div className="bg-white rounded shadow px-4 py-4">
          <div className="title font-bold text-lg">Todo Application</div>
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

          {/* Todo list */}
          <ul className="todo-list mt-4">
            {/* todo list  */}

            {taskList ? (
              taskList.map((task) => (
                <TaskItem key={task.id} task={task}></TaskItem>
              ))
            ) : (
              <div>No items</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

interface TaskItemProps {
  task: Task;
}
const TaskItem: FC<TaskItemProps> = ({ task }) => {
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
