import {
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutHeaderContent,
  LayoutHeaderDescription,
  LayoutHeaderTitle,
  LayoutRoot,
} from "@/components/root-layout";
import { getDoctors } from "@/data/get-doctors";
import WithAuthentication from "@/hocs/with-authentication";

import CreateDoctor from "./components/create-doctor-dialog";
import DoctorCard from "./components/doctor-card";

const DoctorsPage = async () => {
  const { doctors } = await getDoctors();

  return (
    <WithAuthentication>
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
        <LayoutContent>
          <div className="flex flex-row gap-4">
            {doctors.map((doctor) => {
              return <DoctorCard key={doctor.id} doctor={doctor} />;
            })}
          </div>
        </LayoutContent>
      </LayoutRoot>
    </WithAuthentication>
  );
};

export default DoctorsPage;
