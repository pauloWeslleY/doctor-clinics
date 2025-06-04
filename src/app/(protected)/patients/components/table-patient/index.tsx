import { getPatients } from "@/data/get-patient";

import { PatientColumnsTable } from "./columns-table-patient";
import { DataTablePatient } from "./data-table-patient";

const TablePatient = async () => {
  const patients = await getPatients();

  return <DataTablePatient data={patients} columns={PatientColumnsTable} />;
};

export default TablePatient;
