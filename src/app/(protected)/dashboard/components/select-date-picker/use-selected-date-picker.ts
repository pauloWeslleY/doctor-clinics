import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo, useState } from "react";
import { type DateRange } from "react-day-picker";

const formatDate = (date: Date) => format(date, "LLL dd, y", { locale: ptBR });

const useSelectedDatePicker = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const validateDateCurrent = useMemo(() => {
    if (date?.from) {
      if (date.to) {
        const dateFrom = formatDate(date.from);
        const dateTo = formatDate(date.to);
        return `${dateFrom} - ${dateTo}`;
      }

      return formatDate(date.from);
    }

    return "Selecione uma data";
  }, [date?.from, date?.to]);

  return {
    date,
    setDate,
    validateDateCurrent,
  };
};

export default useSelectedDatePicker;
