import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

import { type PatientProps } from "../../types/patient.type";
import { PatientColumnsTable } from "./columns-table-patient";
import { DataTablePatient } from "./data-table-patient";

const getPatients = async (): Promise<PatientProps[]> => {
  const { user } = await getUserAuthenticated();

  if (!user) {
    redirect(Routes.Authentication);
  }

  if (!user.clinic) {
    redirect(Routes.Authentication);
  }

  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, user.clinic.id),
  });

  return patients;
};

const TablePatient = async () => {
  const patients = await getPatients();

  return <DataTablePatient data={patients} columns={PatientColumnsTable} />;
};

export default TablePatient;
