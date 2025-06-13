import instance from "@/shared/model/api/axios-instance";
import { TDtoFighter } from "@/shared/model/types/fighter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
const urlImg =
  "https://images.unsplash.com/photo-1727528882203-27d1fb281807?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function FighterSection() {
  const { data: fighters } = useQuery({
    queryKey: ["fighters"],
    queryFn: async (): Promise<TDtoFighter[]> => {
      const response = await instance.get("/fighters");
      return response.data;
    },
  });

  return (
    <div className="flex flex-col gap-32 h-[1080px] border p-40">
      <span className="text-5xl font-bold border-b-2 border-red-500 w-fit">
        Бойцы
      </span>
      {fighters && <SliderFighter fighters={fighters} />}
    </div>
  );
}

function SliderFighter({ fighters }: { fighters: TDtoFighter[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Количество отображаемых элементов
  const visibleItems = 3;

  // Переключение влево
  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Переключение вправо
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, fighters.length - visibleItems),
    );
  };

  return (
    <div className="pl-28 pr-12 relative overflow-hidden">
      {/* Контейнер для карточек */}
      <div
        className="flex transition-transform duration-300"
        style={{
          transform: `translateX(-${currentIndex * (110 / visibleItems)}%)`,
        }}
      >
        {fighters?.map((fighter) => (
          <div
            key={fighter._id}
            className="flex-shrink-0"
            style={{ width: `${110 / visibleItems}%` }}
          >
            <FighterCard fighter={fighter} />
          </div>
        ))}
      </div>

      {/* Кнопки навигации */}
      <button
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className="border border-red-500 p-4 text-red-500 absolute left-2 top-1/2 rounded-full "
      >
        <ArrowLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        disabled={currentIndex >= fighters.length - visibleItems}
        className="border border-red-500 p-4 text-red-500 absolute right-2 top-1/2 rounded-full"
      >
        <ArrowRight className="w-8 h-8" />
      </button>
    </div>
  );
}

function FighterCard({ fighter }: { fighter: TDtoFighter }) {
  return (
    <div className="flex flex-col gap-12 w-fit">
      <div className="relative w-[300px] h-[365px]">
        <img
          className="object-cover w-full h-full"
          src={fighter?.photo || urlImg}
        />
        <img className="absolute top-0 left-0 z-[-1]" src="/red.png" />
      </div>

      <div className="flex flex-col gap-0">
        <span className="text-3xl font-bold">{fighter?.name}</span>
        <span className="text-xl font-normal text-red-500 mt-6">
          {fighter?.dignity}
        </span>
        <span className="text-xl font-normal">{fighter?.country}</span>
      </div>
    </div>
  );
}
