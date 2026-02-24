import { ZodError, z } from "zod";

export class InputValidationError extends Error {
  constructor(public readonly details: z.typeToFlattenedError<unknown>["fieldErrors"]) {
    super("Invalid request payload");
    this.name = "InputValidationError";
  }
}

export function validateInput<T>(schema: z.Schema<T>, data: unknown): T {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw new InputValidationError(parsed.error.flatten().fieldErrors);
  }
  return parsed.data;
}

export function toErrorDetails(error: unknown) {
  if (error instanceof ZodError) return error.flatten().fieldErrors;
  if (error instanceof InputValidationError) return error.details;
  return undefined;
}

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  message: z.string().min(20).max(2000)
});
