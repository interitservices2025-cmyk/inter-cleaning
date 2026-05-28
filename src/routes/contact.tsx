import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Inter-Cleaning Services — Brampton, ON" },
      {
        name: "description",
        content:
          "Get in touch with Inter-Cleaning Services. Based in Brampton, serving the entire GTA. Call +1 (416) 871-9045 or send a message.",
      },
      { property: "og:title", content: "Contact — Inter-Cleaning Services" },
      { property: "og:description", content: "Get in touch with our team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Message sent! We'll be in touch within 24 hours.");
      (e.target as HTMLFormElement).reset();
      setSending(false);
    }, 700);
  };

  return (
    <div className="bg-white text-charcoal min-h-screen">
      <Header />

      <section className="relative bg-charcoal overflow-hidden diagonal-clip">
        <div className="absolute inset-0 bg-gradient-to-br from-magenta to-orange opacity-95" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
          <Reveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-yellow mb-6 block">
              Get In Touch
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-heading text-5xl md:text-7xl text-white font-bold tracking-tight max-w-3xl leading-tight">
              Let's start a conversation.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <h2 className="font-heading text-2xl font-bold mb-8">Send us a message</h2>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="First name" name="firstName" required />
                <Field label="Last name" name="lastName" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
              </div>
              <Field label="Subject" name="subject" />
              <div>
                <label className="text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal/70 block mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-2xl border border-charcoal/10 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="bg-gradient-brand text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:-translate-y-0.5 transition-transform disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <aside className="lg:col-span-2">
            <div className="bg-charcoal text-white p-10 rounded-3xl">
              <h3 className="font-heading text-xl font-bold mb-8">Contact info</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <MapPin className="w-5 h-5 text-magenta shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-white/40 mb-1">
                      Address
                    </div>
                    <div className="text-sm">{SITE.address}</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-white/40 mb-1">
                      Phone
                    </div>
                    <a href={SITE.phoneHref} className="text-sm hover:text-yellow">
                      {SITE.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="w-5 h-5 text-yellow shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-white/40 mb-1">
                      Email
                    </div>
                    <a href={`mailto:${SITE.email}`} className="text-sm hover:text-yellow">
                      {SITE.email}
                    </a>
                  </div>
                </li>
              </ul>
              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="text-[11px] uppercase tracking-widest text-white/40 mb-4">
                  Follow us
                </div>
                <div className="flex gap-3">
                  {[
                    { Icon: Facebook, href: SITE.socials.facebook, label: "Facebook" },
                    { Icon: Instagram, href: SITE.socials.instagram, label: "Instagram" },
                    { Icon: Linkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full border border-white/15 grid place-items-center hover:border-magenta hover:bg-magenta transition-all"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal/70 block mb-2">
        {label} {required && <span className="text-magenta">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-full border border-charcoal/10 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition"
      />
    </div>
  );
}
