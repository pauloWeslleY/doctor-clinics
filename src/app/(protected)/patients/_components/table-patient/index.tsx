import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { DataTablePatient } from "./data-table-patient";
import { type PatientProps } from "./data-table-patient.type";

const getPatients = async (): Promise<PatientProps[]> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const clinicId = session?.user.clinic?.id ?? "";

  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, clinicId),
  });

  return patients;
};

const TablePatient = async () => {
  const data = await getPatients();

  return <DataTablePatient data={data} />;
};

export default TablePatient;
