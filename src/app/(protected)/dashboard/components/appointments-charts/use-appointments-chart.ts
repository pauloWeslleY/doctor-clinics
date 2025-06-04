import dayjs from "dayjs";
import { useMemo } from "react";

import { type ChartConfig } from "@/components/ui/chart";

import { type AppointmentsChartsProps } from "./appointments-chart.type";

const useAppointmentsChart = ({
  dailyAppointmentsData,
}: AppointmentsChartsProps) => {
  const chartData = useMemo(() => {
    const chartDays = Array.from({ length: 21 }).map((_, index) => {
      return dayjs()
        .subtract(10 - index, "days")
        .format("YYYY-MM-DD");
    });

    const chartData = chartDays.map((date) => {
      const dataForDay = dailyAppointmentsData.find(
        (item) => item.date === date,
      );

      return {
        date: dayjs(date).format("DD/MM"),
        fullDate: date,
        appointments: dataForDay?.appointments || 0,
        revenue: dataForDay?.revenue || 0,
      };
    });

    return chartData;
  }, [dailyAppointmentsData]);

  const chartConfig = {
    appointments: {
      label: "Agendamentos",
      color: "#0B68F7",
    },
    revenue: {
      label: "Faturamento",
      color: "#10B981",
    },
  } satisfies ChartConfig;

  return {
    chartData,
    chartConfig,
  };
};

export default useAppointmentsChart;
