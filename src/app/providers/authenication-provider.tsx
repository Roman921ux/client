import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth-provider";
import { ReactNode } from "react";

export default function Authentication({ children }: { children: ReactNode }) {
  const authContext = useAuth();
  const location = useLocation();

  if (!authContext?.token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  // if (authContext.user?.role != "admin") {
  //   return <Navigate to="/" state={{ path: location.pathname }} />;
  // }
  return children;
}
