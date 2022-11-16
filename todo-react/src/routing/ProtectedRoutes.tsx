import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  let isAuth = false;

  //   if (!!token && String(token).length > 0) {
  //     isAuth = true;
  //   }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
