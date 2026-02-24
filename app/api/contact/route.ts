import { NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { contactSchema, toErrorDetails, validateInput } from "@/lib/security/validation";
import { envLimit, envWindowMs, withRateLimit } from "@/lib/security/rate-limit";
import { apiError, apiOk, assertTrustedOrigin, getClientIp } from "@/lib/security/http";

export async function POST(req: NextRequest) {
  try {
    if (!assertTrustedOrigin(req)) {
      return apiError(403, "FORBIDDEN_ORIGIN", "Origin is not allowed");
    }

    const allowed = withRateLimit(`contact:${getClientIp(req)}`, envLimit("RATE_LIMIT_CONTACT", 5), envWindowMs());
    if (!allowed.ok) return apiError(429, "RATE_LIMITED", "Too many requests");

    const payload = validateInput(contactSchema, await req.json());
    await prisma.contactSubmission.create({ data: payload });
    return apiOk();
  } catch (error) {
    return apiError(400, "INVALID_INPUT", "Request validation failed", toErrorDetails(error));
  }
}
