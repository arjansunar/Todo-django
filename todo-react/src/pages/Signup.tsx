import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../provider";

const initError = {
  message: "",
  err: false,
};

const initialCredentialState = {
  username: "",
  password: "",
};
export const Signup = () => {
  const [credentials, setCredentials] = useState(() => initialCredentialState);
  const { isAuth } = useContext(AuthContext) as AuthContextType;

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
    alert(JSON.stringify(credentials));
    // call api after verification
    // try {
    //   await createUser(user);
    //   router.push(`/todo/${user}`);
    // } catch (error) {
    //   if (error.response.data?.status == "P2002") {
    //     router.push(`/todo/${user}`);
    //   }
    //   console.error(error);
    // }
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <div className=" bg-gray-200 text-gray-800 flex flex-col  items-center h-screen pt-24  ">
      <h2 className="font-bold text-xl uppercase italic mb-4">Sign Up</h2>
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
            className="px-6 py-1 bg-black text-gray-100 disabled:bg-gray-400 rounded mt-5 max-w-fit self-end "
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
