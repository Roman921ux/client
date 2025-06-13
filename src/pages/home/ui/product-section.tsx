import instance from "@/shared/model/api/axios-instance";
import { TDtoProduct } from "@/shared/model/types/product";
import { useQuery } from "@tanstack/react-query";
const urlImg =
  "https://images.unsplash.com/photo-1656543802898-41c8c46683a7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function ProductSection() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<TDtoProduct[]> => {
      const response = await instance.get("/product");
      return response.data;
    },
  });

  return (
    <div className="bg-black text-background h-[1080px] flex flex-col gap-32 p-40">
      <span className="text-5xl font-bold border-b-2 border-red-500 w-fit h-fit">
        Товары
      </span>
      <div className="flex w-full justify-between">
        {products &&
          products
            .slice(0, 3)
            .map((product) => <ProductCard product={product} />)}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: TDtoProduct }) {
  return (
    <div className="flex flex-col gap-8 w-fit">
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
    </div>
  );
}
