"use client";

import { flexRender } from "@tanstack/react-table";
import { ChevronDownIcon } from "lucide-react";

import { type DataTableProps } from "@/@types/data-table.type";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useDataTableAppointment from "./use-data-table-patient";

const DataTableAppointment = <TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) => {
  const { tableAppointment, optionsSelectColumnHide } = useDataTableAppointment(
    { data, columns },
  );

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Pesquisar pacientes..."
          value={
            (tableAppointment
              .getColumn("patient")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            tableAppointment
              .getColumn("patient")
              ?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {optionsSelectColumnHide.map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {tableAppointment.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tableAppointment.getRowModel().rows?.length ? (
              tableAppointment.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="text-muted-foreground flex-1 text-sm">
          {tableAppointment.getFilteredSelectedRowModel().rows.length} de{" "}
          {tableAppointment.getFilteredRowModel().rows.length} linha(s)
          selecionada.
        </div> */}

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableAppointment.previousPage()}
            disabled={!tableAppointment.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableAppointment.nextPage()}
            disabled={!tableAppointment.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTableAppointment;
