import Link from "next/link";

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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-surface/85 backdrop-blur-xl">
      <nav className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide">Asif Cyber Platform</Link>
        <div className="flex gap-5 text-sm text-slate-300">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-electric transition-colors">{label}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
