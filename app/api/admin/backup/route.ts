import { prisma } from "@/lib/db/prisma";
import { requireAdminApiSession } from "@/lib/auth/guards";
import { apiOk } from "@/lib/security/http";

export async function GET() {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  const [projects, posts, skills, hero] = await Promise.all([
    prisma.project.findMany(),
    prisma.post.findMany({ include: { category: true } }),
    prisma.skill.findMany(),
    prisma.heroContent.findMany()
  ]);

  return apiOk({ exportedAt: new Date().toISOString(), projects, posts, skills, hero });
}
