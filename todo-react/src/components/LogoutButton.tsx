import { useContext } from "react";
import { AuthContext, AuthContextType } from "../provider";

type Props = {};

export const LogoutButton = (props: Props) => {
  const { logout, setTokens, isAuth } = useContext(
    AuthContext
  ) as AuthContextType;

  const handleLogout = () => {
    logout();
    setTokens(null);
  };
  return isAuth ? (
    <button className="absolute top-2 right-4" onClick={handleLogout}>
      LogoutButton
    </button>
  ) : null;
};
