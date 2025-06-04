import {
  ActivityIcon,
  BabyIcon,
  BoneIcon,
  BrainIcon,
  EyeIcon,
  HandIcon,
  HeartIcon,
  HospitalIcon,
  StethoscopeIcon,
} from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TopSpecialtiesProps {
  specialties: {
    specialty: string;
    appointments: number;
  }[];
}

const getSpecialtyIcon = (specialty: string) => {
  const specialtyLower = specialty.toLowerCase();

  if (specialtyLower.includes("cardiolog")) return HeartIcon;
  if (specialtyLower.includes("psiquiatr")) return ActivityIcon;
  if (specialtyLower.includes("dermatolog")) return HandIcon;
  if (specialtyLower.includes("oftalmolog")) return EyeIcon;
  if (specialtyLower.includes("neurolog")) return BrainIcon;

  if (
    specialtyLower.includes("ginecolog") ||
    specialtyLower.includes("obstetri")
  ) {
    return BabyIcon;
  }

  if (
    specialtyLower.includes("ortoped") ||
    specialtyLower.includes("traumatolog")
  ) {
    return BoneIcon;
  }

  return StethoscopeIcon;
};

const TopSpecialties = ({ specialties }: TopSpecialtiesProps) => {
  const maxAppointments = Math.max(...specialties.map((i) => i.appointments));

  return (
    <Card className="mx-auto w-full">
      <CardContent>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HospitalIcon className="text-muted-foreground size-5" />
            <CardTitle className="text-base">Especialidades</CardTitle>
          </div>
        </div>

        <div className="space-y-6">
          {specialties.map(({ specialty, appointments }) => {
            const Icon = getSpecialtyIcon(specialty);
            const progressValue = (appointments / maxAppointments) * 100;

            return (
              <div key={specialty} className="flex items-center gap-2">
                <div className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
                  <Icon className="text-primary size-5" />
                </div>

                <div className="flex w-full flex-col items-center">
                  <div className="flex w-full justify-between">
                    <h3 className="text-sm">{specialty}</h3>

                    <div className="text-right">
                      <span className="text-muted-foreground text-sm font-medium">
                        {appointments} agend.
                      </span>
                    </div>
                  </div>

                  <Progress value={progressValue} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSpecialties;
