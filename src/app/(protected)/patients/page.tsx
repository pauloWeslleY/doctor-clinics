import {
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutHeaderContent,
  LayoutHeaderDescription,
  LayoutHeaderTitle,
  LayoutRoot,
} from "@/components/root-layout";

import CreateDialogPatient from "./components/dialog-create-patient";
import TablePatient from "./components/table-patient";

const PatientsPage = () => {
  return (
    <LayoutRoot>
      <LayoutHeader>
        <LayoutHeaderContent>
          <LayoutHeaderTitle>Pacientes</LayoutHeaderTitle>
          <LayoutHeaderDescription>
            Gerencie os pacientes da sua clínica
          </LayoutHeaderDescription>
        </LayoutHeaderContent>
        <LayoutActions>
          <CreateDialogPatient />
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent>
        <TablePatient />
      </LayoutContent>
    </LayoutRoot>
  );
};

export default PatientsPage;
