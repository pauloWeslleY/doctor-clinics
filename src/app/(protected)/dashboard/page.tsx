import dayjs from "dayjs";
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
import { getDataDashboard } from "@/data/get-data-dashboard";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

import RevenueChart from "./components/appointments-charts";
import SelectedDatePicker from "./components/select-date-picker";
import StatsCard from "./components/stats-card";

interface DashboardPageProps {
  searchParams: Promise<{
    from: string;
    to: string;
  }>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const { user } = await getUserAuthenticated();
  const { from, to } = await searchParams;

  if (!user) {
    redirect(Routes.Authentication);
  }

  if (!user.clinic) {
    redirect(Routes.ClinicForm);
  }

  if (!from || !to) {
    const searchParamsFrom = dayjs().format("YYYY-MM-DD");
    const searchParamsTo = dayjs().add(1, "month").format("YYYY-MM-DD");
    redirect(`/dashboard?from=${searchParamsFrom}&to=${searchParamsTo}`);
  }

  const {
    totalAppointments,
    totalDoctors,
    totalPatients,
    totalRevenue,
    appointmentsData,
  } = await getDataDashboard({ clinicId: user.clinic.id, from, to });

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
      <LayoutContent>
        <StatsCard
          totalAppointments={totalAppointments.total}
          totalDoctors={totalDoctors.total}
          totalPatients={totalPatients.total}
          totalRevenue={Number(totalRevenue.total) || 0}
        />

        <div className="grid grid-cols-[2.25fr_1fr]">
          <RevenueChart dailyAppointmentsData={appointmentsData || []} />
        </div>
      </LayoutContent>
    </LayoutRoot>
  );
};

export default DashboardPage;
