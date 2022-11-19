import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface RegisterArgs {
  username: string;
  password: string;
  email: string;
}

export const register = async ({ username, password, email }: RegisterArgs) => {
  return await axios.post(`${BACKEND_URL}/signup/`, {
    username,
    password,
    email,
  });
};
