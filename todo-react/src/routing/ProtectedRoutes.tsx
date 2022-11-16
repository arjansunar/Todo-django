import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext, AuthContextType } from "../provider";

export const ProtectedRoutes = () => {
  const { isAuth } = useContext(AuthContext) as AuthContextType;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
