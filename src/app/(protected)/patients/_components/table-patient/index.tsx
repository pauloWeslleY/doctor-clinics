import { db } from "@/db";

import { sexPatientOptions } from "../../constants/sex-options";
import { DataTablePatient } from "./data-table-patient";
import { type PatientsProps } from "./data-table-patient.type";

const getPatients = async (): Promise<PatientsProps[]> => {
  const patient = await db.query.patientsTable.findMany();

  const dataTablePatient = patient.map<PatientsProps>((patient) => ({
    id: patient.id,
    name: patient.name,
    email: patient.email,
    phone_number: patient.phoneNumber,
    sex:
      sexPatientOptions.find((option) => option.value === patient.sex)?.label ||
      "",
    clinicId: patient.clinicId,
    createdAt: patient.createdAt,
    updatedAt: patient.updatedAt,
  }));

  return dataTablePatient;
};

const TablePatient = async () => {
  const data = await getPatients();

  return <DataTablePatient data={data} />;
};

export default TablePatient;
