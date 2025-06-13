import { useAuth } from "@/app/providers/auth-provider";
import { Menu, Search } from "lucide-react";
import { NavLink } from "react-router";

export type TLinksHeader = {
  icon?: React.ComponentType<{ className?: string }>;
  linkLabel: string;
  navigate: string;
};

export function MainNav() {
  const userContext = useAuth();
  const linkHeader: TLinksHeader[] = [
    {
      linkLabel: "Главная",
      navigate: "/",
    },
    {
      linkLabel: "Бои",
      navigate: "/fight",
    },
    {
      linkLabel: "Бойцы",
      navigate: "/fighter",
    },
  ];
  const linkSubHeader: TLinksHeader[] = [
    {
      linkLabel: "Боевые искусства",
      navigate: "/art",
    },
    {
      linkLabel: "Магазин",
      navigate: "/product",
    },
    {
      linkLabel: "Корзина",
      navigate: "/basket",
    },
  ];

  return (
    <div className="flex justify-between items-center px-12 py-8 border">
      <Menu className="text-primary/60 w-10 h-10" />
      <div className="flex gap-10 font-bold text-sm text-primary/60">
        {linkHeader?.map((link) => (
          <NavLink
            to={link.navigate}
            className={({ isActive }) =>
              isActive ? "border-b border-1 border-red-500" : ""
            }
          >
            {link.linkLabel}
          </NavLink>
        ))}
      </div>
      <img src="logo.png" className="h-40 w-30" />
      <div className="flex gap-10 font-bold text-sm text-primary/60 items-center">
        {linkSubHeader?.map((link) => (
          <NavLink
            to={link.navigate}
            className={({ isActive }) =>
              isActive ? "border-b border-1 border-red-500" : ""
            }
          >
            {link.linkLabel}
          </NavLink>
        ))}
        <Search className="w-10 h-10 text-primary/40" />
      </div>
      <div>
        {userContext?.token ? (
          <NavLink to="/profile" className="text-primary/60 font-bold text-sm">
            Профиль
          </NavLink>
        ) : (
          <div className="flex font-bold text-sm">
            <NavLink to="/login" className="text-primary/60">
              Вход
            </NavLink>
            <span className="text-primary/60">/</span>
            <NavLink to="/register" className="text-red-500">
              Регистрация
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
