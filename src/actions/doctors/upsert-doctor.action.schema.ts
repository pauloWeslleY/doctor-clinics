import { z } from "zod";

export const UpsertDoctorActionSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, {
    message: "Nome é obrigatório",
  }),
  specialty: z.string().trim().min(1, {
    message: "Especialidade é obrigatória",
  }),
  appointmentPriceInCents: z.number().min(1, {
    message: "Valor da consulta é obrigatório",
  }),
  availableFromWeekDay: z.number().min(0).max(6),
  availableToWeekDay: z.number().min(0).max(6),
  availableFromTime: z.string().trim().min(1, {
    message: "Hora inicial é obrigatória",
  }),
  availableToTime: z.string().trim().min(1, {
    message: "Hora final é obrigatória",
  }),
});
