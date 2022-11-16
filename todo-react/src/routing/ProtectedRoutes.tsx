import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext, AuthContextType } from "../provider";

export const ProtectedRoutes = () => {
  let isAuth = false;
  const { tokens } = useContext(AuthContext) as AuthContextType;

  if (!!tokens && tokens.access.length > 0 && tokens.refresh.length > 0) {
    isAuth = true;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
