import { addMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { parseAsIsoDate, useQueryState } from "nuqs";
import { useMemo } from "react";
import { type DateRange } from "react-day-picker";

const useSelectedDatePicker = () => {
  const [from, setFrom] = useQueryState(
    "from",
    parseAsIsoDate.withDefault(new Date()),
  );

  const [to, setTo] = useQueryState(
    "to",
    parseAsIsoDate.withDefault(addMonths(new Date(), 1)),
  );

  const date = { from, to };

  const formatDate = (date: Date) => {
    return format(date, "LLL dd, y", { locale: ptBR });
  };

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

  const handleDateSelect = (date?: DateRange) => {
    if (date?.from) {
      setFrom(date.from, { shallow: false });
    }

    if (date?.to) {
      setTo(date.to, { shallow: false });
    }
  };

  return {
    date,
    handleDateSelect,
    validateDateCurrent,
  };
};

export default useSelectedDatePicker;
