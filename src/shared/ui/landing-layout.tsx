import { Outlet } from "react-router";
import { Props } from "./main-nav";
import { BriefcaseBusiness } from "lucide-react";
import { MainNavLanding } from "@/entities/landing/ui/main-nav-landing";
import { useEffect, useState } from "react";

export default function LandingLayout() {
  const headerContent: Props["headerContent"] = {
    logoTitle: "Груз Рынок",
    linksMain: [
      {
        // icon: BriefcaseBusiness,
        linkLabel: "Смотреть заявки",
        navigate: "/",
      },
    ],
    linksFooter: [
      {
        icon: BriefcaseBusiness,
        linkLabel: "Заявки",
      },
    ],
  };

  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      console.log("prevScrollPos", prevScrollPos);

      if (currentScrollPos <= 80) return;

      // Показываем хедер, если прокручиваем вверх
      if (prevScrollPos > currentScrollPos) {
        setHeaderVisible(true);
      } else {
        // Скрываем хедер, если прокручиваем вниз
        setHeaderVisible(false);
      }

      // Обновляем предыдущую позицию прокрутки
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full flex items-center px-6 ex:h-10 sm:h-10 md:h-16 lg:h-16 bg-background mx-auto border-b">
        <MainNavLanding headerContent={headerContent} />
      </div>
      <header
        className={`fixed top-0 left-0 w-full py-2 md:py-4 bg-background z-[20]
          px-6 mx-auto flex items-center border-b transition-transform duration-300  ${
            isHeaderVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <MainNavLanding headerContent={headerContent} />
      </header>
      <div className="flex-1 flex">
        <Outlet />
      </div>
    </div>
  );
}
