import "./App.css";
import { Login, Signup } from "./pages";
import { Route, Routes } from "react-router-dom";
import { Error } from "./components";
import { ProtectedRoutes } from "./routing/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/task" element={<div>task page</div>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Error message="Page not found" />} />
    </Routes>
  );
}

export default App;
