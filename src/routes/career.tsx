import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, Sparkles, GraduationCap, Users, ArrowRight, Briefcase } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Careers — Join Inter-Cleaning Services | Brampton, ON" },
      {
        name: "description",
        content:
          "Build a career, not just a job. Join Inter-Cleaning Services in Brampton, Ontario. Growth, safety, training and a respectful work environment.",
      },
      { property: "og:title", content: "Careers — Inter-Cleaning Services" },
      { property: "og:description", content: "Grow your career with a team built on innovation, safety and excellence." },
      { property: "og:url", content: "/career" },
    ],
    links: [{ rel: "canonical", href: "/career" }],
  }),
  component: CareerPage,
});

const STEPS = [
  { n: "01", title: "Application", desc: "Pick an opening (or send a speculative application) and fill out our short online form." },
  { n: "02", title: "Review", desc: "We review your profile and check it against the criteria of the role." },
  { n: "03", title: "Interview", desc: "If your profile matches, we schedule an interview and complete reference checks." },
  { n: "04", title: "Hiring", desc: "We finalize pre-employment checks, then send you our welcome onboarding package." },
  { n: "05", title: "Training", desc: "Health & safety, environmental and technical training to set you up for success." },
];

const PERKS = [
  { Icon: ShieldCheck, t: "Health & safety first", d: "A comprehensive approach where your wellbeing is a non-negotiable standard." },
  { Icon: GraduationCap, t: "Real training", d: "Specialized training in techniques, procedures and workplace respect." },
  { Icon: Sparkles, t: "Room to grow", d: "We're expanding — and we promote talent from within." },
  { Icon: Users, t: "Respectful culture", d: "A dynamic, diverse team where every member is valued." },
];

function CareerPage() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Application received! We'll reach out within a few business days.");
      (e.target as HTMLFormElement).reset();
      setSending(false);
    }, 700);
  };

  return (
    <div className="bg-white text-charcoal min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative bg-charcoal overflow-hidden diagonal-clip">
        <div className="absolute inset-0 bg-gradient-to-br from-magenta via-magenta to-orange opacity-95" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
          <Reveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-yellow mb-6 block">
              Careers
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-heading text-5xl md:text-7xl text-white font-bold tracking-tight leading-[1.05] max-w-3xl">
              Build a career, <span className="text-yellow italic font-semibold">not just a job.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/90 text-lg md:text-xl mt-8 max-w-2xl leading-relaxed">
              Enjoy a respectful work environment, growth opportunities, flexible schedules and a
              dynamic team. Opportunities currently available in Ontario.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              href="#apply"
              className="mt-10 inline-flex items-center gap-2 bg-white text-magenta px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-yellow hover:text-charcoal transition-colors"
            >
              Apply now <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta block mb-4">
              Why us
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Built on <span className="text-gradient-brand">innovation & safety.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-charcoal/70 text-lg leading-relaxed">
              At Inter-Cleaning Services, our standards start with our team. Whether you just joined us
              or have been with us for years, we invest in your growth, your training and — most
              importantly — your safety. With us, it's not just a job: it's the building of a true
              career.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PERKS */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-16 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta block mb-4">
              What we offer
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
              A place where people thrive.
            </h2>
          </Reveal>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map(({ Icon, t, d }) => (
              <StaggerItem key={t} className="bg-white p-8 rounded-3xl ring-1 ring-charcoal/5 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-magenta/10 grid place-items-center mb-6">
                  <Icon className="w-6 h-6 text-magenta" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">{t}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-16 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta block mb-4">
              How to apply
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
              A simple, transparent process.
            </h2>
          </Reveal>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((step) => (
              <StaggerItem
                key={step.n}
                className="relative bg-white p-7 rounded-3xl ring-1 ring-charcoal/5 hover:ring-magenta/30 transition-all"
              >
                <span className="font-heading text-5xl font-bold text-gradient-brand block mb-4">
                  {step.n}
                </span>
                <h3 className="font-heading text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{step.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="py-24 bg-zinc-50 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-magenta/10 text-magenta text-[11px] font-bold uppercase tracking-[0.25em] mb-6">
              <Briefcase className="w-3.5 h-3.5" /> Speculative Application
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Ready to join the team?
            </h2>
            <p className="text-charcoal/60 text-lg">
              Looking for a job in Brampton, Ontario? Fill out our general application form below.
            </p>
          </Reveal>

          <Reveal>
            <form
              onSubmit={onSubmit}
              className="bg-white p-8 md:p-12 rounded-3xl ring-1 ring-charcoal/5 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <CField label="First name" name="firstName" required />
                <CField label="Last name" name="lastName" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <CField label="Email" name="email" type="email" required />
                <CField label="Phone" name="phone" type="tel" required />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal/70 block mb-2">
                  Position of interest
                </label>
                <select
                  name="position"
                  required
                  className="w-full rounded-full border border-charcoal/10 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta bg-white"
                >
                  <option value="">Select a position…</option>
                  <option>Residential cleaner</option>
                  <option>Commercial / office cleaner</option>
                  <option>Deep cleaning specialist</option>
                  <option>Carpet & upholstery technician</option>
                  <option>Window & glass technician</option>
                  <option>Team supervisor</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal/70 block mb-2">
                  Tell us about yourself
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Experience, availability, why you'd be a great fit…"
                  className="w-full rounded-2xl border border-charcoal/10 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto bg-gradient-brand text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:-translate-y-0.5 transition-transform disabled:opacity-60"
              >
                {sending ? "Sending…" : "Submit application"}
              </button>
              <p className="text-xs text-charcoal/50">
                You can also reach our team directly at{" "}
                <a className="text-magenta font-bold" href={SITE.phoneHref}>
                  {SITE.phone}
                </a>
                .
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 text-center text-sm text-charcoal/60">
            Not seeing the right role?{" "}
            <Link to="/contact" className="text-magenta font-bold hover:underline">
              Get in touch
            </Link>{" "}
            and tell us how you'd like to contribute.
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CField({
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
