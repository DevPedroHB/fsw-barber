import { z } from "zod";

export const searchSchema = z.object({
  query: z
    .string({
      required_error: "O termo de pesquisa é obrigatório.",
    })
    .min(1, "O termo de pesquisa é obrigatório."),
});

export type SearchSchema = z.infer<typeof searchSchema>;
