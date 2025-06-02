import { eq } from "drizzle-orm";
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
import { appointmentsTable, doctorsTable, patientsTable } from "@/db/schema";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

import CreateAppointment from "./components/create-appointment";
import DataTableAppointment from "./components/table-appointment";
import { AppointmentColumnsTable } from "./components/table-appointment/columns-table-appointment";

const getAppointments = async () => {
  const { user } = await getUserAuthenticated();

  if (!user) {
    redirect(Routes.Authentication);
  }

  if (!user.clinic) {
    redirect(Routes.Authentication);
  }

  const [patients, doctors, appointments] = await Promise.all([
    db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, user.clinic.id),
    }),
    db.query.doctorsTable.findMany({
      where: eq(doctorsTable.clinicId, user.clinic.id),
    }),
    db.query.appointmentsTable.findMany({
      where: eq(appointmentsTable.clinicId, user.clinic.id),
      with: {
        patient: true,
        doctor: true,
      },
    }),
  ]);

  return {
    patients,
    doctors,
    appointments,
  };
};

const AppointmentsPage = async () => {
  const { patients, doctors, appointments } = await getAppointments();

  return (
    <LayoutRoot>
      <LayoutHeader>
        <LayoutHeaderContent>
          <LayoutHeaderTitle>Agendamentos</LayoutHeaderTitle>
          <LayoutHeaderDescription>
            Gerencie os agendamentos da sua clínica
          </LayoutHeaderDescription>
        </LayoutHeaderContent>
        <LayoutActions>
          <CreateAppointment patients={patients} doctors={doctors} />
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent className="flex-col">
        <DataTableAppointment
          data={appointments}
          columns={AppointmentColumnsTable}
        />
      </LayoutContent>
    </LayoutRoot>
  );
};

export default AppointmentsPage;
