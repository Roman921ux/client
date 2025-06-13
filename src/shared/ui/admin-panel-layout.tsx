import { NavLink, Outlet } from "react-router";
import { Toaster } from "../components/ui/toaster";

const navMap = [
  {
    link: "/add-fighter",
    label: "Добавить бойца",
    img: "add-fighter.png",
  },
  {
    link: "/add-product",
    label: "Добавить товар",
    img: "add-product.png",
  },
  {
    link: "/add-art",
    label: "Добавить боевое искусство",
    img: "add-art.png",
  },
  {
    link: "/add-video",
    label: "Добавить видео",
    img: "add-video.png",
  },
  {
    link: "/add-fight",
    label: "Добавить бой",
    img: "add-fight.png",
  },
  {
    link: "/add-vote",
    label: "Создть голосование",
    img: "add-vote.png",
  },
];

export default function AdminPanelLayout() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="bg-black text-[67px] font-normal text-white py-[15px] px-[38px]">
        Admin Pabel
      </div>

      <div className="relative flex-1 grid grid-cols-8">
        <div className="col-span-2 flex flex-col bg-black gap-1">
          {navMap.map((link) => (
            <NavLink
              className="bg-[#363636] py-4 px-[38px] text-white flex items-center gap-[35px]"
              to={`admin${link.link}`}
            >
              <img src={`/${link.img}`} className="h-[35px] w-[35px]" />
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="border col-span-6">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
