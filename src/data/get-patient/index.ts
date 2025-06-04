import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

export const getPatients = async () => {
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
