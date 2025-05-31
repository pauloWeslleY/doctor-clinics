"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-actions";

import { UpsertDoctorActionSchema } from "./upsert-doctor.action.schema";

export const upsertDoctor = actionClient
  .schema(UpsertDoctorActionSchema)
  .action(async ({ parsedInput: data }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session?.user.clinic?.id) {
      throw new Error("Clinic not found!");
    }

    await db
      .insert(doctorsTable)
      .values({
        id: data.id,
        ...data,
        clinicId: session?.user.clinic?.id,
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: { ...data },
      });
  });
