"use server";

import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { actionClient } from "@/lib/safe-actions";

import { getAvailableTimes } from "../get-available-times";
import { AddAppointmentSchema } from "./add-appointment.schema";

export const addAppointment = actionClient
  .schema(AddAppointmentSchema)
  .action(async ({ parsedInput }) => {
    const { user } = await getUserAuthenticated();

    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    if (!user.clinic) {
      throw new Error("Clínica não encontrada");
    }

    const availableTimes = await getAvailableTimes({
      doctorId: parsedInput.doctorId,
      date: dayjs(parsedInput.date).format("YYYY-MM-DD"),
    });

    if (!availableTimes?.data) {
      throw new Error("No available times");
    }

    const isTimeAvailable = availableTimes.data?.some(
      (time) => time.value === parsedInput.time && time.available,
    );

    if (!isTimeAvailable) {
      throw new Error("Time not available");
    }

    const appointmentDateTime = dayjs(parsedInput.date)
      .set("hour", parseInt(parsedInput.time.split(":")[0]))
      .set("minute", parseInt(parsedInput.time.split(":")[1]))
      .toDate();

    await db.insert(appointmentsTable).values({
      ...parsedInput,
      clinicId: user.clinic.id,
      date: appointmentDateTime,
    });

    revalidatePath("/appointments");
    revalidatePath("/dashboard");
  });
