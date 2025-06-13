import { Outlet } from "react-router";
import { Toaster } from "../components/ui/toaster";

export default function AuthLayout() {
  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  );
}
