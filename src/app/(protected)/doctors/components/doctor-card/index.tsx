import { CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { formatDataDoctor } from "../../helpers/data-doctor-card";
import DialogDoctorDetail from "./dialog-doctor-detail";
import { type DoctorCardProps } from "./doctor.type";
import DoctorAlertDelete from "./doctor-alert-delete";

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const {
    availability,
    doctorInitials,
    selectedAvailabilityCurrent,
    formatAppointmentPriceInCents,
  } = formatDataDoctor(doctor);

  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="h-15 w-15">
            <AvatarFallback>{doctorInitials}</AvatarFallback>
          </Avatar>

          <div className="space-y-1.5">
            <CardTitle className="text-sm font-medium">{doctor.name}</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              {doctor.specialty}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <div className="px-6">
        <Separator />
      </div>

      <CardContent className="flex flex-col gap-3">
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
      </CardContent>

      <div className="px-6">
        <Separator />
      </div>

      <CardFooter className="flex-col gap-2">
        <DialogDoctorDetail
          doctor={{
            ...doctor,
            availableFromTime: availability.from.format("HH:mm"),
            availableToTime: availability.to.format("HH:mm"),
          }}
        />

        <DoctorAlertDelete id={doctor.id} />
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
