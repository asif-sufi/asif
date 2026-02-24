"use client";

import { motion } from "framer-motion";

const stats = [
  ["100+", "Assessed Attack Surfaces"],
  ["40+", "Responsible Disclosures"],
  ["99.9%", "Privacy-Centric Telemetry"]
];

export function StatsSection() {
  return (
    <section className="container-shell py-12">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(([value, label], idx) => (
          <motion.article
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <p className="text-3xl font-bold text-electric">{value}</p>
            <p className="mt-2 text-slate-300">{label}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
