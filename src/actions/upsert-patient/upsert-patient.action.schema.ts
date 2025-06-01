import { z } from "zod";

export const UpsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2, {
    message: "Nome obrigatório",
  }),
  email: z.string().trim().email({
    message: "E-mail inválido",
  }),
  phoneNumber: z.string().trim().min(8, {
    message: "Telefone obrigatório",
  }),
  sex: z.enum(["male", "female"], {
    required_error: "Sexo obrigatório",
  }),
});

export type UpsertPatientProps = z.infer<typeof UpsertPatientSchema>;
