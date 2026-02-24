import { NextRequest, NextResponse } from "next/server";

export function apiError(status: number, code: string, message: string, details?: unknown) {
  return NextResponse.json({ ok: false, error: { code, message, details } }, { status });
}

export function apiOk<T>(data?: T) {
  return NextResponse.json(data === undefined ? { ok: true } : { ok: true, data });
}

export function getClientIp(req: NextRequest) {
  return (req.headers.get("x-forwarded-for") ?? "anon").split(",")[0]?.trim() || "anon";
}

export function assertTrustedOrigin(req: NextRequest) {
  const trustedOrigin = process.env.TRUSTED_ORIGIN;
  if (!trustedOrigin) return true;

  const origin = req.headers.get("origin");
  if (!origin) return false;

  return origin === trustedOrigin;
}
