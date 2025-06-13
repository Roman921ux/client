export default function useFormatters() {
  const formatPhoneNumber = (phone: string) => {
    return phone.replace(
      /^(8|7)(\d{3})(\d{3})(\d{2})(\d{2})$/,
      "+7 ($2) $3-$4-$5",
    );
  };
  const formatDate = (dateNeedFormat: Date) => {
    // if (typeof dateNeedFormat !== Date) return "не верный фрмат времени";
    const date = new Date(dateNeedFormat);

    const formatter = new Intl.DateTimeFormat("ru-RU", {
      timeZone: "Europe/Moscow", // Указываем московскую таймзону
      day: "numeric", // День (27)
      month: "long", // Месяц (апреля)
      year: "numeric", // Год (2025)
      hour: "2-digit", // Часы (07)
      minute: "2-digit", // Минуты (30)
    });
    const formattedDate = formatter.format(date);
    const finalString = `${formattedDate} по МСК`;
    return finalString;
  };

  return { formatPhoneNumber, formatDate };
}
