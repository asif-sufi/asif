import { auth } from "@/lib/auth/config";

export async function assertAdminApi() {
  const session = await auth();
  return Boolean(session?.user && (session.user as { role?: string }).role === "ADMIN");
}
