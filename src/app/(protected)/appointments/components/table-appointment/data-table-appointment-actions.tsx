"use client";

import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AppointmentAlertDelete from "../alert-dialog-delete-appointment";
import { type AppointmentProps } from "./data-table-appointment.type";

interface DataTableAppointmentProps {
  appointment: AppointmentProps;
}

const DataTableAppointmentActions = ({
  appointment,
}: DataTableAppointmentProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <AppointmentAlertDelete appointment={appointment} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableAppointmentActions;
