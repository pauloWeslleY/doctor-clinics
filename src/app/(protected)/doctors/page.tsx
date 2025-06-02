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
import { doctorsTable } from "@/db/schema";
import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

import CreateDoctor from "./components/create-doctor-dialog";
import DoctorCard from "./components/doctor-card";

const getDoctors = async () => {
  const { user } = await getUserAuthenticated();

  if (!user) {
    redirect(Routes.Authentication);
  }

  if (!user.clinic) {
    redirect(Routes.ClinicForm);
  }

  return await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, user.clinic.id),
  });
};

const DoctorsPage = async () => {
  const doctors = await getDoctors();

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
