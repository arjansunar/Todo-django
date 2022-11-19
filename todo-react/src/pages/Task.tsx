import { FC, useContext } from "react";
import {
  BackBtn,
  Error,
  Loading,
  TaskInputContainer,
  TaskItem,
} from "../components";
import {
  TaskContext,
  TaskContextType,
  TaskProvider,
} from "../provider/TaskProvider";

export interface Task {
  id: number;
  user: number;
  title: string;
  completed: boolean;
  created_at: string;
}

export const TaskListContainer = () => {
  return (
    <TaskProvider>
      <div className=" bg-gray-200 text-gray-800 flex flex-col  items-center h-screen pt-24">
        <BackBtn />
        {/* user name  */}
        <h2 className="font-bold text-xl uppercase italic mb-4">
          {`My Todo`}{" "}
        </h2>
        {/* todo container */}
        <div className="container px-3 max-w-md mx-auto">
          {/* todo wrapper */}
          <div className="bg-white rounded shadow px-4 py-4">
            <div className="title font-bold text-lg">Todo Application</div>
            {/* Todo list */}
            <ul className="todo-list mt-4">
              {/* todo list  */}
              <TaskInputContainer />
              <TaskLists />
            </ul>
          </div>
        </div>
      </div>
    </TaskProvider>
  );
};

const TaskLists: FC = () => {
  const { tasks } = useContext(TaskContext) as TaskContextType;
  console.log({ tasks });

  return (
    <>
      {tasks ? (
        tasks.map((task) => <TaskItem key={task.id} task={task}></TaskItem>)
      ) : (
        <div>No items</div>
      )}
    </>
  );
};
