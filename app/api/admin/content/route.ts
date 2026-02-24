import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireAdminApiSession } from "@/lib/auth/guards";
import { validateInput, toErrorDetails } from "@/lib/security/validation";
import { apiError, apiOk, assertTrustedOrigin, getClientIp } from "@/lib/security/http";
import { envLimit, envWindowMs, withRateLimit } from "@/lib/security/rate-limit";

const schema = z.object({
  headline: z.string().min(8),
  subtext: z.string().min(12),
  ctaPrimary: z.string().min(2),
  ctaSecondary: z.string().min(2)
});

export async function GET() {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;
  const data = await prisma.heroContent.findFirst();
  return apiOk(data);
}

export async function PUT(req: NextRequest) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;
  if (!assertTrustedOrigin(req)) return apiError(403, "FORBIDDEN_ORIGIN", "Origin is not allowed");

  const allowed = withRateLimit(`admin:content:${getClientIp(req)}`, envLimit("RATE_LIMIT_ADMIN", 60), envWindowMs());
  if (!allowed.ok) return apiError(429, "RATE_LIMITED", "Too many admin requests");

  try {
    const payload = validateInput(schema, await req.json());
    const first = await prisma.heroContent.findFirst();
    const data = first
      ? await prisma.heroContent.update({ where: { id: first.id }, data: payload })
      : await prisma.heroContent.create({ data: payload });
    return apiOk(data);
  } catch (error) {
    return apiError(400, "INVALID_INPUT", "Request validation failed", toErrorDetails(error));
  }
}
