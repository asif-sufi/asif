import { ReactNode } from "react";
import { requireAdminSession } from "@/lib/auth/guards";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdminSession();
  return <div className="container-shell py-12">{children}</div>;
}
