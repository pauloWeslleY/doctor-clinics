"use server";

import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { protectedWithClinicActionClient } from "@/lib/safe-actions";

import { getAvailableTimes } from "../get-available-times";
import { AddAppointmentSchema } from "./add-appointment.schema";

export const addAppointment = protectedWithClinicActionClient
  .schema(AddAppointmentSchema)
  .action(async ({ parsedInput: data, ctx }) => {
    const availableTimes = await getAvailableTimes({
      doctorId: data.doctorId,
      date: dayjs(data.date).format("YYYY-MM-DD"),
    });

    if (!availableTimes?.data) {
      throw new Error("No available times");
    }

    const isTimeAvailable = availableTimes.data?.some(
      (time) => time.value === data.time && time.available,
    );

    if (!isTimeAvailable) {
      throw new Error("Time not available");
    }

    const appointmentDateTime = dayjs(data.date)
      .set("hour", parseInt(data.time.split(":")[0]))
      .set("minute", parseInt(data.time.split(":")[1]))
      .toDate();

    await db.insert(appointmentsTable).values({
      ...data,
      clinicId: ctx.user.clinic.id,
      date: appointmentDateTime,
    });

    revalidatePath("/appointments");
    revalidatePath("/dashboard");
  });
