"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";
import { actionClient } from "@/lib/safe-actions";

const CreateClinicSchema = z.object({ name: z.string() });

export const createClinic = actionClient
  .schema(CreateClinicSchema)
  .action(async ({ parsedInput: data }) => {
    const { user } = await getUserAuthenticated();

    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    const [clinic] = await db
      .insert(clinicsTable)
      .values({ name: data.name })
      .returning();

    await db
      .insert(usersToClinicsTable)
      .values({ userId: user.id, clinicId: clinic.id });

    revalidatePath(Routes.Dashboard);
  });
