import { ArrowRight, Package, Rocket, Shield } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function FeaturePromo() {
  return (
    <section className="relative overflow-hidden bg-slate-50 px-20 py-20 rounded-xl">
      {/* Декоративный фоновый элемент */}
      <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/4">
        <div className="h-96 w-96 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
      </div>

      {/* Основной контент */}
      <div className=" mx-auto relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Левая колонка с текстом */}
          <div className="relative z-10 flex flex-col justify-center space-y-8">
            <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
              <Rocket className="mr-2 h-4 w-4" />
              Новый уровень логистики
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Оформите заявку за 2 минуты
              <span className="text-blue-600">и получите расчёт стоимости</span>
            </h2>

            <p className="text-lg text-slate-600">
              Больше никаких долгих согласований и ожиданий. Наша умная система
              мгновенно рассчитает оптимальный маршрут и стоимость доставки.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-white p-2 shadow-sm">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Гарантия лучшей цены
                  </h3>
                  <p className="text-slate-600">
                    Автоматически подбираем самые выгодные тарифы из тысячи
                    вариантов
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-white p-2 shadow-sm">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Отслеживание онлайн
                  </h3>
                  <p className="text-slate-600">
                    Следите за перемещением груза в реальном времени через
                    личный кабинет
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="group">
                Оформить заявку
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Узнать подробнее
              </Button>
            </div>
          </div>

          {/* Правая колонка с изображением */}
          <div className="relative lg:ml-12">
            {/* Декоративная рамка */}
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-lg" />

            {/* Основное изображение */}
            <div className="relative aspect-square rounded-xl bg-white shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1536678089453-b1e655b5fb5a?q=80&w=2116&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Интерфейс системы управления доставками"
                className="h-full w-full object-cover rounded-xl"
              />

              {/* Плавающая карточка статистики */}
              <div className="absolute -right-6 -top-6 rounded-lg bg-white px-6 py-4 shadow-lg ">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-600">
                    Среднее время оформления
                  </p>
                  <p className="text-2xl font-bold text-slate-900">1.8 мин</p>
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-4/5 rounded-full bg-blue-600" />
                  </div>
                </div>
              </div>

              {/* Плавающая карточка с отзывом */}
              <div className="absolute -bottom-6 -left-6 max-w-md rounded-lg bg-white p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-slate-200" />
                  <div>
                    <p className="font-medium text-slate-900">Анна К.</p>
                    <p className="text-sm text-slate-600">
                      Логист, ООО "Фрутлайн"
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  "Невероятно удобно! Теперь оформление занимает считанные
                  минуты"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
