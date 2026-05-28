import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles, Clock, ShieldCheck, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SERVICES, SITE } from "@/lib/site";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inter-Cleaning Services — Excellence in Every Sweep | GTA" },
      {
        name: "description",
        content:
          "Premium residential, office and specialty cleaning across the Greater Toronto Area. Reliability, efficiency, excellence — book your free quote today.",
      },
      { property: "og:title", content: "Inter-Cleaning Services — Excellence in Every Sweep" },
      {
        property: "og:description",
        content: "Premium cleaning services across the Greater Toronto Area.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const ACCENT_BG: Record<string, string> = {
  magenta: "bg-magenta/8 text-magenta",
  orange: "bg-orange/10 text-orange",
  yellow: "bg-yellow/10 text-yellow",
};

const ACCENT_RING: Record<string, string> = {
  magenta: "hover:ring-magenta/30",
  orange: "hover:ring-orange/30",
  yellow: "hover:ring-yellow/30",
};

function HomePage() {
  return (
    <div className="bg-white text-charcoal min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative bg-charcoal overflow-hidden diagonal-clip">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-magenta/95 via-magenta/85 to-orange/80 mix-blend-multiply" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 md:py-44">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-white/90 text-[11px] font-semibold uppercase tracking-[0.25em] mb-8">
                <Sparkles className="w-3.5 h-3.5 text-yellow" />
                Serving the Greater Toronto Area
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-[0.95] tracking-tight mb-8">
                Excellence in <span className="text-yellow italic font-semibold">Every</span>
                <br />
                Sweep.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/90 text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
                Premium cleaning services across the GTA. We bring precision, energy and a
                sparkling finish to every space we touch.
              </p>
            </Reveal>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/quote"
                className="group bg-white text-magenta py-4 pr-5 pl-6 flex items-center gap-2 rounded-full text-sm font-bold tracking-wide hover:bg-yellow hover:text-charcoal transition-all"
              >
                Get a quote in under 24 hours!
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="bg-transparent text-white border-2 border-white/40 py-4 px-8 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap items-center gap-8 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-yellow" />
                Fully insured
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow" />
                Flexible scheduling
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow fill-yellow" />
                5-star rated
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta mb-4 block">
                Our Services
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
                A standard of clean that{" "}
                <span className="text-gradient-brand">stands out.</span>
              </h2>
              <p className="text-charcoal/60 text-lg">
                From condos in downtown Toronto to family homes across Brampton, we deliver
                specialized care for every surface.
              </p>
            </div>
            <Link
              to="/services"
              className="text-magenta font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all"
            >
              View all 6 services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className={`group bg-white p-8 rounded-3xl ring-1 ring-charcoal/5 flex flex-col h-full hover:-translate-y-1 transition-all ${ACCENT_RING[s.accent]}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${ACCENT_BG[s.accent]}`}
                  >
                    <span className="font-heading font-bold text-lg">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-charcoal/30 group-hover:text-magenta group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 leading-tight">{s.name}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{s.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PILLARS */}
      <section className="py-32 skew-section bg-charcoal text-white overflow-hidden">
        <div className="unskew-content max-w-7xl mx-auto px-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-yellow block mb-4">
            Why Choose Us
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-20 max-w-2xl">
            Built on three uncompromising values.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                num: "01",
                title: "Reliability",
                desc: "Our vetted, trained professionals arrive precisely when scheduled — every single time.",
                color: "text-magenta",
              },
              {
                num: "02",
                title: "Efficiency",
                desc: "Optimized workflows and modern equipment ensure rapid, non-disruptive service.",
                color: "text-orange",
              },
              {
                num: "03",
                title: "Excellence",
                desc: "A strict quality-control standard that consistently exceeds industry expectations.",
                color: "text-yellow",
              },
            ].map((p) => (
              <div key={p.num} className="relative pt-8">
                <span
                  className={`absolute -top-4 -left-2 text-8xl font-heading font-bold opacity-15 ${p.color}`}
                >
                  {p.num}
                </span>
                <h3 className="font-heading text-2xl font-bold mb-4 relative">{p.title}</h3>
                <p className="text-white/60 leading-relaxed max-w-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta block mb-4">
              How It Works
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
              A seamless three-step process.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-magenta via-orange to-yellow hidden md:block" />
            {[
              { n: 1, t: "Request a Quote", d: "Tell us about your space. Get a tailored estimate within 24h." },
              { n: 2, t: "We Customize a Plan", d: "Frequency, scope and schedule — built around your routine." },
              { n: 3, t: "Sit Back & Sparkle", d: "Our team handles the rest. You enjoy a spotless space." },
            ].map((step, i) => (
              <div key={step.n} className="text-center relative bg-white px-4">
                <div
                  className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center font-heading font-bold text-2xl text-white shadow-[0_15px_40px_-10px_rgba(220,13,115,0.4)] ${
                    i === 0 ? "bg-magenta" : i === 1 ? "bg-orange" : "bg-yellow text-charcoal"
                  }`}
                >
                  {step.n}
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{step.t}</h3>
                <p className="text-charcoal/60 leading-relaxed max-w-xs mx-auto">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                q: "The team is punctual, thorough and genuinely cares about the details. Our condo has never looked better.",
                n: "Sarah M.",
                r: "Residential client, Downtown Toronto",
              },
              {
                q: "We switched our office cleaning to Inter-Cleaning six months ago — the difference in our space is night and day.",
                n: "Marc D.",
                r: "Office Manager, Mississauga",
              },
              {
                q: "Move-out cleaning that actually passed inspection on the first try. Got my full deposit back.",
                n: "Priya K.",
                r: "Tenant, Brampton",
              },
            ].map((t, i) => (
              <figure
                key={i}
                className="bg-white p-8 rounded-3xl ring-1 ring-charcoal/5 flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow text-yellow" />
                  ))}
                </div>
                <blockquote className="text-charcoal/80 leading-relaxed mb-6 flex-1">
                  &ldquo;{t.q}&rdquo;
                </blockquote>
                <figcaption>
                  <div className="font-bold text-sm">{t.n}</div>
                  <div className="text-xs text-charcoal/50 mt-1">{t.r}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[40px] bg-gradient-brand p-12 md:p-20 overflow-hidden text-center">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow/30 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight max-w-3xl mx-auto">
                Ready to experience the streak of brilliance?
              </h2>
              <p className="text-white/90 text-lg mb-10 max-w-xl mx-auto">
                Book your free consultation and see why GTA homes and businesses trust
                Inter-Cleaning Services.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/quote"
                  className="bg-white text-magenta py-4 px-10 rounded-full font-bold tracking-wide text-sm hover:bg-charcoal hover:text-white transition-colors"
                >
                  Get a quote in under 24 hours!
                </Link>
                <a
                  href={SITE.phoneHref}
                  className="text-white border-b-2 border-white/40 py-2 font-bold hover:border-white transition-all"
                >
                  Call {SITE.phone}
                </a>
              </div>
              <ul className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-white/80">
                {["No obligation", "Free estimate", "24h response"].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-yellow" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
