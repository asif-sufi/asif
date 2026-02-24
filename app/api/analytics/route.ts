import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { validateInput } from "@/lib/security/validation";
import { writeAnalyticsEvent } from "@/lib/analytics/tracker";
import { withRateLimit } from "@/lib/security/rate-limit";

const schema = z.object({ page: z.string().max(120), device: z.string().max(30) });

export async function POST(req: NextRequest) {
  const allowed = withRateLimit(`analytics:${req.headers.get("x-forwarded-for") ?? "anon"}`, 50, 60_000);
  if (!allowed.ok) return NextResponse.json({ error: "Too many events" }, { status: 429 });

  const body = validateInput(schema, await req.json());
  await writeAnalyticsEvent(body.page, body.device);
  return NextResponse.json({ ok: true });
}
