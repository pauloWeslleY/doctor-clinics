import { type z } from "zod";

import { type patientsTable } from "@/db/schema";

import { type UpdatePatientSchema } from "./update-patient.schema";

export type UpdatePatientFormValuesProps = z.infer<typeof UpdatePatientSchema>;

export interface UpdatePatientProps {
  patient: typeof patientsTable.$inferSelect;
}

export interface UpdatePatientFormProps extends UpdatePatientProps {
  onSuccess: () => void;
}
