import instance from "@/shared/model/api/axios-instance";
import { queryClient } from "@/shared/model/api/query-client";
import { TDtoFighter } from "@/shared/model/types/fighter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function EditFightPage() {
  const { fightId } = useParams();

  const { data: fightEdit } = useQuery({
    queryKey: ["fighter", fightId],
    queryFn: async ({ queryKey }) => {
      const [_, id] = queryKey;
      const response = await instance.get(`/fights/${id}`);
      console.log("fightEdit", response.data);
      return response.data;
    },
  });
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    setImageUrl(fightEdit?.video);
  }, [fightEdit]);

  const [formData, setFormData] = useState({
    nameFight: "",
    date: new Date(),
    leftCornerFighterId: "",
    rightCornerFighterId: "",
  });

  useEffect(() => {
    setFormData(() => ({
      nameFight: fightEdit?.nameFight,
      date: fightEdit?.date,
      leftCornerFighterId: fightEdit?.fighters.leftCornerFighterId?._id,
      rightCornerFighterId: fightEdit?.fighters.rightCornerFighterId?._id,
    }));
  }, [fightEdit]);

  const navigate = useNavigate();

  const { data: fighters } = useQuery({
    queryKey: ["fighters"],
    queryFn: async (): Promise<TDtoFighter[]> => {
      const response = await instance.get("/fighters");
      return response.data;
    },
  });
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    corner: "left" | "right",
  ) => {
    const selectedId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [`${corner}CornerFighterId`]: selectedId,
    }));
  };

  const editMutation = useMutation({
    mutationFn: async (data) => {
      console.log("editMutation", data);
      const response = await instance.put(`/fights/${fightId}`, data);
      return response.data;
    },
    onSuccess: () => {
      console.log("успешно");
      queryClient.invalidateQueries({ queryKey: ["fight-up"] });
      queryClient.invalidateQueries({ queryKey: ["fight-not"] });

      navigate("/fight");
    },
  });

  return (
    <div className="w-full flex flex-col items-center p-20 gap-6">
      <h4 className="font-bold text-[45px] w-full text-left">Добавиь бой</h4>

      <div className="flex gap-4">
        <input
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
          className="border border-black w-[300px]"
        />
        <div className="rounded-lg bg-black text-white p-2 w-fit">Дата</div>
      </div>
      <VideoUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const data = {
            nameFight: formData.nameFight,
            date: formData.date,
            fighters: {
              leftCornerFighterId: formData.leftCornerFighterId,
              rightCornerFighterId: formData.rightCornerFighterId,
            },
            video: imageUrl,
          };
          console.log("data", data);
          editMutation.mutate(data);
        }}
        className=" flex flex-col gap-6 items-center"
      >
        <div className="flex flex-col items-center gap-4">
          <input
            value={formData.nameFight}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, nameFight: e.target.value }))
            }
            className="border border-black w-[300px]"
          />
          <div className="rounded-lg bg-black text-white p-2 w-fit">
            Название боя
          </div>
        </div>

        <select
          value={formData.leftCornerFighterId}
          onChange={(e) => handleSelectChange(e, "left")}
        >
          <option value="">Выберите бойца (левый угол)</option>
          {fighters?.map((fighter) => (
            <option key={fighter._id} value={fighter._id}>
              {fighter.name}
            </option>
          ))}
        </select>
        <select
          value={formData.rightCornerFighterId}
          onChange={(e) => handleSelectChange(e, "right")}
        >
          <option value="">Выберите бойца (правый угол)</option>
          {fighters?.map((fighter) => (
            <option key={fighter._id} value={fighter._id}>
              {fighter.name}
            </option>
          ))}
        </select>
        <button>Отредактирать бой</button>
      </form>
    </div>
  );
}

function VideoUploader({
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
    formData.append("video", file);

    setIsLoading(true);
    setError(null);

    try {
      const response = await instance.post("/videos/upload-video", formData, {
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
          className="max-w-full text-left"
        >
          {isLoading ? (
            "Загрузка..."
          ) : (
            <div className="p-10">
              <div className="rounded-md bg-black text-white p-2 w-fit">
                Загрузить превью
              </div>
            </div>
          )}
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
          <video
            src={imageUrl}
            controls
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}
    </div>
  );
}
