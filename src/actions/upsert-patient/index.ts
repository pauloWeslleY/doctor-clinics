"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-actions";

import { UpsertPatientSchema } from "./upsert-patient.action.schema";

export const upsertPatient = actionClient
  .schema(UpsertPatientSchema)
  .action(async ({ parsedInput: data }) => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      throw new Error("Não autorizado");
    }

    if (!session?.user?.clinic?.id) {
      throw new Error("Clínica não encontrada");
    }

    await db
      .insert(patientsTable)
      .values({
        ...data,
        id: data.id,
        clinicId: session.user.clinic.id,
      })
      .onConflictDoUpdate({
        target: [patientsTable.id],
        set: {
          ...data,
          id: data.id,
          clinicId: session.user.clinic.id,
        },
      });
    revalidatePath("/patients");
  });
