import { useAuth } from "@/app/providers/auth-provider";
import { useState } from "react";

export function RegisterPage() {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          auth?.logUp(formData);
        }}
        className="w-full max-w-xl flex flex-col justify-center items-center gap-5"
      >
        <div className="flex w-full items-center justify-center">
          <img src="logo.png" className="h-40 w-30" />
        </div>
        <span className="font-bold text-4xl">Регистрация</span>
        <input
          className="px-6 py-8 rounded-full w-full border"
          placeholder="Почта ..."
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          className="px-6 py-8 rounded-full w-full border"
          placeholder="Парол ..."
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <input
          className="px-6 py-8 rounded-full w-full border"
          placeholder="Ник ..."
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <button className="bg-red-500 rounded-full w-lg text-white py-6 px-20 font-medium">
          Создать
        </button>
      </form>
    </div>
  );
}
