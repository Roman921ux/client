import instance from "@/shared/model/api/axios-instance";
import { TDtoFighter } from "@/shared/model/types/fighter";
import { useQuery } from "@tanstack/react-query";
import { Cog } from "lucide-react";
import { useNavigate } from "react-router";
const urlImg =
  "https://images.unsplash.com/photo-1727528882203-27d1fb281807?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function FighterPage() {
  const { data: fighters } = useQuery({
    queryKey: ["fighters"],
    queryFn: async (): Promise<TDtoFighter[]> => {
      const response = await instance.get("/fighters");
      return response.data;
    },
  });
  return (
    <div className="w-full pl-[162px] pr-[128px] flex flex-col">
      <span className="text-[150px] font-extrabold w-full text-center mt-[133px] mb-[284px]">
        Бойцы
      </span>
      <div className="w-full grid grid-cols-3 gap-y-[136px] gap-x-[360px] justify-between pb-[100px]">
        {fighters?.map((fighter) => <FighterCard fighter={fighter} />)}
      </div>
    </div>
  );
}

function FighterCard({ fighter }: { fighter: TDtoFighter }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-12 w-fit">
      <Cog
        className="hover:cursor-pointer"
        onClick={() => navigate(`/admin/edit-fighter/${fighter?._id}`)}
      />
      <div className="relative w-[300px] h-[365px]">
        <img
          className="object-cover w-full h-full z-[999]"
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
