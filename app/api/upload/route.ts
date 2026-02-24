import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";
import { requireAdminApiSession } from "@/lib/auth/guards";
import { apiError, apiOk, assertTrustedOrigin, getClientIp } from "@/lib/security/http";
import { envLimit, envWindowMs, withRateLimit } from "@/lib/security/rate-limit";

const allowedMime = new Set(["image/png", "image/jpeg", "image/webp"]);

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  if (!assertTrustedOrigin(req)) {
    return apiError(403, "FORBIDDEN_ORIGIN", "Origin is not allowed");
  }

  const allowed = withRateLimit(`upload:${getClientIp(req)}`, envLimit("RATE_LIMIT_ADMIN", 30), envWindowMs());
  if (!allowed.ok) return apiError(429, "RATE_LIMITED", "Too many uploads");

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return apiError(400, "INVALID_FILE", "File is required");

  const maxBytes = Number(process.env.UPLOAD_MAX_BYTES ?? 5 * 1024 * 1024);
  if (file.size > maxBytes) return apiError(400, "FILE_TOO_LARGE", "File exceeds configured size limit");
  if (!allowedMime.has(file.type)) return apiError(400, "UNSUPPORTED_MEDIA", "Unsupported MIME type");

  const ext = file.type.split("/")[1] ?? "bin";
  const safeName = `${randomUUID()}.${ext}`;
  const uploadDir = path.join(process.cwd(), ".uploads");
  await mkdir(uploadDir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, safeName), bytes);

  return apiOk({ file: safeName, size: file.size, type: file.type, downloadUrl: `/api/upload/${safeName}` });
}
