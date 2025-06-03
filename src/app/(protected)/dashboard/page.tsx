import dayjs from "dayjs";
import { redirect } from "next/navigation";

import { getDataDashboard } from "@/actions/get-data-dashboard";
import {
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutHeaderContent,
  LayoutHeaderDescription,
  LayoutHeaderTitle,
  LayoutRoot,
} from "@/components/root-layout";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

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

  if (!user) {
    redirect(Routes.Authentication);
  }

  if (!user.clinic) {
    redirect(Routes.ClinicForm);
  }

  const { from, to } = await searchParams;

  if (!from || !to) {
    const searchParamsFrom = dayjs().format("YYYY-MM-DD");
    const searchParamsTo = dayjs().add(1, "month").format("YYYY-MM-DD");
    redirect(`/dashboard?from=${searchParamsFrom}&to=${searchParamsTo}`);
  }

  const data = await getDataDashboard({
    clinicId: user.clinic.id,
    from,
    to,
  });

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
          totalAppointments={data.totalAppointments.total}
          totalDoctors={data.totalDoctors.total}
          totalPatients={data.totalPatients.total}
          totalRevenue={Number(data.totalRevenue.total) || 0}
        />
      </LayoutContent>
    </LayoutRoot>
  );
};

export default DashboardPage;
