import { headers } from "next/headers";
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
import { auth } from "@/lib/auth";
import { Routes } from "@/lib/routes";

import CreateDoctor from "./components/create-doctor-dialog";

const DoctorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(Routes.Authentication);
  }

  if (!session?.user.clinic) {
    redirect(Routes.ClinicForm);
  }

  return (
    <LayoutRoot>
      <LayoutHeader>
        <LayoutHeaderContent>
          <LayoutHeaderTitle>Médicos</LayoutHeaderTitle>
          <LayoutHeaderDescription>
            Gerencie os Médicos da sua clínica
          </LayoutHeaderDescription>
        </LayoutHeaderContent>
        <LayoutActions>
          <CreateDoctor />
        </LayoutActions>
      </LayoutHeader>
      <LayoutContent>Médicos</LayoutContent>
    </LayoutRoot>
  );
};

export default DoctorsPage;
