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

import PatientAlertDelete from "../alert-dialog-delete-patient";
import UpdateDialogPatient from "../dialog-update-patient";
import { type PatientProps } from "./data-table-patient.type";

interface DataTablePatientProps {
  patient: PatientProps;
}

const DataTablePatientActions = ({ patient }: DataTablePatientProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <UpdateDialogPatient patient={patient} />

        <PatientAlertDelete patient={patient} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTablePatientActions;
