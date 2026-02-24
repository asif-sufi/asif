import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApiSession } from "@/lib/auth/guards";
import { apiError } from "@/lib/security/http";

export async function GET(_req: NextRequest, { params }: { params: { file: string } }) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  const file = params.file;
  if (!/^[a-z0-9-]+\.[a-z0-9]+$/i.test(file)) {
    return apiError(400, "INVALID_FILE", "Invalid file path");
  }

  const finalPath = path.join(process.cwd(), ".uploads", file);

  try {
    const data = await readFile(finalPath);
    return new NextResponse(data, {
      headers: { "Content-Disposition": `attachment; filename="${file}"` }
    });
  } catch {
    return apiError(404, "NOT_FOUND", "File not found");
  }
}
