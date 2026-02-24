import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function requireAdminSession() {
  const session = await auth();
  const isAdmin = Boolean(session?.user && (session.user as { role?: string }).role === "ADMIN");

  if (!isAdmin) {
    redirect("/admin/login");
  }

  return session;
}

export async function requireAdminApiSession() {
  const session = await auth();
  const isAdmin = Boolean(session?.user && (session.user as { role?: string }).role === "ADMIN");

  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: { code: "UNAUTHORIZED", message: "Admin session required" } }, { status: 401 });
  }

  return null;
}
