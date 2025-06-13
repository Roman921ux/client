import { useAuth } from "@/app/providers/auth-provider";
import instance from "@/shared/model/api/axios-instance";
import { queryClient } from "@/shared/model/api/query-client";
import { Footer } from "@/shared/ui/footer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Heart, Minus, Plus, ShoppingBasket, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router";
const urlImg =
  "https://images.unsplash.com/photo-1656543802898-41c8c46683a7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function ProfilePage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await instance.get("/users/me");
      return response.data;
    },
  });

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

  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-[100px] w-full">
      <div className=" pt-[98px] px-[187px] w-full">
        <div className="flex justify-between w-full">
          <div className="flex gap-8">
            <div>
              <img src="/user.png" className="w-[112px] h-[112px]" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-5xl">{user?.name}</span>
              <span className="font-normal text-2xl text-primary/60">
                {user?.email}
              </span>
            </div>
          </div>
          <div className="flex gap-[50px]">
            <button
              onClick={() => navigate(`/edit-profile`)}
              className="bg-primary/80 text-white rounded-lg h-fit px-4 py-2"
            >
              Редактировать профиль
            </button>
            <button
              onClick={() => {
                auth?.logOut();
              }}
              className="border-2 border-primary/50 rounded-lg h-fit px-4 py-2"
            >
              Выйти
            </button>
          </div>
        </div>
        <div className="mt-[92px]">
          <NavLink
            to="/basket"
            className="text-[30px] font-bold mb-[39px] flex gap-5 items-center"
          >
            Корзина <ShoppingBasket className="w-8 h-8" />
          </NavLink>
          <div className="grid grid-cols-2 gap-10">
            {filterProduct?.map((product) => (
              <div className="bg-white border flex justify-between items-center rounded-[16px] pl-[36px] pb-[58px] pt-[80px] pr-[63px]">
                <div className="h-[250px] w-[250px] mr-[53px]">
                  {product?.productId?.photo ? (
                    <img
                      className="object-cover h-full w-full"
                      src={product?.productId?.photo}
                    />
                  ) : (
                    <img className="object-cover h-full w-full" src={urlImg} />
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
                    <div onClick={() => deleteMutation.mutate(product?._id)}>
                      <Trash className="text-red-500" />
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
