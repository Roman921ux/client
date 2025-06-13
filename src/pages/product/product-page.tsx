import { useAuth } from "@/app/providers/auth-provider";
import instance from "@/shared/model/api/axios-instance";
import { queryClient } from "@/shared/model/api/query-client";
import { TDtoProduct } from "@/shared/model/types/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Cog, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
const urlImg =
  "https://images.unsplash.com/photo-1656543802898-41c8c46683a7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function ProductPage() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<TDtoProduct[]> => {
      const response = await instance.get("/product");
      return response.data;
    },
  });
  const [search, setSearch] = useState("");

  const felterProduct = useMemo(() => {
    return products?.filter((product) =>
      product?.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  return (
    <div className="bg-black w-full">
      <div className="container mx-auto text-center flex items-center flex-col gap-[60px] mt-[250px]">
        <div className="flex flex-col gap-[32px] text-white">
          <h3 className="font-extrabold text-[150px]">МАГАЗИН</h3>
          <span className="font-normal text-[37px]">
            Тысячи различных товаров для настоящих профессионалов своего дела
          </span>
        </div>
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Введите названи товара"
            className="py-5 px-[28px] w-[944px] rounded-full relative"
          />
          <Search className="w-8 h-8 text-red-500 absolute top-[15px] right-[25px]" />
        </div>
      </div>
      <div className="mx-auto mt-[214px]">
        <div className="text-background flex flex-col gap-32 pl-[160px] pr-[93px] pb-20">
          <span className="text-5xl font-bold border-b-2 border-red-500 w-fit h-fit">
            Товары
          </span>
          <div className="grid grid-cols-3 gap-y-[103px] w-full justify-between">
            {felterProduct &&
              felterProduct?.map((product) => (
                <ProductCard product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: TDtoProduct }) {
  const auth = useAuth();
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await instance.patch("/product/basket-user", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basket"] });
      navigate("/basket");
    },
  });
  return (
    <div className="flex flex-col gap-8 w-fit">
      <Cog
        className="mb-[61px] hover:cursor-pointer"
        onClick={() => navigate(`/admin/edit-product/${product?._id}`)}
      />
      <div className="w-[300px] h-[300px]">
        <img
          className="object-cover w-full h-full"
          src={product?.photo || urlImg}
        />
      </div>

      <div className="flex flex-col gap-0">
        <span className="text-3xl font-normal">{product?.name}</span>
        <span className="text-7xl font-bold text-red-500 mt-6">
          {product?.price}
        </span>
      </div>

      <div className="flex gap-[25px]">
        <button className="font-bold text-[35px] text-white py-2 px-8 rounded-full border border-red-500">
          Подробнее
        </button>
        {auth?.token && (
          <button
            onClick={() => {
              const data = {
                productId: product?._id,
                count: 1,
              };
              console.log("data", data);
              createMutation.mutate(data);
            }}
            className="font-bold text-[35px] text-white p-5 rounded-full border border-red-500"
          >
            <Plus className="text-white/80 rounded-full w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  );
}
