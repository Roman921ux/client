import { useLocalStorage } from "@/shared/hooks/use-localStorage";
import instance from "@/shared/model/api/axios-instance";
import { createContext, ReactNode, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IUserDto } from "@/shared/model/types/user";
import { useQuery } from "@tanstack/react-query";

// то что приходит в функцию логирования
type LoginData = {
  email: string;
  password: string;
};
type RegisterData = {
  email: string;
  password: string;
  name: string;
};
// приходит в ответ на вызов функции login
type LoginDataDto = IUserDto & {
  token: string;
};

type RegisterDataDto = IUserDto & {
  token: string;
};

interface AuthContextProps {
  token: string | null;
  logIn: (data: LoginData) => Promise<LoginDataDto>;
  logOut: () => void;
  logUp: (data: RegisterData) => Promise<RegisterDataDto>;
  user: IUserDto | undefined;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await instance.get("/users/me");
      return response.data;
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  const [token, setToken] = useLocalStorage<string | null>("token", null);

  const logIn = async (data: LoginData): Promise<LoginDataDto> => {
    try {
      const response = await instance.post("/auth/login", data);
      console.log("loginRequest", response.data);

      // TODO: проверь правильно или нет
      setToken(response.data.token);

      navigate(redirectPath, { replace: true });
      return response.data;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  const logUp = async (data: RegisterData): Promise<RegisterDataDto> => {
    try {
      console.log("RegisterData", data);
      const response = await instance.post("/auth/register", data);
      console.log("registerCompanyRequest", response.data);

      setToken(response.data.token);
      navigate("/login");

      return response.data;
    } catch (error) {
      console.error("Register error", error);

      throw error;
    }
  };

  const logOut = () => {
    navigate("/");
    console.log("logOut");
    setTimeout(() => {
      setToken(null);
    }, 100);
  };

  return (
    <AuthContext.Provider value={{ token, user, logIn, logUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
