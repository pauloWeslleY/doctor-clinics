import { and, count, eq, gte, sum } from "drizzle-orm";

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
  console.log({ clinicId, from, to });

  if (!to && !from) {
    return {
      totalRevenue: { total: 0 },
      totalAppointments: { total: 0 },
      totalPatients: { total: 0 },
      totalDoctors: { total: 0 },
    };
  }

  const [totalRevenue, totalAppointments, totalPatients, totalDoctors] =
    await Promise.all([
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
    ]);

  return {
    totalRevenue: totalRevenue[0],
    totalAppointments: totalAppointments[0],
    totalPatients: totalPatients[0],
    totalDoctors: totalDoctors[0],
  };
};
