import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { assertAdminApi } from "@/lib/auth/admin-api";

export async function GET() {
  if (!(await assertAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [projects, posts, skills, hero] = await Promise.all([
    prisma.project.findMany(),
    prisma.post.findMany({ include: { category: true } }),
    prisma.skill.findMany(),
    prisma.heroContent.findMany()
  ]);

  return NextResponse.json({ exportedAt: new Date().toISOString(), projects, posts, skills, hero });
}
