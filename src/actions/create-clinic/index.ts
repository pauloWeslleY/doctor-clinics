"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema";
import { Routes } from "@/lib/routes";
import { protectedActionClient } from "@/lib/safe-actions";

const CreateClinicSchema = z.object({ name: z.string() });

export const createClinic = protectedActionClient
  .schema(CreateClinicSchema)
  .action(async ({ parsedInput: data, ctx }) => {
    const [clinic] = await db
      .insert(clinicsTable)
      .values({ name: data.name })
      .returning();

    await db.insert(usersToClinicsTable).values({
      userId: ctx.user.id,
      clinicId: clinic.id,
    });

    revalidatePath(Routes.Dashboard);
  });
