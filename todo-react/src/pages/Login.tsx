import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "../provider";
import { useNavigate } from "react-router-dom";

const initError = {
  message: "",
  err: false,
};

const initialCredentialState = {
  username: "",
  password: "",
};

export const Login = () => {
  const [credentials, setCredentials] = useState(() => initialCredentialState);
  const { login, tokens, setTokens, isAuth } = useContext(
    AuthContext
  ) as AuthContextType;

  const navigate = useNavigate();

  const setUsername = (username: string) => {
    setCredentials((prev) => ({ ...prev, username }));
  };
  const setPassword = (password: string) => {
    setCredentials((prev) => ({ ...prev, password }));
  };

  const isValid = () => {
    return credentials.username.length && credentials.password.length;
  };

  const handleUserSubmission = async (e: FormEvent) => {
    e.preventDefault();
    const tokens = await login(credentials);
    if (tokens) setTokens(tokens);
    console.log("new tokens", tokens);
    navigate("/task");
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/task");
    }
  }, [isAuth]);

  return (
    <div className=" bg-gray-200 text-gray-800 flex flex-col  items-center h-screen pt-24  ">
      <a
        href="/signup"
        className="absolute top-2 right-4 flex gap-1 items-center"
      >
        Register
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </a>
      <h2 className="font-bold text-xl uppercase italic mb-4">Login </h2>
      <div className="container px-3 max-w-md mx-auto">
        <form
          onSubmit={handleUserSubmission}
          className="bg-white rounded shadow px-4 py-4 flex flex-col"
        >
          <div className="title font-bold text-lg">Enter User Credentials</div>
          <input
            type="text"
            placeholder="username"
            className=" rounded-sm shadow-sm px-4 py-2 border border-gray-200 w-full mt-4"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className=" rounded-sm shadow-sm px-4 py-2 border border-gray-200 w-full mt-4"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="px-6 py-1 bg-black text-gray-100 disabled:bg-gray-400 rounded mt-5 max-w-fit self-end"
            type="submit"
            disabled={!isValid()}
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
};
