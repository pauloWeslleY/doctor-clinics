import dayjs from "dayjs";
import { and, count, eq, gte, lte, sql, sum } from "drizzle-orm";

import { db } from "@/db";
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";

interface GetDataDashboardProps {
  clinicId: string;
  from: string;
  to: string;
}

export const getDataDashboard = async ({
  clinicId,
  from,
  to,
}: GetDataDashboardProps) => {
  const chartStartDate = dayjs().subtract(10, "days").startOf("day").toDate();
  const chartEndDate = dayjs().add(10, "days").endOf("day").toDate();

  if (!to && !from) {
    return {
      totalRevenue: { total: 0 },
      totalAppointments: { total: 0 },
      totalPatients: { total: 0 },
      totalDoctors: { total: 0 },
    };
  }

  const [
    totalRevenue,
    totalAppointments,
    totalPatients,
    totalDoctors,
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

  console.log({
    chartStartDate,
    chartEndDate,
    appointmentsData,
  });

  return {
    appointmentsData,
    totalRevenue: totalRevenue[0],
    totalAppointments: totalAppointments[0],
    totalPatients: totalPatients[0],
    totalDoctors: totalDoctors[0],
  };
};
