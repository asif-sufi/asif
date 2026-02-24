"use client";

import { useMemo, useState } from "react";

function isTorBrowser() {
  return typeof navigator !== "undefined" && /tor/i.test(navigator.userAgent);
}

export function RtcPanel({ enabled }: { enabled: boolean }) {
  const blocked = useMemo(() => isTorBrowser(), []);
  const [consent, setConsent] = useState(false);

  if (!enabled || blocked) return null;

  return (
    <section className="glass container-shell mt-10 rounded-2xl p-6">
      <h3 className="text-xl font-semibold">Audio RTC (Privacy Safe)</h3>
      <p className="mt-3 text-slate-300">Disabled by default. Enable only with explicit consent. No ICE logs stored.</p>
      <label className="mt-4 flex items-center gap-2">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        I consent to temporary audio session initialization.
      </label>
    </section>
  );
}
