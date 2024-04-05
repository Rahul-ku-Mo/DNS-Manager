import axios from "axios";
import Cookies from "js-cookie";
import { useAuthContext } from "@/hooks/useAuthContext";

const useAuth = () => {
  const { handleLoggedIn } = useAuthContext();

  const signup = async (
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        {
          email,
          password,
          firstname,
          lastname,
        }
      );

      const token = response.data.accesstoken;

      Cookies.set("token", token, { expires: 7 });

      handleLoggedIn(true);

      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email,
          password,
        }
      );

      const token = response.data.accesstoken;

      Cookies.set("token", token, { expires: 7 });

      handleLoggedIn(true);

      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return { signup, login };
};

export default useAuth;
