import { AvatarFallback } from "@radix-ui/react-avatar";
import { CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { formatDataDoctor } from "../../helpers/data-doctor-card";
import { type DoctorCardProps } from "./doctor.type";

const DoctorDetail = ({ doctor }: DoctorCardProps) => {
  const {
    doctorInitials,
    selectedAvailabilityCurrent,
    formatAppointmentPriceInCents,
  } = formatDataDoctor(doctor);

  return (
    <div className="my-2 space-y-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-15 w-15 bg-gray-100">
          <AvatarFallback>{doctorInitials}</AvatarFallback>
        </Avatar>

        <div className="space-y-1.5">
          <h3 className="text-sm font-medium">{doctor.name}</h3>
          <span className="text-muted-foreground text-sm">
            {doctor.specialty}
          </span>
        </div>
      </div>

      <div className="px-6">
        <Separator />
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-primary-foreground flex w-fit flex-row items-center gap-2 rounded-md p-1">
          <CalendarIcon className="mr-1 size-4" />
          <span className="text-accent-foreground text-md font-medium">
            {selectedAvailabilityCurrent.weekDay}
          </span>
        </div>
        <div className="bg-primary-foreground flex w-fit flex-row items-center gap-2 rounded-md p-1">
          <ClockIcon className="mr-1 size-4" />
          <span className="text-accent-foreground text-md font-medium">
            {selectedAvailabilityCurrent.time}
          </span>
        </div>
        <div className="bg-primary-foreground flex w-fit flex-row items-center gap-2 rounded-md p-1">
          <DollarSignIcon className="mr-1 size-4" />
          <span className="text-accent-foreground text-md font-medium">
            {formatAppointmentPriceInCents}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
