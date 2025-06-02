import { type z } from "zod";

import { type CreatePatientSchema } from "./create-patient.schema";

export type CreatePatientFormValuesProps = z.infer<typeof CreatePatientSchema>;
