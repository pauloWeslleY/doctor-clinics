import dayjs from "dayjs";
import { and, count, desc, eq, gte, lte, sql, sum } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

interface GetDataDashboardProps {
  from: string;
  to: string;
}

export const getDataDashboard = async ({ from, to }: GetDataDashboardProps) => {
  const { user } = await getUserAuthenticated();
  const chartStartDate = dayjs().subtract(10, "days").startOf("day").toDate();
  const chartEndDate = dayjs().add(10, "days").endOf("day").toDate();

  if (!user) {
    redirect(Routes.Authentication);
  }

  if (!user.plan) {
    redirect(Routes.Plans);
  }

  if (!user.clinic) {
    redirect(Routes.ClinicForm);
  }

  if (!from || !to) {
    const searchParamsFrom = dayjs().format("YYYY-MM-DD");
    const searchParamsTo = dayjs().add(1, "month").format("YYYY-MM-DD");
    redirect(`/dashboard?from=${searchParamsFrom}&to=${searchParamsTo}`);
  }

  const clinicId = user.clinic.id;

  const [
    totalRevenue,
    totalAppointments,
    totalPatients,
    totalDoctors,
    topDoctors,
    topSpecialty,
    todayAppointments,
    appointmentsData,
  ] = await Promise.all([
    db
      .select({ total: sum(appointmentsTable.appointmentPriceInCents) })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.clinicId, clinicId),
          gte(appointmentsTable.date, new Date(from)),
          gte(appointmentsTable.date, new Date(to)),
        ),
      ),
    db
      .select({ total: count() })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.clinicId, clinicId),
          gte(appointmentsTable.date, new Date(from)),
          gte(appointmentsTable.date, new Date(to)),
        ),
      ),
    db
      .select({ total: count() })
      .from(patientsTable)
      .where(eq(patientsTable.clinicId, clinicId)),
    db
      .select({ total: count() })
      .from(doctorsTable)
      .where(eq(doctorsTable.clinicId, clinicId)),
    db
      .select({
        id: doctorsTable.id,
        name: doctorsTable.name,
        avatarUrl: doctorsTable.avatarImageUrl,
        specialty: doctorsTable.specialty,
        appointments: count(appointmentsTable.id),
      })
      .from(doctorsTable)
      .leftJoin(
        appointmentsTable,
        and(
          eq(doctorsTable.id, appointmentsTable.doctorId),
          gte(appointmentsTable.date, new Date(from)),
          lte(appointmentsTable.date, new Date(to)),
        ),
      )
      .where(eq(doctorsTable.clinicId, clinicId))
      .groupBy(doctorsTable.id)
      .orderBy(desc(count(appointmentsTable.id)))
      .limit(10),
    db
      .select({
        specialty: doctorsTable.specialty,
        appointments: count(appointmentsTable.id),
      })
      .from(appointmentsTable)
      .innerJoin(doctorsTable, eq(doctorsTable.id, appointmentsTable.doctorId))
      .where(
        and(
          eq(appointmentsTable.clinicId, clinicId),
          gte(appointmentsTable.date, new Date(from)),
          lte(appointmentsTable.date, new Date(to)),
        ),
      )
      .groupBy(doctorsTable.specialty)
      .orderBy(desc(count(appointmentsTable.id))),
    db.query.appointmentsTable.findMany({
      where: and(
        eq(appointmentsTable.clinicId, clinicId),
        gte(appointmentsTable.date, new Date(from)),
        lte(appointmentsTable.date, new Date(to)),
      ),
      with: {
        patient: true,
        doctor: true,
      },
    }),
    db
      .select({
        date: sql<string>`DATE(${appointmentsTable.date})`.as("date"),
        appointments: count(appointmentsTable.id),
        revenue:
          sql<number>`COALESCE(SUM(${appointmentsTable.appointmentPriceInCents}), 0)`.as(
            "revenue",
          ),
      })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.clinicId, clinicId),
          gte(appointmentsTable.date, chartStartDate),
          lte(appointmentsTable.date, chartEndDate),
        ),
      )
      .groupBy(sql`DATE(${appointmentsTable.date})`)
      .orderBy(sql`DATE(${appointmentsTable.date})`),
  ]);

  return {
    topDoctors,
    topSpecialty,
    todayAppointments,
    appointmentsData,
    totalRevenue: totalRevenue[0],
    totalAppointments: totalAppointments[0],
    totalPatients: totalPatients[0],
    totalDoctors: totalDoctors[0],
  };
};
