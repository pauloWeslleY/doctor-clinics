import { eq } from "drizzle-orm";
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
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { Routes } from "@/lib/routes";

import CreateDoctor from "./components/create-doctor-dialog";
import DoctorCard from "./components/doctor-card";

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

  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session?.user.clinic.id),
  });

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
      <LayoutContent className="flex-wrap">
        {doctors.map((doctor) => {
          return <DoctorCard key={doctor.id} doctor={doctor} />;
        })}
      </LayoutContent>
    </LayoutRoot>
  );
};

export default DoctorsPage;
