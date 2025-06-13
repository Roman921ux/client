import instance from "@/shared/model/api/axios-instance";
import { queryClient } from "@/shared/model/api/query-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  FireExtinguisherIcon,
  Heart,
  Minus,
  Plus,
  Trash,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
const urlImg =
  "https://images.unsplash.com/photo-1656543802898-41c8c46683a7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function BasketPage() {
  const navigate = useNavigate();
  const { data: basket } = useQuery({
    queryKey: ["basket"],
    queryFn: async () => {
      const response = await instance.get("/product/basket-user/all");
      console.log("basket", response.data);
      return response.data;
    },
  });

  const filterProduct = useMemo(() => {
    return basket?.filter((product) => product?.isPurchased === false);
  }, [basket]);

  const [count, setCount] = useState(0);

  const deleteMutation = useMutation({
    mutationFn: async (productId) => {
      const response = await instance.patch(
        `/product/basket-user/${productId}`,
        {
          status: true,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basket"] });
    },
  });
  return (
    <div className="bg-[#F6F6F6] w-full">
      <div className="container mx-auto">
        <div>
          <h5 className="font-bold text-[45px] pt-[47px] pb-[25px]">Корзина</h5>
          <div className="grid gap-6 grid-cols-3">
            <div className="flex flex-col gap-[25px] col-span-2">
              {filterProduct?.map((product) => (
                <div className="bg-white flex justify-between items-center rounded-[16px] pl-[36px] pb-[58px] pt-[80px] pr-[63px]">
                  <div className="h-[250px] w-[250px] mr-[53px]">
                    {product?.productId?.photo ? (
                      <img
                        className="object-cover h-full w-full"
                        src={product?.productId?.photo}
                      />
                    ) : (
                      <img
                        className="object-cover h-full w-full"
                        src={urlImg}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-[30px] font-normal">
                      {product?.productId?.name}
                    </span>
                    <div className="text-[15px] font-normal text-white bg-red-500 px-2 py-1 rounded-lg">
                      Распродажа
                    </div>
                    <div className="flex gap-2">
                      <div>
                        <Heart className="text-red-500" />
                      </div>
                      <div>
                        <Trash
                          onClick={() => deleteMutation.mutate(product?._id)}
                          className="text-red-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-red-500 text-[17px] font-extrabold">
                      {product?.productId?.price}₽ с картой warroir
                    </span>
                    <span className="text-[#888787] text-[17px] font-extrabold">
                      {product?.productId?.price}₽
                    </span>
                    <div className="flex gap-2">
                      <button
                        className="p-1"
                        onClick={() => setCount((prev) => prev - 1)}
                      >
                        <Minus />
                      </button>
                      <span className="border rounded-md text-[20px] font-normal px-3">
                        {count}
                      </span>
                      <button
                        className="p-1"
                        onClick={() => setCount((prev) => prev + 1)}
                      >
                        <Plus />
                      </button>
                    </div>
                    <span className="text-red-500 text-[15px] font-extrabold">
                      Количество ограничено
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-1 flex flex-col gap-[34px]">
              <div className="rounded-[16px] bg-white flex flex-col w-full">
                <div className="px-[34px] py-[43px] flex flex-col">
                  <button
                    onClick={() =>
                      navigate(
                        `/offer/${basket.reduce(
                          (sum, product) => sum + product?.productId?.price,
                          0,
                        )}`,
                      )
                    }
                    className="text-[20px] font-semibold rounded-md px-4 py-3 w-full bg-[#38CA49] text-white"
                  >
                    Перейти к оформлению
                  </button>
                  <span className="text-[15px] font-normal mt-[18px] text-[#888787]">
                    Доступные способы и время доставки можно выбрать при
                    оформлении заказа
                  </span>
                </div>
                <div className="w-full bg-[#CCCCCC] h-[1px]" />
                <div className="px-[34px] py-[43px] flex flex-col gap-[10px]">
                  <div className="w-full flex justify-between items-end">
                    <span className="text-[20px] font-bold">Ваша корзина</span>
                    <span className="text-[12px] font-normal text-[#888787]">
                      {basket?.length} товара
                    </span>
                  </div>
                  <div className="w-full flex justify-between items-end">
                    <span className="text-[18px] font-normal">
                      Товары ( {basket?.length} )
                    </span>
                    <span className="text-[20px] font-bold">
                      {basket &&
                        basket.reduce(
                          (sum, product) => sum + product?.productId?.price,
                          0,
                        )}
                      ₽
                    </span>
                  </div>
                  <div className="w-full flex justify-between items-end">
                    <span className="text-[18px] font-normal">Скидка</span>
                    <span className="text-[20px] font-bold text-red-500">
                      350₽
                    </span>
                  </div>
                  <div className="w-full flex justify-between items-end">
                    <span className="text-[18px] font-bold text-blue-500">
                      Подробнее
                    </span>
                    <span className="text-[20px] font-bold text-red-500"></span>
                  </div>
                </div>
                <div className="w-full bg-[#CCCCCC] h-[1px]" />

                <div className="px-[34px] py-[43px] flex flex-col gap-[10px]">
                  <div className="w-full flex justify-between items-end">
                    <span className="text-[25px] font-bold">
                      С warrior картой
                    </span>
                    <span className="text-[25px] font-bold text-[#38CA49]">
                      3599₽
                    </span>
                  </div>
                  <div className="w-full flex justify-between items-end">
                    <span className="text-[18px] font-normal">
                      Без warrior картой
                    </span>
                    <span className="text-[20px] font-bold">3799₽</span>
                  </div>
                </div>
              </div>
              <div className="bg-white px-[34px] py-[26px] rounded-full flex justify-between w-full items-center">
                <span className="text-[25px] font-bold">
                  Начислим 258 бонусов
                </span>
                <ArrowRight className="text-primary/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
