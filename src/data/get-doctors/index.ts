import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

export const getDoctors = async () => {
  const { user } = await getUserAuthenticated();

  if (!user) {
    redirect(Routes.Authentication);
  }

  if (!user.clinic) {
    redirect(Routes.ClinicForm);
  }

  if (!user.plan) {
    redirect(Routes.Plans);
  }

  return await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, user.clinic.id),
  });
};
