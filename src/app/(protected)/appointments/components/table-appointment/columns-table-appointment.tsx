"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { type ColumnsAppointmentTable } from "./data-table-appointment.type";
import DataTableAppointmentActions from "./data-table-appointment-actions";

export const AppointmentColumnsTable: ColumnsAppointmentTable = [
  {
    id: "patient",
    accessorKey: "patient.name",
    header: () => {
      return <div className="font-bold">Paciente</div>;
    },
    cell: ({ row }) => {
      const appointment = row.original;
      return <div className="capitalize">{appointment.patient.name}</div>;
    },
  },
  {
    id: "date",
    accessorKey: "date",
    header: () => {
      return <div className="font-bold">Data</div>;
    },
    cell: ({ row }) => {
      const appointment = row.original;
      return format(appointment.date, "dd/MM/yyyy 'às' HH:mm", {
        locale: ptBR,
      });
    },
  },
  {
    id: "doctor",
    accessorKey: "doctor.name",
    header: () => {
      return <div className="font-bold">Médico</div>;
    },
    cell: ({ row }) => {
      const appointment = row.original;
      return `${appointment.doctor.name}`;
    },
  },
  {
    id: "specialty",
    accessorKey: "doctor.specialty",
    header: () => {
      return <div className="font-bold">Especialidade</div>;
    },
  },
  {
    id: "price",
    accessorKey: "appointmentPriceInCents",
    header: () => {
      return <div className="font-bold">Valor</div>;
    },
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
    header: () => {
      return <div className="font-bold">Ações</div>;
    },
    cell: ({ row }) => {
      const appointment = row.original;
      return <DataTableAppointmentActions appointment={appointment} />;
    },
  },
];
