import { z } from "zod";

export function validateInput<T>(schema: z.Schema<T>, data: unknown): T {
  return schema.parse(data);
}

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  message: z.string().min(20).max(2000)
});
