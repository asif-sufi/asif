import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { contactSchema, validateInput } from "@/lib/security/validation";
import { withRateLimit } from "@/lib/security/rate-limit";

export async function POST(req: NextRequest) {
  const allowed = withRateLimit(`contact:${req.headers.get("x-forwarded-for") ?? "anon"}`, 5, 60_000);
  if (!allowed.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const payload = validateInput(contactSchema, await req.json());
  await prisma.contactSubmission.create({ data: payload });
  return NextResponse.json({ ok: true });
}
