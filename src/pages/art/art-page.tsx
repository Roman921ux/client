import instance from "@/shared/model/api/axios-instance";
import { Footer } from "@/shared/ui/footer";
import { useQuery } from "@tanstack/react-query";
import { Search, ThumbsDown, ThumbsUp } from "lucide-react";
import { useMemo, useState } from "react";

export default function ArtPage() {
  const { data: arts } = useQuery({
    queryKey: ["fight-up"],
    queryFn: async () => {
      const response = await instance.get("/material-arts");
      return response.data;
    },
  });

  const [search, setSearch] = useState("");

  const filterArt = useMemo(() => {
    return arts?.filter((art) =>
      art?.name?.toLowerCase().includes(search?.toLowerCase()),
    );
  }, [arts, search]);
  return (
    <div className="w-full">
      <div className="container mx-auto pb-40">
        <div className="text-center flex items-center flex-col gap-[60px] mt-[250px]">
          <div className="flex flex-col gap-[32px]">
            <h3 className="font-extrabold text-[100px]">БОЕВЫЕ ИСКУССТВА</h3>
            {/* <span className="font-normal text-[37px]">
             Тысячи различных товаров для настоящих профессионалов своего дела
           </span> */}
          </div>
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Введите названи товара"
              className="py-5 px-[28px] w-[944px] rounded-full relative border shadow-lg"
            />
            <Search className="w-8 h-8 text-red-500 absolute top-[15px] right-[25px]" />
          </div>
        </div>
        <div className="flex flex-col gap-20 pt-[60px]">
          <div className="h-1 w-full bg-[#D9D9D9] my-[76px]" />
          {filterArt?.map((art) => (
            <div className="flex flex-col gap-6 w-full">
              <h5 className="text-[48px] font-bold">{art.name}</h5>
              <span className="text-[20px] font-normal">{art.content}</span>
              <img src={art?.photo} />
              {art?.video && <video src={art?.video} controls />}
              <div className="w-full flex items-center justify-center">
                <div className="flex gap-[26px] py-10 pt-[228px] w-fit">
                  <div className="rounded-full p-4 shadow-md">
                    <ThumbsUp className="text-red-500" />
                  </div>
                  <div className="rounded-full p-4 shadow-md">
                    <ThumbsDown className="text-red-500" />
                  </div>
                  <div className="bg-[#363636] text-white text-center p-2 px-6 rounded-full text-[25px] font-bold">
                    Комментировть
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
