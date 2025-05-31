import { type doctorsTable } from "@/db/schema";
import { formatCurrencyInCents } from "@/helpers/format-currency-in-cents";

import { getAvailability } from "../../helpers/availability";

export function formatDataDoctor(doctor: typeof doctorsTable.$inferSelect) {
  const doctorInitials = () => {
    const doctorName = doctor.name.split(" ");
    return doctorName
      .map((name) => name[0])
      .join("")
      .toUpperCase();
  };

  const selectedAvailabilityCurrent = () => {
    const availability = getAvailability(doctor);
    return {
      weekDay: `${availability.from.format("dddd")} a ${availability.to.format("dddd")}`,
      time: `Das ${availability.from.format("H")} as ${availability.to.format("H")}`,
    };
  };

  return {
    doctorInitials: doctorInitials(),
    selectedAvailabilityCurrent: selectedAvailabilityCurrent(),
    formatAppointmentPriceInCents: formatCurrencyInCents(
      doctor.appointmentPriceInCents,
    ),
  };
}
