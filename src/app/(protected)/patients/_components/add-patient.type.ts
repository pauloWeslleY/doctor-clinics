import { type z } from "zod";

import { type AddPatientSchema } from "./add-patient.schema";

export type AddPatientFormValuesProps = z.infer<typeof AddPatientSchema>;
