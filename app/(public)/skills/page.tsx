const skills = [
  { category: "Recon", items: ["Amass", "Subfinder", "HTTPx", "Nuclei"] },
  { category: "Web Exploitation", items: ["OWASP Top 10", "Burp Suite", "Auth Bypass", "SSRF"] },
  { category: "Secure Engineering", items: ["Threat Modeling", "CSP", "Rate Limiting", "Hardening"] }
];

export default function SkillsPage() {
  return (
    <main className="container-shell py-24">
      <h1 className="text-4xl font-bold">Skills & Proof of Work</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {skills.map((section) => (
          <article key={section.category} className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-electric">{section.category}</h2>
            <ul className="mt-4 space-y-2 text-slate-300">
              {section.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
