import { NavLink, useNavigate } from "react-router";

export function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-background grid grid-cols-5 py-12 px-40">
      <img src="logo.png" className="h-[173px] w-[245px]" />
      <div className="flex flex-col gap-8">
        <span className="text-2xl font-bold text-red-500">
          Спортивная экипировка
        </span>
        <a className="text-2xl font-normal mt-2">Для боксеров</a>
        <a className="text-2xl font-normal">Для MMA</a>
        <a className="text-2xl font-normal">Для Тхеквондо</a>
        <a className="text-2xl font-normal">пециальные добавки</a>
      </div>
      <div className="flex flex-col gap-8">
        <span className="text-2xl font-bold text-red-500">Блог</span>
        <a className="text-2xl font-normal mt-2">Pro Cпорт</a>
        <a className="text-2xl font-normal">Фитнес</a>
        <a className="text-2xl font-normal">Здоровое питание</a>
        <a className="text-2xl font-normal">Образ жизни</a>
      </div>
      <div className="flex flex-col gap-8">
        <span className="text-2xl font-bold text-red-500">О нас</span>
        <a className="text-2xl font-normal mt-2">Кто мы</a>
        <a className="text-2xl font-normal">Где купить</a>
        <a className="text-2xl font-normal">Контакты</a>
      </div>
      <div className="flex flex-col gap-8">
        <span className="text-2xl font-bold text-red-500">Мы в соц. сетях</span>
        <div className="flex gap-5">
          <img src="inst.png" />
          <img src="teleg.png" />
          <img src="vk.png" />
          <img src="youtube.png" />
        </div>
      </div>
    </footer>
  );
}
