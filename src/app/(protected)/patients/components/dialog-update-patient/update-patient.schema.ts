import { z } from "zod";

export const UpdatePatientSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Nome obrigatório",
  }),
  email: z.string().trim().email("E-mail inválido").min(1, {
    message: "E-mail obrigatório",
  }),
  phone: z.string().min(8, {
    message: "Telefone obrigatório",
  }),
  sex: z.enum(["male", "female"], { required_error: "Sexo obrigatório" }),
});
