import "./App.css";
import { Login, Signup, TaskListContainer } from "./pages";
import { Navigate, Route, Routes } from "react-router-dom";
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/task" element={<TaskListContainer />} />
          <Route path="/test" element={<div>test</div>} />
        </Route>
        <Route path="*" element={<Error message="Page not found" />} />
      </Routes>
    </div>
  );
}

export default App;
