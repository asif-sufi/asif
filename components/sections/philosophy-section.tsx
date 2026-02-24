export function PhilosophySection() {
  return (
    <section className="container-shell py-12">
      <div className="glass rounded-2xl p-8">
        <h2 className="text-3xl font-semibold">Security Philosophy</h2>
        <ul className="mt-6 space-y-3 text-slate-300">
          <li>• Assume breach, then design resilient architecture.</li>
          <li>• Log actions, not personal identifiers.</li>
          <li>• Validate every input server-side, then escape every output.</li>
          <li>• Fix root causes, not just vulnerabilities.</li>
        </ul>
      </div>
    </section>
  );
}
