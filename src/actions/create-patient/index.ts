import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-actions";

import { createPatientSchema } from "./create-patient.action.schema";

export const createPatient = actionClient
  .schema(createPatientSchema)
  .action(async ({ parsedInput: data }) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.clinic?.id) {
      throw new Error("Não autorizado");
    }
    await db.insert(patientsTable).values({
      clinicId: session.user.clinic.id,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      sex: data.sex,
    });
    revalidatePath("/patients");
  });
