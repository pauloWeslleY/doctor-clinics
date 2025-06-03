import {
  CalendarIcon,
  DollarSignIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";

import { formatCurrencyInCents } from "@/helpers/format-currency-in-cents";

import { type StatsCardProps } from "./stats-card.type";

const getStatCard = ({
  totalAppointments,
  totalDoctors,
  totalRevenue,
  totalPatients,
}: StatsCardProps) => {
  return [
    {
      title: "Faturamento",
      value: totalRevenue ? formatCurrencyInCents(totalRevenue) : "R$ 0,00",
      icon: DollarSignIcon,
    },
    {
      title: "Agendamentos",
      value: totalAppointments.toString(),
      icon: CalendarIcon,
    },
    {
      title: "Pacientes",
      value: totalPatients.toString(),
      icon: UserIcon,
    },
    {
      title: "Médicos",
      value: totalDoctors.toString(),
      icon: UsersIcon,
    },
  ];
};

export default getStatCard;
