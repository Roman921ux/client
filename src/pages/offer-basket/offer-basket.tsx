import { useParams } from "react-router";

export default function OfferBasket() {
  const { price } = useParams();
  return (
    <div className="bg-[#F6F6F6] w-full pb-[100px]">
      <div className="pl-[162px] pr-[78px]">
        <div className="w-full grid grid-cols-3 gap-[163px]">
          <div className="col-span-2 flex flex-col mt-[44px]">
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-[#289EFF]">
                Вернуться в корзину
              </span>
              <span className="text-[45px] font-bold">Оформление заказа</span>
            </div>
            <div className="mt-[18px] rounded-[16px] bg-white px-[36px] pt-[42px] pb-[73px]">
              <span className="text-[25px] font-bold">Способ оплаты</span>
              <div className="mt-[30px] w-full flex gap-[36px]">
                <div className="border p-[18px] rounded-[16px] flex items-center gap-[11px]">
                  <img
                    src="/logo.png"
                    className="text-[15px] font-semibold w-[86px] h-[62px]"
                  />
                  <span className="text-[15px] font-semibold">Карта</span>
                </div>
                <div className="border p-[18px] rounded-[16px] flex items-center gap-[11px]">
                  <img
                    src="/logo.png"
                    className="text-[15px] font-semibold w-[86px] h-[62px]"
                  />
                  <span className="text-[15px] font-semibold">Карта</span>
                </div>
                <div className="border p-[18px] rounded-[16px] flex items-center gap-[11px]">
                  <img
                    src="/logo.png"
                    className="text-[15px] font-semibold w-[86px] h-[62px]"
                  />
                  <span className="text-[15px] font-semibold">Карта</span>
                </div>
                <div className="border p-[18px] rounded-[16px] flex items-center gap-[11px]">
                  <img
                    src="/logo.png"
                    className="text-[15px] font-semibold w-[86px] h-[62px]"
                  />
                  <span className="text-[15px] font-semibold">Карта</span>
                </div>
              </div>
            </div>
            <h4 className="text-[30px] font-bold text-[#999999] mt-[35px] mb-[56px]">
              Доставка
            </h4>
            <div className="flex flex-col bg-white rounded-[16px] py-[36px] pr-[105px] pl-[36px]">
              <span className="font-bold text-[25px] mb-[25px]">
                Способ получения
              </span>
              <div className="w-full flex justify-between">
                <div className="flex flex-col">
                  <span className="font-bold text-[20px] mb-[9px]">
                    Пункт почты России
                  </span>
                  <span className="text-[18px] font-normal">
                    Ростовская область, Ростов-на-Дону, Дачная улица, 2/1B
                  </span>
                </div>
                <span className="text-[18px] font-bold text-[#289EFF]">
                  Изменить
                </span>
              </div>
              <span className="text-[18px] font-normal mt-[25px]">
                Срок хранения заказа — 30 дней
              </span>
              <div className="flex items-center gap-[18px] mt-[25px] w-full bg-[#FEFAE2] px-[18px] py-[21px]">
                <img src="/error.png" className="h-[48px] w-[48px]" />
                <span className="text-[16px] font-normal">
                  Всегда сверяйте правильность введенного Вами адреса доставки
                  товаров
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="mt-[105px] rounded-[16px] bg-white flex flex-col w-full">
              <div className="px-[34px] py-[43px] flex flex-col">
                <button className="text-[20px] font-semibold rounded-md px-4 py-5 w-full bg-[#289EFF] text-white">
                  Перейти к оформлению
                </button>
                <span className="text-[15px] font-normal mt-[18px] text-[#888787]">
                  Нажимая на кнопку, Вы соглашаетесь с{" "}
                  <span className="text-[#289EFF]">
                    Условиями обработки персональных данных
                  </span>
                  , а также с{" "}
                  <span className="text-[#289EFF]">Условиями продажи</span>
                </span>
              </div>
              <div className="w-full bg-[#CCCCCC] h-[1px]" />
              <div className="px-[34px] py-[43px] flex flex-col gap-[10px]">
                <div className="w-full flex justify-between items-end">
                  <span className="text-[20px] font-bold">Ваша заказ</span>
                  <span className="text-[12px] font-normal text-[#888787]">
                    10 товара
                  </span>
                </div>
                <div className="w-full flex justify-between items-end">
                  <span className="text-[18px] font-normal">Товары 10</span>
                  <span className="text-[20px] font-bold">
                    {price && price} ₽
                  </span>
                </div>
                <div className="w-full flex justify-between items-end">
                  <span className="text-[18px] font-normal">Скидка</span>
                  <span className="text-[20px] font-bold text-red-500">
                    350₽
                  </span>
                </div>
                <div className="w-full flex justify-between items-end">
                  <span className="text-[18px] font-bold text-blue-500">
                    Подробнее
                  </span>
                  <span className="text-[20px] font-bold text-red-500"></span>
                </div>
                <div className="w-full flex justify-between items-end mt-[28px]">
                  <span className="text-[18px] font-normal">Доставка</span>
                  <span className="text-[18px] font-bold text-[#38CA49]">
                    Без доплаты
                  </span>
                </div>
              </div>
              <div className="w-full bg-[#CCCCCC] h-[1px]" />

              <div className="px-[34px] py-[43px] flex flex-col gap-[10px]">
                <div className="w-full flex justify-between items-end">
                  <span className="text-[25px] font-bold">Итого</span>
                  <span className="text-[25px] font-bold">
                    {price && price}₽
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-[36px] bg-white px-[34px] py-[26px] rounded-full flex gap-[24px] w-full items-center">
              <img src="/ps.png" className="h-[42px] w-[42px]" />
              <span className="text-[25px] font-bold">
                Промокод или сертификат
              </span>
            </div>

            <div className="mt-[36px] bg-white px-[34px] py-[26px] rounded-full flex justify-between w-full items-center">
              <span className="text-[25px] font-bold">
                Начислим 258 бонусов
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
