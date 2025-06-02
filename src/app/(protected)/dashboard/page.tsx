import { and, eq, gte, sum } from "drizzle-orm";
import { redirect } from "next/navigation";

import {
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutHeaderContent,
  LayoutHeaderDescription,
  LayoutHeaderTitle,
  LayoutRoot,
} from "@/components/root-layout";
import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

import SelectedDatePicker from "./components/select-date-picker";

interface DashboardPageProps {
  searchParams: Promise<{
    from: string;
    to: string;
  }>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const { user } = await getUserAuthenticated();

  if (!user) {
    redirect(Routes.Authentication);
  }

  if (!user.clinic) {
    redirect(Routes.ClinicForm);
  }

  const { from, to } = await searchParams;

  const [totalRevenue] = await db
    .select({
      total: sum(appointmentsTable.appointmentPriceInCents),
    })
    .from(appointmentsTable)
    .where(
      and(
        eq(appointmentsTable.clinicId, user.clinic.id),
        gte(appointmentsTable.date, new Date(from)),
        gte(appointmentsTable.date, new Date(to)),
      ),
    );

  console.log({ totalRevenue });

  return (
    <LayoutRoot>
      <LayoutHeader>
        <LayoutHeaderContent>
          <LayoutHeaderTitle>Dashboard</LayoutHeaderTitle>
          <LayoutHeaderDescription>
            Tenha uma visão geral e gerencie sua clínica
          </LayoutHeaderDescription>
        </LayoutHeaderContent>
        <LayoutActions>
          <SelectedDatePicker />
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent></LayoutContent>
    </LayoutRoot>
  );
};

export default DashboardPage;
