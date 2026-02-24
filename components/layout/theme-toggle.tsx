"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const light = saved === "light";
    setIsLight(light);
    document.documentElement.dataset.theme = light ? "light" : "dark";
  }, []);

  return (
    <button
      aria-label="Toggle theme"
      className="rounded-md border border-white/20 px-3 py-1 text-xs text-slate-200 transition hover:border-electric"
      onClick={() => {
        const next = !isLight;
        setIsLight(next);
        document.documentElement.dataset.theme = next ? "light" : "dark";
        localStorage.setItem("theme", next ? "light" : "dark");
      }}
    >
      {isLight ? "Dark" : "Light"}
    </button>
  );
}
