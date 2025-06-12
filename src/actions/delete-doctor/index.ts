"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { protectedWithClinicActionClient } from "@/lib/safe-actions";

export const deleteDoctor = protectedWithClinicActionClient
  .schema(
    z.object({
      id: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput: data, ctx: { user } }) => {
    const doctor = await db.query.doctorsTable.findFirst({
      where: eq(doctorsTable.id, data.id),
    });

    if (!doctor) {
      throw new Error("Médico não encontrado");
    }

    if (doctor.clinicId !== user.clinic.id) {
      throw new Error("Médico não encontrado");
    }

    await db.delete(doctorsTable).where(eq(doctorsTable.id, data.id));
    revalidatePath("/doctors");
  });
