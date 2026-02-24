import Link from "next/link";
import { prisma } from "@/lib/db/prisma";

export default async function DashboardPage() {
  const [projects, posts, messages, views] = await Promise.all([
    prisma.project.count(),
    prisma.post.count(),
    prisma.contactSubmission.count(),
    prisma.analyticsEvent.count()
  ]);

  const cards = [
    ["Projects", projects, "/admin/projects"],
    ["Posts", posts, "/admin/posts"],
    ["Messages", messages, "/admin/inbox"],
    ["Views", views, "/admin/analytics"]
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">CMS Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value, href]) => (
          <Link key={label} href={String(href)} className="glass rounded-2xl p-5 transition hover:border-electric">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-semibold">{value}</p>
          </Link>
        ))}
      </div>
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl font-semibold">CMS Modules</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[
            ["Content Manager", "/admin/content"],
            ["Feature Flags", "/admin/features"],
            ["SEO Manager", "/admin/seo"],
            ["Audit Logs", "/admin/audit"],
            ["Backup Export", "/admin/backup"],
            ["Settings", "/admin/settings"]
          ].map(([label, href]) => (
            <Link key={label} href={String(href)} className="rounded-lg border border-white/10 px-4 py-3 hover:border-electric">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
