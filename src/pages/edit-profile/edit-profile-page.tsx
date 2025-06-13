import instance from "@/shared/model/api/axios-instance";
import { queryClient } from "@/shared/model/api/query-client";
import { Footer } from "@/shared/ui/footer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await instance.get("/users/me");
      return response.data;
    },
  });

  useEffect(() => {
    setFormData({
      name: user?.name,
      email: user?.email,
    });
  }, [user]);

  const editMutation = useMutation({
    mutationFn: async (data) => {
      const response = await instance.put("/users/me", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/profile");
    },
  });

  return (
    <div className="container mx-auto mt-[30px]">
      <div className="flex items-center gap-36 mb-20">
        <h5 className="text-[45px] font-normal">Редактировние профиля</h5>
        <div className="flex gap-[50px]">
          <button
            onClick={() => editMutation.mutate(formData)}
            className="bg-primary/80 text-white rounded-lg h-fit px-4 py-2"
          >
            Сохранить изменения
          </button>
          <button
            onClick={() => navigate(-1)}
            className="border-2 border-primary/50 rounded-lg h-fit px-4 py-2"
          >
            Отменить
          </button>
        </div>
      </div>

      <form className="flex flex-col gap-10">
        <span className="font-normal text-[40px]">Личные данные</span>
        <div className="flex flex-col gap-2">
          <span className="font-normal text-[30px]">Ваш ник</span>
          <input
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border rounded-lg p-4 py-6"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-normal text-[30px]">Поменять почту</span>
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="border rounded-lg p-6 py-6"
          />
        </div>
      </form>

      <div className="mt-[201px]">
        <div className="h-1 w-fulla mb-[69px] bg-[#D9D9D9]" />
        <Footer />
      </div>
    </div>
  );
}
