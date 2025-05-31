import { z } from "zod";

export const CreateDoctorSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: "Nome é obrigatório",
    }),
    specialty: z.string().trim().min(1, {
      message: "Especialidade é obrigatória",
    }),
    appointmentPrice: z.number().min(1, {
      message: "Valor da consulta é obrigatório",
    }),
    availableFromWeekDay: z.string().min(1, {
      message: "Dias da semana é obrigatório",
    }),
    availableToWeekDay: z.string().min(1, {
      message: "Dias da semana é obrigatório",
    }),
    availableFromTime: z.string().trim().min(1, {
      message: "Hora inicial é obrigatória",
    }),
    availableToTime: z.string().trim().min(1, {
      message: "Hora final é obrigatória",
    }),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message: "O Horário de início não deve ser anterior ao horário final",
      path: ["availableToTime"],
    },
  );
