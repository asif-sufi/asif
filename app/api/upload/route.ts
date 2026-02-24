import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/auth/admin-api";

const allowedMime = new Set(["image/png", "image/jpeg", "image/webp"]);

export async function POST(req: NextRequest) {
  if (!(await assertAdminApi())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Invalid file" }, { status: 400 });

  const maxMb = Number(process.env.UPLOAD_MAX_MB ?? 5);
  if (file.size > maxMb * 1024 * 1024) return NextResponse.json({ error: "File too large" }, { status: 400 });
  if (!allowedMime.has(file.type)) return NextResponse.json({ error: "Unsupported MIME" }, { status: 400 });

  const ext = file.type.split("/")[1] ?? "bin";
  const safeName = `${randomUUID()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, safeName), bytes);

  return NextResponse.json({ path: `/uploads/${safeName}` });
}
