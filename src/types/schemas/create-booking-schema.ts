import { z } from "zod";

export const createBookingSchema = z.object({
  date: z.date({
    required_error: "Data é obrigatória.",
    invalid_type_error: "Data deve ser uma data válida.",
  }),
  time: z
    .string({
      required_error: "Horário é obrigatório.",
      invalid_type_error: "Horário deve ser uma string.",
    })
    .min(5, "Horário é obrigatório."),
});

export type CreateBookingSchema = z.infer<typeof createBookingSchema>;
