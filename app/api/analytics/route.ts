import { NextRequest } from "next/server";
import { z } from "zod";
import { validateInput, toErrorDetails } from "@/lib/security/validation";
import { writeAnalyticsEvent } from "@/lib/analytics/tracker";
import { envLimit, envWindowMs, withRateLimit } from "@/lib/security/rate-limit";
import { apiError, apiOk, assertTrustedOrigin, getClientIp } from "@/lib/security/http";
import { requireAdminApiSession } from "@/lib/auth/guards";
import { prisma } from "@/lib/db/prisma";

const schema = z.object({ page: z.string().max(120), device: z.enum(["mobile", "tablet", "desktop"]) });

export async function POST(req: NextRequest) {
  try {
    if (!assertTrustedOrigin(req)) {
      return apiError(403, "FORBIDDEN_ORIGIN", "Origin is not allowed");
    }

    const allowed = withRateLimit(`analytics:${getClientIp(req)}`, envLimit("RATE_LIMIT_ANALYTICS", 50), envWindowMs());
    if (!allowed.ok) return apiError(429, "RATE_LIMITED", "Too many events");

    const body = validateInput(schema, await req.json());
    await writeAnalyticsEvent(body.page, body.device);
    return apiOk();
  } catch (error) {
    return apiError(400, "INVALID_INPUT", "Request validation failed", toErrorDetails(error));
  }
}

export async function GET() {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  const daily = await prisma.analyticsEvent.groupBy({ by: ["dayBucket", "page"], _count: { _all: true }, orderBy: { dayBucket: "desc" }, take: 100 });
  return apiOk(daily);
}
