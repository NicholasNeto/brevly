import { z } from "zod";

export const createLinkSchema = z.object({
  originalUrl: z.string().url("URL inválida"),
  shortUrl: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .regex(/^[a-zA-Z0-9-_]+$/, "Formato inválido"),
});

export type CreateLinkFormData = z.infer<typeof createLinkSchema>;
