import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { assertAdminApi } from "@/lib/auth/admin-api";
import { validateInput } from "@/lib/security/validation";

const schema = z.object({ key: z.string().min(2), enabled: z.boolean() });

export async function GET() {
  if (!(await assertAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await prisma.featureFlag.findMany();
  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest) {
  if (!(await assertAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = validateInput(schema, await req.json());
  const data = await prisma.featureFlag.upsert({
    where: { key: payload.key },
    update: { enabled: payload.enabled },
    create: payload
  });
  return NextResponse.json({ data });
}
