import { formatCurrencyInCents } from "@/helpers/format-currency-in-cents";

import { type DoctorProps } from "../components/doctor-card/doctor.type";
import { getAvailability } from "./availability";

export function formatDataDoctor(doctor: DoctorProps) {
  const availability = getAvailability(doctor);

  const doctorInitials = () => {
    const doctorName = doctor.name.split(" ");
    const doctorInitials = doctorName.map((name) => name[0]);
    return doctorInitials.join("").toUpperCase();
  };

  const selectedAvailabilityCurrent = () => {
    return {
      weekDay: `${availability.from.format("dddd")} a ${availability.to.format("dddd")}`,
      time: `Das ${availability.from.format("HH:mm")} às ${availability.to.format("HH:mm")}`,
    };
  };

  return {
    availability,
    doctorInitials: doctorInitials(),
    selectedAvailabilityCurrent: selectedAvailabilityCurrent(),
    formatAppointmentPriceInCents: formatCurrencyInCents(
      doctor.appointmentPriceInCents,
    ),
  };
}
