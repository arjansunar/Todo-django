import "./App.css";
import { Login, Signup, TaskListContainer } from "./pages";
import { Route, Routes } from "react-router-dom";
import { Error, LogoutButton } from "./components";
import { ProtectedRoutes } from "./routing/ProtectedRoutes";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "./provider";

function App() {
  const { isAuth } = useContext(AuthContext) as AuthContextType;
  console.log({ isAuth });
  return (
    <div>
      <LogoutButton />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/task" element={<div>task</div>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error message="Page not found" />} />
      </Routes>
    </div>
  );
}

export default App;
