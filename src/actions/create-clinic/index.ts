"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { Routes } from "@/lib/routes";

export const createClinic = async ({ name }: { name: string }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [clinic] = await db.insert(clinicsTable).values({ name }).returning();

  await db
    .insert(usersToClinicsTable)
    .values({ userId: session?.user.id, clinicId: clinic.id });

  redirect(Routes.Dashboard);
};
