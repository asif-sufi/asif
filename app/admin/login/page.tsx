"use client";

import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  return (
    <main className="container-shell py-24">
      <form
        className="glass mx-auto max-w-md space-y-4 rounded-2xl p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            callbackUrl: "/admin/dashboard"
          });
        }}
      >
        <h1 className="text-2xl font-bold">Admin Access</h1>
        <input name="email" type="email" required className="w-full rounded bg-black/30 p-3" placeholder="Admin email" />
        <input name="password" type="password" required className="w-full rounded bg-black/30 p-3" placeholder="Password" />
        <button className="w-full rounded bg-electric py-3">Sign in</button>
      </form>
    </main>
  );
}
