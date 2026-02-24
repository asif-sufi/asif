import dynamic from "next/dynamic";
import Link from "next/link";

const HeroCanvas = dynamic(() => import("@/components/three/hero-canvas").then((m) => m.HeroCanvas), { ssr: false });

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.2),transparent_30%),radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.2),transparent_35%)]" />
      <div className="container-shell grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-electric">Penetration Testing · Bug Bounty · Research</p>
          <h1 className="mt-5 text-5xl font-bold leading-tight text-balance">
            Security engineering with offensive depth and enterprise discipline.
          </h1>
          <p className="mt-6 max-w-xl text-slate-300">
            I build and break web systems to help businesses ship faster without sacrificing trust.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/projects" className="rounded-lg bg-electric px-5 py-3 font-medium shadow-neon transition hover:scale-[1.02]">View Case Studies</Link>
            <Link href="/contact" className="glass rounded-lg px-5 py-3 transition hover:border-electric">Book Security Review</Link>
          </div>
        </div>
        <div className="glass rounded-2xl p-4 shadow-neon">
          <HeroCanvas />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-[size:28px_28px] opacity-40" />
    </section>
  );
}
