import { z } from "zod";

export const searchSchema = z.object({
  query: z.string().min(3, "A consulta deve ter pelo menos 3 caracteres."),
});

export type SearchSchema = z.infer<typeof searchSchema>;
