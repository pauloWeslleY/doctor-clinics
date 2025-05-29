import { type z } from "zod";

import { type LoginFormSchema } from "./login-form.schema";

export type LoginFormSchemaProps = z.infer<typeof LoginFormSchema>;
