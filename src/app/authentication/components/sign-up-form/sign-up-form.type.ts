import { type z } from "zod";

import { type SignUpFormSchema } from "./sign-up-form.schema";

export type SignUpFormSchemaProps = z.infer<typeof SignUpFormSchema>;
