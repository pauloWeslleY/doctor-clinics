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
import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

import CreateDialogPatient from "./components/dialog-create-patient";
import TablePatient from "./components/table-patient";

const PatientsPage = async () => {
  const { session, user } = await getUserAuthenticated();

  if (!session) {
    redirect(Routes.Authentication);
  }

  if (!user?.plan) {
    redirect(Routes.Plans);
  }

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
