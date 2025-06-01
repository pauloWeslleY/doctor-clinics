import {
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutHeaderContent,
  LayoutHeaderDescription,
  LayoutHeaderTitle,
  LayoutRoot,
} from "@/components/root-layout";

import AddDialogPatient from "./_components/dialog-add-patient";
import TablePatient from "./_components/table-patient";

const PatientsPage = () => {
  return (
    <LayoutRoot>
      <LayoutHeader>
        <LayoutHeaderContent>
          <LayoutHeaderTitle>Pacientes</LayoutHeaderTitle>
          <LayoutHeaderDescription>
            Gerencie os Médicos da sua clínica
          </LayoutHeaderDescription>
        </LayoutHeaderContent>
        <LayoutActions>
          <AddDialogPatient />
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent className="flex-col">
        <TablePatient />
      </LayoutContent>
    </LayoutRoot>
  );
};

export default PatientsPage;
