import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import { Navigate, useRoutes } from "react-router-dom";
import SignupPage from "@/pages/SignupPage";
import { useAuthContext } from "@/hooks/useAuthContext";

const Router = () => {
  const { isLoggedIn } = useAuthContext();

  return useRoutes([
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: isLoggedIn ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <LoginPage />
      ),
    },
    {
      path: "/signup",
      element: isLoggedIn ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <SignupPage />
      ),
    },
    {
      path: "/dashboard",
      element: isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />,
    },
  ]);
};

export default Router;
