import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { validateInput } from "@/lib/security/validation";
import { assertAdminApi } from "@/lib/auth/admin-api";

const schema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  problem: z.string().min(10),
  approach: z.string().min(10),
  tools: z.string().min(3),
  findings: z.string().min(10),
  impact: z.string().min(3),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(false)
});

export async function GET() {
  if (!(await assertAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  if (!(await assertAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = validateInput(schema, await req.json());
  const data = await prisma.project.create({ data: payload });
  return NextResponse.json({ data });
}
