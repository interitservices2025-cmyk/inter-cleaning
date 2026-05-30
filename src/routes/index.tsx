import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Check,
  Sparkles,
  Clock,
  ShieldCheck,
  Users,
  Award,
  HeartHandshake,
  Phone,
  Building2,
  Home,
  Hotel,
  Stethoscope,
  Briefcase,
  Truck,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { GoogleReviewCard } from "@/components/GoogleReviewCard";
import { PartnerLogo } from "@/components/PartnerLogo";
import { SERVICES, SITE } from "@/lib/site";
import { latestPublishedPosts } from "@/lib/blog.functions";
import heroImg from "@/assets/hero.jpg";
import baLiving from "@/assets/ba-living.jpg";
import baKitchen from "@/assets/ba-kitchen.jpg";
import baBathroom from "@/assets/ba-bathroom.jpg";
import baOffice from "@/assets/ba-office.jpg";

const latestPostsQO = queryOptions({
  queryKey: ["blog", "latest"],
  queryFn: () => latestPublishedPosts(),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inter-Cleaning Services — Premium Cleaning Across the GTA" },
      {
        name: "description",
        content:
          "Premium residential, office and specialty cleaning across the Greater Toronto Area. Insured, vetted teams. Get a tailored quote in under 24 hours.",
      },
      { property: "og:title", content: "Inter-Cleaning Services — Premium Cleaning Across the GTA" },
      {
        property: "og:description",
        content: "Insured, vetted cleaning teams across the GTA. Quote in under 24 hours.",
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
  magenta: "hover:ring-magenta/40",
  orange: "hover:ring-orange/40",
  yellow: "hover:ring-yellow/40",
};

const STATS = [
  { Icon: Users, value: "500+", label: "Clients served across the GTA" },
  { Icon: Award, value: "10+", label: "Years cleaning homes & offices" },
  { Icon: Clock, value: "24/7", label: "Support, 7 days a week" },
  { Icon: ShieldCheck, value: "100%", label: "Satisfaction guaranteed" },
];

const PARTNERS = [
  "GTA Property Group",
  "Northstar Realty",
  "Bayview Clinics",
  "Maple Hospitality",
  "Lakeshore Offices",
  "Heritage Estates",
];

function HomePage() {
  return (
    <div className="bg-white text-charcoal min-h-screen">
      <Header />

      {/* HERO */}
      <section className="relative bg-charcoal overflow-hidden">
        <img
          src={heroImg}
          alt="Inter-Cleaning Services professional team cleaning a luxurious corporate office"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Layered overlays for premium readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,color-mix(in_oklab,var(--magenta)_35%,transparent)_0%,transparent_50%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-28 md:pt-36 md:pb-40">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-white/90 text-[11px] font-semibold uppercase tracking-[0.25em] mb-8">
                <Sparkles className="w-3.5 h-3.5 text-yellow" />
                Trusted across the Greater Toronto Area
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-heading text-[2.75rem] sm:text-5xl md:text-7xl lg:text-[5.25rem] text-white font-bold leading-[1.02] tracking-tight mb-6">
                Premium cleaning,{" "}
                <span className="relative inline-block">
                  <span className="text-gradient-brand bg-gradient-to-r from-yellow via-orange to-magenta bg-clip-text text-transparent">
                    spotless results.
                  </span>
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/85 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                A trained, insured team delivering hotel-grade cleaning to homes,
                offices and commercial spaces across the GTA — backed by a 100% satisfaction guarantee.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/quote"
                  className="group bg-gradient-brand text-white py-4 pr-5 pl-7 flex items-center gap-2 rounded-full text-sm font-bold tracking-wide shadow-[0_20px_50px_-15px_color-mix(in_oklab,var(--magenta)_70%,transparent)] hover:-translate-y-0.5 transition-all"
                >
                  Get a quote in under 24 hours!
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={SITE.phoneHref}
                  className="bg-white/10 backdrop-blur text-white border border-white/25 py-4 px-7 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-4 h-4" /> {SITE.phone}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.45}>
              <ul className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/80 text-sm">
                {[
                  { Icon: ShieldCheck, t: "Satisfaction guaranteed" },
                  { Icon: Award, t: "Vetted & trained staff" },
                  { Icon: Clock, t: "Available 7 days/week" },
                  { Icon: Star, t: "5-star rated service" },
                ].map(({ Icon, t }) => (
                  <li key={t} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-yellow" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

      </section>

      {/* STATS BAND */}
      <section className="bg-white border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
              {STATS.map(({ Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-5 p-6 rounded-2xl bg-gradient-to-br from-zinc-50 to-white ring-1 ring-charcoal/5 hover:ring-magenta/30 hover:-translate-y-0.5 transition-all"
                >
                  <span className="shrink-0 w-14 h-14 rounded-xl bg-gradient-brand grid place-items-center text-white shadow-[0_10px_25px_-10px_color-mix(in_oklab,var(--magenta)_70%,transparent)]">
                    <Icon className="w-6 h-6" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-heading text-3xl md:text-4xl font-bold leading-none bg-gradient-to-r from-magenta to-orange bg-clip-text text-transparent">
                      {value}
                    </div>
                    <div className="mt-2 text-sm font-medium text-charcoal/70 leading-snug">
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="pt-16 md:pt-20 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-charcoal/40 mb-8">
            Trusted by property managers, clinics & offices across the GTA
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="font-heading font-bold text-center text-charcoal/40 hover:text-charcoal transition-colors text-sm tracking-tight"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-white to-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta mb-4 block">
                Our Services
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
                A standard of clean that{" "}
                <span className="bg-gradient-to-r from-magenta to-orange bg-clip-text text-transparent">
                  stands out.
                </span>
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
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <StaggerItem key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className={`group relative overflow-hidden bg-white rounded-3xl ring-1 ring-charcoal/5 flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] transition-all duration-500 ${ACCENT_RING[s.accent]}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.name}
                      loading="lazy"
                      width={800}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
                    <div
                      className={`absolute top-4 left-4 w-12 h-12 rounded-2xl backdrop-blur grid place-items-center bg-white/90 ${ACCENT_BG[s.accent]}`}
                    >
                      <span className="font-heading font-bold text-sm">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-heading text-xl font-bold mb-3 leading-tight">{s.name}</h3>
                    <p className="text-sm text-charcoal/60 leading-relaxed flex-1">{s.short}</p>
                    <div className="mt-6 flex items-center gap-2 text-magenta font-bold text-xs uppercase tracking-wider">
                      Learn more
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta mb-4 block">
                See the difference
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Real transformations.{" "}
                <span className="bg-gradient-to-r from-magenta to-orange bg-clip-text text-transparent">
                  Visible results.
                </span>
              </h2>
              <p className="text-charcoal/60 text-lg mb-8 leading-relaxed">
                Drag the slider to reveal what an Inter-Cleaning visit looks like — every surface
                detailed, every corner reset, ready for the moments that matter.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Detailed scrubbing of high-touch areas",
                  "Streak-free glass, mirrors and surfaces",
                  "Sanitized kitchens & bathrooms",
                  "Inspection-ready finishing",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-charcoal/80">
                    <span className="w-5 h-5 rounded-full bg-magenta/10 grid place-items-center mt-0.5 shrink-0">
                      <Check className="w-3 h-3 text-magenta" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                to="/quote"
                className="inline-flex bg-gradient-brand text-white px-6 py-3 rounded-full text-sm font-bold tracking-wide hover:-translate-y-0.5 transition-transform"
              >
                Get a quote in under 24 hours!
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <BeforeAfter image={beforeAfter} alt="Living room before and after professional cleaning" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUE PILLARS */}
      <section className="py-28 md:py-36 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-magenta/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-orange/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-yellow block mb-4">
            Why Choose Us
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-20 max-w-2xl">
            Built on three uncompromising values.
          </h2>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.15}>
            {[
              {
                Icon: ShieldCheck,
                num: "01",
                title: "Reliability",
                desc: "Vetted, trained professionals arrive precisely when scheduled — every single time.",
                color: "magenta",
              },
              {
                Icon: Sparkles,
                num: "02",
                title: "Efficiency",
                desc: "Optimized workflows and modern equipment ensure rapid, non-disruptive service.",
                color: "orange",
              },
              {
                Icon: Award,
                num: "03",
                title: "Excellence",
                desc: "A strict quality-control standard that consistently exceeds industry expectations.",
                color: "yellow",
              },
            ].map((p) => (
              <StaggerItem key={p.num}>
                <div className="relative h-full p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] hover:-translate-y-1 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl grid place-items-center ${
                        p.color === "magenta"
                          ? "bg-magenta/15 text-magenta"
                          : p.color === "orange"
                            ? "bg-orange/15 text-orange"
                            : "bg-yellow/15 text-yellow"
                      }`}
                    >
                      <p.Icon className="w-6 h-6" />
                    </div>
                    <span className="font-heading text-5xl font-bold text-white/10">{p.num}</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-3">{p.title}</h3>
                  <p className="text-white/60 leading-relaxed">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta block mb-4">
              How It Works
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
              A seamless three-step process.
            </h2>
          </div>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 relative" stagger={0.18}>
            <div className="absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-magenta via-orange to-yellow hidden md:block" />
            {[
              { Icon: HeartHandshake, n: 1, t: "Request a Quote", d: "Tell us about your space. Get a tailored estimate within 24h." },
              { Icon: Users, n: 2, t: "We Customize a Plan", d: "Frequency, scope and schedule — built around your routine." },
              { Icon: Sparkles, n: 3, t: "Sit Back & Sparkle", d: "Our team handles the rest. You enjoy a spotless space." },
            ].map((step, i) => (
              <StaggerItem key={step.n} className="text-center relative bg-white px-4">
                <div
                  className={`w-20 h-20 rounded-full mx-auto mb-6 grid place-items-center text-white shadow-[0_15px_40px_-10px_rgba(220,13,115,0.4)] ${
                    i === 0 ? "bg-magenta" : i === 1 ? "bg-orange" : "bg-yellow text-charcoal"
                  }`}
                >
                  <step.Icon className="w-8 h-8" />
                </div>
                <div className="font-heading font-bold text-xs uppercase tracking-[0.25em] text-charcoal/40 mb-2">
                  Step {step.n}
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{step.t}</h3>
                <p className="text-charcoal/60 leading-relaxed max-w-xs mx-auto">{step.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta block mb-4">
              Client Stories
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
              Rated 5 stars by GTA homes & businesses.
            </h2>
          </div>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                q: "The team is punctual, thorough and genuinely cares about the details. Our condo has never looked better.",
                n: "Sarah M.",
                r: "Residential client · Downtown Toronto",
                a: avatar1,
              },
              {
                q: "We switched our office cleaning to Inter-Cleaning six months ago — the difference in our space is night and day.",
                n: "Marc D.",
                r: "Office Manager · Mississauga",
                a: avatar2,
              },
              {
                q: "Move-out cleaning that actually passed inspection on the first try. Got my full deposit back.",
                n: "Priya K.",
                r: "Tenant · Brampton",
                a: avatar3,
              },
            ].map((t, i) => (
              <StaggerItem key={i}>
                <figure className="bg-white p-8 rounded-3xl ring-1 ring-charcoal/5 flex flex-col h-full hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.2)] transition-all">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow text-yellow" />
                    ))}
                  </div>
                  <blockquote className="text-charcoal/80 leading-relaxed mb-6 flex-1 text-[15px]">
                    &ldquo;{t.q}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3 pt-4 border-t border-charcoal/5">
                    <img
                      src={t.a}
                      alt={t.n}
                      loading="lazy"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-magenta/20"
                    />
                    <div>
                      <div className="font-bold text-sm">{t.n}</div>
                      <div className="text-xs text-charcoal/50 mt-0.5">{t.r}</div>
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-white">
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
