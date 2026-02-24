import { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth/guards";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();
  return <div className="container-shell py-12">{children}</div>;
}
