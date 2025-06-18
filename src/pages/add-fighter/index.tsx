import instance from "@/shared/model/api/axios-instance";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function AddFighterPage() {
  const [imageUrl, setImageUrl] = useState(null);
  return (
    <div className="border h-full flex items-center justify-center">
      <div className="flex flex-col gap-[47px]">
        <ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <FormDataF imageUrl={imageUrl} />
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

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/shared/model/api/query-client";
import { useNavigate } from "react-router";

function FormDataF({ imageUrl }: { imageUrl: string | null }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    photo: imageUrl,
    name: "",
    fightClub: "",
    country: "",
    weightCategory: "",
    dignity: "",
  });

  // Список стран для выпадающего списка
  const countries = [
    { value: "", label: "Выберите страну" },
    { value: "Россия", label: "Россия" },
    { value: "США", label: "США" },
    { value: "Бразилия", label: "Бразилия" },
    { value: "Германия", label: "Германия" },
    { value: "Япония", label: "Япония" },
  ];

  // Список весовых категорий
  const weightCategories = [
    { value: "", label: "Выберите весовую категорию" },
    { value: "Легчайший вес", label: "Легчайший вес (до 57 кг)" },
    { value: "Легкий вес", label: "Легкий вес (до 70 кг)" },
    { value: "Полусредний вес", label: "Полусредний вес (до 77 кг)" },
    { value: "Средний вес", label: "Средний вес (до 84 кг)" },
    { value: "Полутяжелый вес", label: "Полутяжелый вес (до 93 кг)" },
    { value: "Тяжелый вес", label: "Тяжелый вес (свыше 93 кг)" },
  ];

  // Список достижений/уровней бойца
  const dignityLevels = [
    { value: "", label: "Выберите уровень" },
    { value: "Новичок", label: "Новичок" },
    { value: "Любитель", label: "Любитель" },
    { value: "Профессионал", label: "Профессионал" },
    { value: "Чемпион региона", label: "Чемпион региона" },
    { value: "Чемпион страны", label: "Чемпион страны" },
    { value: "Международный чемпион", label: "Международный чемпион" },
  ];

  useEffect(() => {
    setFormData((prev) => ({ ...prev, photo: imageUrl }));
  }, [imageUrl]);

  const createMutation = useMutation({
    mutationFn: async (data) => {
      console.log("createMutation", data);
      const response = await instance.post("/fighters", data);
      return response.data;
    },
    onSuccess: () => {
      console.log("успешно");
      queryClient.invalidateQueries({ queryKey: ["fighter"] });
      navigate("/fighter");
    },
  });

  return (
    <div className="flex flex-col gap-[59px]">
      <div className="flex gap-[36px]">
        <span className="max-w-[130px]">Редактировать информацию</span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createMutation.mutate(formData);
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

          {/* Выбор страны */}
          <select
            value={formData.country}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, country: e.target.value }))
            }
            name="country"
            className="rounded-[0px] border border-black w-full font-bold text-[30px]"
          >
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>

          {/* Выбор весовой категории */}
          <select
            value={formData.weightCategory}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                weightCategory: e.target.value,
              }))
            }
            name="weightCategory"
            className="rounded-[0px] border border-black w-full font-bold text-[30px]"
          >
            {weightCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          {/* Выбор уровня/достижений */}
          <select
            value={formData.dignity}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, dignity: e.target.value }))
            }
            name="dignity"
            className="rounded-[0px] border border-black w-full font-bold text-[30px]"
          >
            {dignityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>

          <button>Создать бойца</button>
        </form>
      </div>
      <div className="flex gap-[89px]">
        <button>Сохранить</button>
        <button className="text-[14px] font-normal text-white bg-red-500 rounded-full px-[46px] py-2">
          Удалить
        </button>
      </div>
    </div>
  );
}
