import axios from "axios";
import { Task } from "../pages";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface FetcherProps {
  url: string;
  method: "get" | "post" | "delete" | "patch";
  token: string;
  data?: any;
}

export interface MutateFetcherProps extends FetcherProps {
  method: "post" | "patch";
}

export interface GetFetcherProps extends FetcherProps {
  method: "get";
}

interface DeleteFetcherProps extends Omit<FetcherProps, "method"> {}

const fetcher = async ({ url, method, token }: GetFetcherProps) => {
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

const deleteFetcher = async ({ url, token }: DeleteFetcherProps) => {
  try {
    await axios.delete(`${BACKEND_URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

const mutateFetcher = async ({
  url,
  method,
  token,
  data,
}: MutateFetcherProps) => {
  try {
    const { data: response } = await axios[method](
      `${BACKEND_URL}/${url}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

// get a list of tasks
export const fetchTasks = async (token: string) =>
  await fetcher({
    url: "task/list/",
    method: "get",
    token,
  });

// create a task
export const createTask = async (token: string, task: Partial<Task>) => {
  return (await mutateFetcher({
    url: "task/list/",
    method: "post",
    token,
    data: task,
  })) as Task;
};

// patch tasks
export const patchTask = async (
  token: string,
  task: Partial<Task> & { id: number }
) => {
  const { id, ...rest } = task;
  return (await mutateFetcher({
    url: `task/detail/${id}/`,
    method: "patch",
    token,
    data: rest,
  })) as Task;
};

// deleted a task
export const deleteTask = async (token: string, id: number) => {
  await deleteFetcher({
    url: `task/detail/${id}/`,
    token,
  });
};
