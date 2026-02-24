import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { assertAdminApi } from "@/lib/auth/admin-api";
import { validateInput } from "@/lib/security/validation";

const schema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().min(10),
  contentMd: z.string().min(20),
  published: z.boolean().default(false),
  categoryId: z.string().min(1)
});

export async function GET() {
  if (!(await assertAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await prisma.post.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  if (!(await assertAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = validateInput(schema, await req.json());
  const data = await prisma.post.create({ data: payload });
  return NextResponse.json({ data });
}
