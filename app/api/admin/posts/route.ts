import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireAdminApiSession } from "@/lib/auth/guards";
import { validateInput, toErrorDetails } from "@/lib/security/validation";
import { apiError, apiOk, assertTrustedOrigin, getClientIp } from "@/lib/security/http";
import { envLimit, envWindowMs, withRateLimit } from "@/lib/security/rate-limit";

const schema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().min(10),
  contentMd: z.string().min(20),
  published: z.boolean().default(false),
  categoryId: z.string().min(1)
});

export async function GET() {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  const data = await prisma.post.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } });
  return apiOk(data);
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  if (!assertTrustedOrigin(req)) return apiError(403, "FORBIDDEN_ORIGIN", "Origin is not allowed");

  const allowed = withRateLimit(`admin:posts:${getClientIp(req)}`, envLimit("RATE_LIMIT_ADMIN", 60), envWindowMs());
  if (!allowed.ok) return apiError(429, "RATE_LIMITED", "Too many admin requests");

  try {
    const payload = validateInput(schema, await req.json());
    const data = await prisma.post.create({ data: payload });
    return apiOk(data);
  } catch (error) {
    return apiError(400, "INVALID_INPUT", "Request validation failed", toErrorDetails(error));
  }
}
