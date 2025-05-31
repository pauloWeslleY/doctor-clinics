import { type z } from "zod";

import { type CreateDoctorSchema } from "./create-doctor.schema";

export type CreateDoctorFormType = z.infer<typeof CreateDoctorSchema>;
