"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { protectedWithClinicActionClient } from "@/lib/safe-actions";

import { UpsertPatientSchema } from "./upsert-patient.action.schema";

export const upsertPatient = protectedWithClinicActionClient
  .schema(UpsertPatientSchema)
  .action(async ({ parsedInput: data, ctx: { user } }) => {
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
