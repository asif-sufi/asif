import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Skills", "/skills"],
  ["Projects", "/projects"],
  ["Blog", "/blog"],
  ["Contact", "/contact"]
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-surface/80 backdrop-blur-2xl">
      <nav className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide">Asif Cyber Platform</Link>
        <div className="flex items-center gap-5 text-sm text-slate-300">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="transition-colors hover:text-electric focus-visible:text-electric">{label}</Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
