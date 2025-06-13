import instance from "@/shared/model/api/axios-instance";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function EditFighterPage() {
  const { fighterId } = useParams();

  const [imageUrl, setImageUrl] = useState(null);

  const { data } = useQuery({
    queryKey: ["fighter", fighterId],
    queryFn: async ({ queryKey }) => {
      const [_, id] = queryKey;
      const response = await instance.get(`/fighters/${id}`);
      return response.data;
    },
  });

  useEffect(() => {
    setImageUrl(data?.photo);
  }, [data]);
  return (
    <div className="border h-full flex items-center justify-center">
      <div className="flex flex-col gap-[47px]">
        <ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <FormDataF imageUrl={imageUrl} fighterId={fighterId} />
      </div>
    </div>
  );
}

function ImageUploader({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string | null;
  setImageUrl: Dispatch<SetStateAction<string | null>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef) fileInputRef?.current.click();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    setIsLoading(true);
    setError(null);

    try {
      const response = await instance.post("/photos/upload-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImageUrl(response.data.url);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex  gap-[40px]">
      <div className="flex flex-col">
        <button
          onClick={handleButtonClick}
          disabled={isLoading}
          className="max-w-[130px] text-left"
        >
          {isLoading ? "Загрузка..." : "Редактировать фото"}
        </button>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </div>

      {isLoading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={imageUrl}
            alt="Превью загруженного изображения"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}
    </div>
  );
}

import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/shared/model/api/query-client";
import { useNavigate, useParams } from "react-router";

function FormDataF({
  imageUrl,
  fighterId,
}: {
  imageUrl: string | null;
  fighterId: string | undefined;
}) {
  console.log("fighterId", fighterId);
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["fighter", fighterId],
    queryFn: async ({ queryKey }) => {
      const [_, id] = queryKey;
      const response = await instance.get(`/fighters/${id}`);
      return response.data;
    },
  });
  const [formData, setFormData] = useState({
    photo: imageUrl,
    name: "",
    fightClub: "",
    country: "",
    weightCategory: "",
    dignity: "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, photo: imageUrl }));
  }, [imageUrl]);

  useEffect(() => {
    setFormData(() => ({
      photo: data?.photo,
      name: data?.name,
      fightClub: data?.fightClub,
      country: data?.country,
      weightCategory: data?.weightCategory,
      dignity: data?.dignity,
    }));
  }, [data]);

  const editMutation = useMutation({
    mutationFn: async (data) => {
      console.log("editMutation", data);
      const response = await instance.put(`/fighters/${fighterId}`, data);
      return response.data;
    },
    onSuccess: () => {
      console.log("успешно");
      queryClient.invalidateQueries({ queryKey: ["fighter"] });
      navigate("/fighter");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await instance.delete(`/fighters/${fighterId}`);
      return response.data;
    },
    onSuccess: () => {
      console.log("успешно");
      queryClient.invalidateQueries({ queryKey: ["fighter"] });
      navigate("/fighter");
    },
  });

  const handleDeleteFighter = () => {
    deleteMutation.mutate();
  };

  return (
    <div className="flex flex-col gap-[59px]">
      <div className="flex gap-[36px]">
        <span className="max-w-[130px]">Редактировать информацию</span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editMutation.mutate(formData);
          }}
          className="w-full flex flex-col gap-1"
        >
          <input
            value={formData.name}
            name="name"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Имя"
            className="rounded-[0px] border border-black w-full font-bold text-[30px]"
          />
          <input
            value={formData.fightClub}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fightClub: e.target.value }))
            }
            name="fightClub"
            placeholder="Название клуба"
            className="rounded-[0px] border border-black w-full font-bold text-[30px]"
          />
          <input
            value={formData.country}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, country: e.target.value }))
            }
            name="country"
            placeholder="Страна"
            className="rounded-[0px] border border-black w-full font-bold text-[30px]"
          />
          <input
            value={formData.weightCategory}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                weightCategory: e.target.value,
              }))
            }
            name="weightCategory"
            placeholder="Весовая категория"
            className="rounded-[0px] border border-black w-full font-bold text-[30px]"
          />
          <input
            value={formData.dignity}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, dignity: e.target.value }))
            }
            name="dignity"
            placeholder="Награды"
            className="rounded-[0px] border border-black w-full font-bold text-[30px]"
          />

          <div className="flex gap-[89px] mt-[51px]">
            <button type="submit">Сохранить</button>
            <button
              type="button"
              onClick={handleDeleteFighter}
              className="text-[14px] font-normal text-white bg-red-500 rounded-full px-[46px] py-2"
            >
              Удалить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
