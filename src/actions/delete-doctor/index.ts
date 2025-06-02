"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { actionClient } from "@/lib/safe-actions";

export const deleteDoctor = actionClient
  .schema(
    z.object({
      id: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput: data }) => {
    const { user } = await getUserAuthenticated();

    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    if (!user.clinic) {
      throw new Error("Clínica não encontrada");
    }

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
