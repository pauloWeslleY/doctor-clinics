import { type z } from "zod";

import { type ClinicFormSchema } from "./clinic-form.schema";

export type ClinicFormSchemaProps = z.infer<typeof ClinicFormSchema>;
