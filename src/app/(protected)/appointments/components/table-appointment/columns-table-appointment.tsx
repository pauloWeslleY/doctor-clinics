"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { type ColumnsAppointmentTable } from "./data-table-appointment.type";
import DataTableAppointmentActions from "./data-table-appointment-actions";

export const AppointmentColumnsTable: ColumnsAppointmentTable = [
  {
    id: "patient",
    accessorKey: "patient.name",
    header: "Paciente",
    cell: ({ row }) => {
      const appointment = row.original;
      return <div className="capitalize">{appointment.patient.name}</div>;
    },
  },
  {
    id: "doctor",
    accessorKey: "doctor.name",
    header: "Médico",
    cell: ({ row }) => {
      const appointment = row.original;
      return `${appointment.doctor.name}`;
    },
  },
  {
    id: "date",
    accessorKey: "date",
    header: "Data e Hora",
    cell: ({ row }) => {
      const appointment = row.original;
      return format(appointment.date, "dd/MM/yyyy 'às' HH:mm", {
        locale: ptBR,
      });
    },
  },
  {
    id: "specialty",
    accessorKey: "doctor.specialty",
    header: "Especialidade",
  },
  {
    id: "price",
    accessorKey: "appointmentPriceInCents",
    header: "Valor",
    cell: ({ row }) => {
      const appointment = row.original;
      const price = appointment.appointmentPriceInCents / 100;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const appointment = row.original;
      return <DataTableAppointmentActions appointment={appointment} />;
    },
  },
];
