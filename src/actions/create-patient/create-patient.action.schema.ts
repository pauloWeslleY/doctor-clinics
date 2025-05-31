import { z } from "zod";

export const createPatientSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  phoneNumber: z.string().min(8, "Telefone obrigatório"),
  sex: z.enum(["male", "female"], { required_error: "Sexo obrigatório" }),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
