import { type z } from "zod";

import { type PatientProps } from "../../types/patient.type";
import { type UpdatePatientSchema } from "./update-patient.schema";

export type UpdatePatientFormValuesProps = z.infer<typeof UpdatePatientSchema>;

export interface UpdatePatientProps {
  patient: PatientProps;
}

export interface UpdatePatientFormProps extends UpdatePatientProps {
  onSuccess: () => void;
}
