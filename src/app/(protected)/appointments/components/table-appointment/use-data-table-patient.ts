import { type DataTableProps } from "@/@types/data-table.type";
import useDataTable from "@/hooks/use-data-table";

const useDataTableAppointment = <TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) => {
  const { table, optionsSelectColumnHide } = useDataTable<TData, TValue>({
    data,
    columns,
  });

  return {
    tableAppointment: table,
    optionsSelectColumnHide,
  };
};

export default useDataTableAppointment;
