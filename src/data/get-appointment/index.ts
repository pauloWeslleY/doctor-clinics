import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

export const getAppointments = async () => {
  const { user } = await getUserAuthenticated();

  if (!user) {
    redirect(Routes.Authentication);
  }

  if (!user.clinic) {
    redirect(Routes.Authentication);
  }

  const [patients, doctors, appointments] = await Promise.all([
    db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, user.clinic.id),
    }),
    db.query.doctorsTable.findMany({
      where: eq(doctorsTable.clinicId, user.clinic.id),
    }),
    db.query.appointmentsTable.findMany({
      where: eq(appointmentsTable.clinicId, user.clinic.id),
      with: {
        patient: true,
        doctor: true,
      },
    }),
  ]);

  return {
    patients,
    doctors,
    appointments,
  };
};
