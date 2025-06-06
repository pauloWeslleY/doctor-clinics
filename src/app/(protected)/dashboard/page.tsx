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

import { AppointmentColumnsTable } from "../appointments/components/table-appointment/columns-table-appointment";
import RevenueChart from "./components/appointments-charts";
import SelectedDatePicker from "./components/select-date-picker";
import StatsCard from "./components/stats-card";
import TodayAppointmentsTable from "./components/today-appointments-table";
import TopDoctors from "./components/top-doctors";
import TopSpecialties from "./components/top-specialty";

interface DashboardPageProps {
  searchParams: Promise<{
    from: string;
    to: string;
  }>;
}

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  const { from, to } = await searchParams;

  const {
    totalAppointments,
    totalDoctors,
    totalPatients,
    totalRevenue,
    topDoctors,
    topSpecialty,
    todayAppointments,
    appointmentsData,
  } = await getDataDashboard({ from, to });

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

        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          <RevenueChart dailyAppointmentsData={appointmentsData} />

          <TopDoctors doctors={topDoctors} />
        </div>

        <div className="grid grid-cols-[2.25fr_1fr] gap-4">
          <TodayAppointmentsTable
            data={todayAppointments}
            columns={AppointmentColumnsTable}
          />

          <TopSpecialties specialties={topSpecialty} />
        </div>
      </LayoutContent>
    </LayoutRoot>
  );
};

export default DashboardPage;
