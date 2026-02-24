import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") {
    redirect("/admin/login");
  }
  return session;
}
