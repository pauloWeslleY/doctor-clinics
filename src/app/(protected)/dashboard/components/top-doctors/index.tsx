import { Stethoscope } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Routes } from "@/lib/routes";

interface TopDoctorsProps {
  doctors: {
    id: string;
    name: string;
    avatarUrl: string | null;
    specialty: string;
    appointments: number;
  }[];
}

const TopDoctors = ({ doctors }: TopDoctorsProps) => {
  const doctorAvatarFallback = (name: string) => {
    if (!name) return "Foto do médico";
    const nameDoctor = name.split(" ").map((n) => n[0]);
    return nameDoctor.join("").slice(0, 2);
  };

  return (
    <Card className="mx-auto h-fit w-full">
      <CardContent>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Stethoscope className="text-muted-foreground size-5" />
            <CardTitle className="text-base">Médicos</CardTitle>
          </div>

          <Button
            asChild
            variant="link"
            className="text-muted-foreground font-semibold hover:no-underline"
          >
            <Link href={Routes.Doctors}>Ver todos</Link>
          </Button>
        </div>

        <div className="space-y-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gray-100 text-lg font-medium text-gray-600">
                    {doctorAvatarFallback(doctor.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm">{doctor.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {doctor.specialty}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground text-sm font-medium">
                  {doctor.appointments} agend.
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopDoctors;
