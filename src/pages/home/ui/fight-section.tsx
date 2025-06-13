import useFormatters from "@/shared/hooks/use-formatters";
import instance from "@/shared/model/api/axios-instance";
import { TDtoFight } from "@/shared/model/types/fight";
import { useQuery } from "@tanstack/react-query";
const urlImg =
  "https://images.unsplash.com/photo-1714583173985-fa58ef40c8d4?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function FightSection() {
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

  const { formatDate } = useFormatters();

  return (
    <div className="relative h-[1080px] border flex items-center justify-center">
      <div className="z-10 flex items-center gap-20 text-background">
        <div className="flex flex-col gap-8 text-center">
          <span className="text-5xl font-bold">Прошедший бой</span>
          {fightsNotC?.length > 0 && (
            <>
              <span className="text-3xl font-normal">
                {fightsNotC && fightsNotC[0]?.nameFight}
              </span>
              <span className="text-2xl font-normal">
                {fightsNotC &&
                  fightsNotC[0]?.fighters.leftCornerFighterId.weightCategory}
              </span>
              <span className="text-xl font-normal">
                {fightsNotC && formatDate(fightsNotC[0]?.date)}
              </span>
            </>
          )}
        </div>
        <div className="h-20 w-[2px] bg-red-500" />
        <div className="flex flex-col gap-8 text-center">
          <span className="text-5xl font-bold">Предстоящий бой</span>
          {fightsUpC?.length > 0 && (
            <>
              <span className="text-3xl font-normal">
                {fightsUpC && fightsUpC[0]?.nameFight}
              </span>
              <span className="text-2xl font-normal">
                {fightsUpC &&
                  fightsUpC[0]?.fighters.leftCornerFighterId.weightCategory}
              </span>
              <span className="text-xl font-normal">
                {fightsUpC && formatDate(fightsUpC[0]?.date)}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        <img src={urlImg} className="object-cover h-full w-full" />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
    </div>
  );
}
