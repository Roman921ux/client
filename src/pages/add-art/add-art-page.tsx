import instance from "@/shared/model/api/axios-instance";
import { queryClient } from "@/shared/model/api/query-client";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function AddArtPage() {
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    content: "",
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      console.log("createMutation", data);
      const response = await instance.post("/material-arts", data);
      return response.data;
    },
    onSuccess: () => {
      console.log("успешно");
      queryClient.invalidateQueries({ queryKey: ["art"] });
      navigate("/art");
    },
  });

  return (
    <div className="p-20">
      <h4 className="font-bold text-[45px]">Добавить боевое искусство</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = {
            ...formData,
            photo: photoUrl,
            video: videoUrl,
          };
          console.log("data", data);
          createMutation.mutate(data);
        }}
        className="w-full flex gap-6"
      >
        <div className="w-full flex flex-col gap-4">
          <div>
            <VideoUploader imageUrl={videoUrl} setImageUrl={setVideoUrl} />
            <ImageUploader imageUrl={photoUrl} setImageUrl={setPhotoUrl} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="rounded-lg bg-black text-white p-2 px-4 w-fit">
              Добавить нзвание
            </div>
            <input
              className="border border-black w-full h-[50px]"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="rounded-lg bg-black text-white p-2 px-4 w-fit">
              Добавить контент
            </div>
            <input
              className="border border-black w-full h-[50px]"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white rounded-lg p-2 px-4 h-fit"
        >
          Сохранить
        </button>
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
          type="button"
          onClick={handleButtonClick}
          disabled={isLoading}
          className="max-w-full text-left"
        >
          {isLoading ? (
            "Загрузка..."
          ) : (
            <div className="py-10">
              <div className="rounded-lg bg-black text-white p-2 px-4 w-fit">
                Загрузить видео
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
    <div className="flex gap-[40px]">
      <div className="flex flex-col">
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={isLoading}
          className="max-w-[130px] text-left"
        >
          {isLoading ? (
            "Загрузка..."
          ) : (
            <div className="py-10">
              <div className="rounded-lg bg-black text-white p-2 px-4 w-fit">
                Загрузить фото
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
