"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { type PatientsProps } from "./data-table-patient.type";
import DataTablePatientActions from "./data-table-patient-actions";

export const columnsTablePatient: ColumnDef<PatientsProps>[] = [
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
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          E-mail
          <ArrowUpDownIcon className="h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone_number",
    header: "Número de Celular",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phone_number")}</div>
    ),
  },
  {
    accessorKey: "sex",
    header: "Sexo",
    cell: ({ row }) => <div className="capitalize">{row.getValue("sex")}</div>,
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <DataTablePatientActions
          patient={{
            ...patient,
            phoneNumber: patient.phone_number,
            sex: patient.sex as "male" | "female",
          }}
        />
      );
    },
  },
];
