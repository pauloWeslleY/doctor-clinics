"use server";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { actionClient } from "@/lib/safe-actions";

import { UpsertDoctorActionSchema } from "./upsert-doctor.action.schema";

dayjs.extend(utc);

export const upsertDoctor = actionClient
  .schema(UpsertDoctorActionSchema)
  .action(async ({ parsedInput: data }) => {
    const availableFromTime = data.availableFromTime;
    const availableToTime = data.availableToTime;

    const availableFromTimeUTC = dayjs()
      .set("hour", parseInt(availableFromTime.split(":")[0]))
      .set("minute", parseInt(availableFromTime.split(":")[1]))
      .set("second", parseInt(availableFromTime.split(":")[2]))
      .utc();

    const availableToTimeUTC = dayjs()
      .set("hour", parseInt(availableToTime.split(":")[0]))
      .set("minute", parseInt(availableToTime.split(":")[1]))
      .set("second", parseInt(availableToTime.split(":")[2]))
      .utc();

    const { user } = await getUserAuthenticated();

    if (!user) {
      throw new Error("Usuário não autenticado!");
    }

    if (!user.clinic) {
      throw new Error("Clínica não encontrada!");
    }

    await db
      .insert(doctorsTable)
      .values({
        ...data,
        id: data.id,
        clinicId: user.clinic.id,
        availableFromTime: availableFromTimeUTC.format("HH:mm:ss"),
        availableToTime: availableToTimeUTC.format("HH:mm:ss"),
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...data,
          availableFromTime: availableFromTimeUTC.format("HH:mm:ss"),
          availableToTime: availableToTimeUTC.format("HH:mm:ss"),
        },
      });

    revalidatePath("/doctors");
  });
