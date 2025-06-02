import { type DataTableProps } from "@/@types/data-table.type";
import useDataTable from "@/hooks/use-data-table";

const useDataTablePatient = <TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) => {
  const { table, optionsSelectColumnHide } = useDataTable<TData, TValue>({
    data,
    columns,
  });

  return {
    tablePatient: table,
    optionsSelectColumnHide,
  };
};

export default useDataTablePatient;
