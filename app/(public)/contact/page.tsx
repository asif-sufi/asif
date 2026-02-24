import { ContactForm } from "@/components/sections/contact-form";

export default function ContactPage() {
  return (
    <main className="container-shell py-24">
      <h1 className="text-4xl font-bold">Secure Contact</h1>
      <p className="mt-4 text-slate-300">Use this channel for collaboration, consulting, and disclosure-safe communications.</p>
      <ContactForm />
    </main>
  );
}
