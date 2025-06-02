"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { actionClient } from "@/lib/safe-actions";

import { UpsertPatientSchema } from "./upsert-patient.action.schema";

export const upsertPatient = actionClient
  .schema(UpsertPatientSchema)
  .action(async ({ parsedInput: data }) => {
    const { user } = await getUserAuthenticated();

    if (!user) {
      throw new Error("Não autorizado");
    }

    if (!user.clinic?.id) {
      throw new Error("Clínica não encontrada");
    }

    await db
      .insert(patientsTable)
      .values({
        ...data,
        id: data.id,
        clinicId: user.clinic.id,
      })
      .onConflictDoUpdate({
        target: [patientsTable.id],
        set: {
          ...data,
          id: data.id,
          clinicId: user.clinic.id,
        },
      });

    revalidatePath("/patients");
  });
