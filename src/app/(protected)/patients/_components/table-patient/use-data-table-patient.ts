import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { type ChangeEvent, useState } from "react";

import { columnsTablePatient } from "./columns-table-patient";
import { type DataTablePatientProps } from "./data-table-patient.type";

const useDataTablePatient = ({ data }: DataTablePatientProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const tablePatient = useReactTable({
    data,
    columns: columnsTablePatient,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const inputSearchTable =
    (tablePatient.getColumn("email")?.getFilterValue() as string) ?? "";

  const optionsSelectColumnHide = () => {
    return tablePatient.getAllColumns().filter((column) => column.getCanHide());
  };

  const onChangeInputSearchTable = (event: ChangeEvent<HTMLInputElement>) => {
    tablePatient.getColumn("email")?.setFilterValue(event.target.value);
  };

  return {
    tablePatient,
    inputSearchTable,
    onChangeInputSearchTable,
    optionsSelectColumnHide: optionsSelectColumnHide(),
  };
};

export default useDataTablePatient;
