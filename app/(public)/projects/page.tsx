import { prisma } from "@/lib/db/prisma";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });

  return (
    <main className="container-shell py-24">
      <h1 className="text-4xl font-bold">Case Studies</h1>
      <div className="mt-8 space-y-6">
        {projects.map((project) => (
          <article key={project.id} className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-semibold">{project.title}</h2>
            <p className="mt-2 text-slate-300">{project.problem}</p>
            <p className="mt-2 text-electric">Impact: {project.impact}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
