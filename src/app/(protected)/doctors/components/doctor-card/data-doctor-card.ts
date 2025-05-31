import { type doctorsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/format-currency-in-cents";

import { getAvailability } from "../../helpers/availability";

export function formatDataDoctor(doctor: typeof doctorsTable.$inferSelect) {
  const availability = getAvailability(doctor);

  const doctorInitials = () => {
    const doctorName = doctor.name.split(" ");
    return doctorName
      .map((name) => name[0])
      .join("")
      .toUpperCase();
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
