"use client";

import { useState } from "react";

export function ContactForm() {
  const [state, setState] = useState("idle");

  async function handleSubmit(formData: FormData) {
    setState("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
      })
    });

    setState(res.ok ? "success" : "error");
  }

  return (
    <form action={handleSubmit} className="glass mt-8 space-y-4 rounded-2xl p-6">
      <input name="name" required placeholder="Name" className="w-full rounded-lg bg-black/30 p-3" />
      <input name="email" type="email" required placeholder="Email" className="w-full rounded-lg bg-black/30 p-3" />
      <textarea name="message" required rows={6} placeholder="Message" className="w-full rounded-lg bg-black/30 p-3" />
      <button className="rounded-lg bg-electric px-5 py-3">{state === "loading" ? "Sending..." : "Send securely"}</button>
      {state === "success" && <p className="text-green-400">Message stored. I will respond soon.</p>}
      {state === "error" && <p className="text-red-400">Unable to submit. Try later.</p>}
    </form>
  );
}
