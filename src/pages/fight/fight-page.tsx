import instance from "@/shared/model/api/axios-instance";
import { TDtoFight } from "@/shared/model/types/fight";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";
import { useNavigate } from "react-router";

export default function FightPage() {
  const { data: fightsUpC } = useQuery({
    queryKey: ["fight-up"],
    queryFn: async (): Promise<TDtoFight[]> => {
      const response = await instance.get("/fights/up-coming");
      return response.data;
    },
  });
  const { data: fightsNotC } = useQuery({
    queryKey: ["fight-not"],
    queryFn: async (): Promise<TDtoFight[]> => {
      const response = await instance.get("/fights/not-coming");
      return response.data;
    },
  });

  return (
    <div className="w-full border flex flex-col justify-start items-center py-20 gap-20">
      <span className="font-bold text-[100px]">Бои</span>
      {fightsUpC && fightsNotC && (
        <CarouselSize fights={[...fightsUpC, ...fightsNotC]} />
      )}
    </div>
  );
}

export function CarouselSize({ fights }: { fights: TDtoFight[] }) {
  return (
    <div className="w-full px-20">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {fights.map((fight, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <FightCard fight={fight} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

function FightCard({ fight }: { fight: TDtoFight }) {
  const navigate = useNavigate();

  return (
    <div className="w-[500px] flex flex-col items-center gap-9">
      {fight.video ? (
        <video controls src={fight.video} className="w-[500px]" />
      ) : (
        <div className="w-[500px] h-[280px] text-2xl font-medium text-primary/80 flex items-center justify-center bg-primary/5">
          Вид еще нет
        </div>
      )}
      <div className="flex flex-col gap-2 items-center">
        <span className="font-bold text-xl">{fight.nameFight}</span>
        {fight.upComing ? (
          <button
            onClick={() => navigate(`/fight/${fight?._id}`)}
            className="bg-black px-4 py-3 text-xl rounded-xl font-bold text-background"
          >
            Проголосовать
          </button>
        ) : (
          <span className="font-medium text-xl">Прошедший бой</span>
        )}
      </div>
      <div>
        <button onClick={() => navigate(`/admin/edit-fight/${fight?._id}`)}>
          Редактировать
        </button>
      </div>
    </div>
  );
}
