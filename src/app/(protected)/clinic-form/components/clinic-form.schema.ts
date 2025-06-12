import { z } from "zod";

export const ClinicFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Nome é obrigatório",
  }),
});
