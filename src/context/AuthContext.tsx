import { createContext, useState } from "react";
import Cookies from "js-cookie";

export interface AuthContextType {
  isLoggedIn: boolean;
  handleLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    Cookies.get("token") !== undefined ? true : false
  );

  const handleLoggedIn = (isLoggedIn: boolean) => {
    setIsLoggedIn(isLoggedIn);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
