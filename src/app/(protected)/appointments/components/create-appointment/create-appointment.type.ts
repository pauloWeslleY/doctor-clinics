import { type z } from "zod";

import { type DoctorProps } from "@/app/(protected)/doctors/components/doctor-card/doctor.type";
import { type PatientProps } from "@/app/(protected)/patients/types/patient.type";

import { type CreateAppointmentSchema } from "./create-appointment.schema";

export type CreateAppointmentFormType = z.infer<typeof CreateAppointmentSchema>;

export interface CreateAppointmentFormProps {
  patients: PatientProps[];
  doctors: DoctorProps[];
  onSuccess?: () => void;
}
