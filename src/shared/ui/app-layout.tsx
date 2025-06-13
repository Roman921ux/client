import { Outlet } from "react-router";
import { MainNav } from "./main-nav";
import { Toaster } from "../components/ui/toaster";

export default function AppLayout() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="">
        <MainNav />
      </div>

      <div className="relative flex-1 flex">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}
