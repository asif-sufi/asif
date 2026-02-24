import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { assertAdminApi } from "@/lib/auth/admin-api";
import { validateInput } from "@/lib/security/validation";

const schema = z.object({
  headline: z.string().min(8),
  subtext: z.string().min(12),
  ctaPrimary: z.string().min(2),
  ctaSecondary: z.string().min(2)
});

export async function GET() {
  if (!(await assertAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await prisma.heroContent.findFirst();
  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest) {
  if (!(await assertAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = validateInput(schema, await req.json());
  const first = await prisma.heroContent.findFirst();
  const data = first
    ? await prisma.heroContent.update({ where: { id: first.id }, data: payload })
    : await prisma.heroContent.create({ data: payload });
  return NextResponse.json({ data });
}
