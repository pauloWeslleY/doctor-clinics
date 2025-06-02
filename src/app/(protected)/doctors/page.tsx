import { getDoctors } from "@/actions/get-doctors";
import {
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutHeaderContent,
  LayoutHeaderDescription,
  LayoutHeaderTitle,
  LayoutRoot,
} from "@/components/root-layout";

import CreateDoctor from "./components/create-doctor-dialog";
import DoctorCard from "./components/doctor-card";

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
