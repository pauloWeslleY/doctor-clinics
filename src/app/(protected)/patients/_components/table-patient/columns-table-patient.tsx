"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { handleFindSexPatientSelected } from "../../constants/sex-options";
import { type PatientProps } from "./data-table-patient.type";
import DataTablePatientActions from "./data-table-patient-actions";

export const columnsTablePatient: ColumnDef<PatientProps>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const checkedAllRow = table.getIsAllPageRowsSelected();
      const checkedSomeRow = table.getIsSomePageRowsSelected();
      return (
        <Checkbox
          checked={checkedAllRow || (checkedSomeRow && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          E-mail
          <ArrowUpDownIcon className="!size-3" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Número de Celular",
    cell: ({ row }) => {
      const phoneNumber = row.getValue("phoneNumber") as string;

      if (!phoneNumber) return "";
      const formatted = phoneNumber.replace(
        /(\d{2})(\d{5})(\d{4})/,
        "($1) $2-$3",
      );

      return <div className="capitalize">{formatted}</div>;
    },
  },
  {
    id: "sex",
    accessorKey: "sex",
    header: "Sexo",
    cell: ({ row }) => {
      const sexPatient = handleFindSexPatientSelected(row.getValue("sex"));
      return <div className="capitalize">{sexPatient}</div>;
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const patient = row.original;
      return <DataTablePatientActions patient={patient} />;
    },
  },
];
