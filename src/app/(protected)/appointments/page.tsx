import {
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutHeaderContent,
  LayoutHeaderDescription,
  LayoutHeaderTitle,
  LayoutRoot,
} from "@/components/root-layout";
import { getAppointments } from "@/data/get-appointment";

import CreateAppointment from "./components/create-appointment";
import DataTableAppointment from "./components/table-appointment";
import { AppointmentColumnsTable } from "./components/table-appointment/columns-table-appointment";

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
      <LayoutContent>
        <DataTableAppointment
          data={appointments}
          columns={AppointmentColumnsTable}
        />
      </LayoutContent>
    </LayoutRoot>
  );
};

export default AppointmentsPage;
