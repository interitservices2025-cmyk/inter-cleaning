import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ShieldCheck, Heart, Award } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import teamImg from "@/assets/team.jpg";

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "About Inter-Cleaning Services — Premium Cleaning in the GTA" },
      {
        name: "description",
        content:
          "We're a Brampton-based cleaning company on a mission to redefine the standard of clean across the Greater Toronto Area.",
      },
      { property: "og:title", content: "About — Inter-Cleaning Services" },
      { property: "og:description", content: "Our story, values and team." },
      { property: "og:image", content: teamImg },
      { property: "og:url", content: "/company" },
    ],
    links: [{ rel: "canonical", href: "/company" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-white text-charcoal min-h-screen">
      <Header />

      <section className="relative bg-charcoal overflow-hidden diagonal-clip">
        <div className="absolute inset-0 bg-gradient-to-br from-magenta to-orange opacity-95" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
          <Reveal>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-yellow mb-6 block">
              Company
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-heading text-5xl md:text-7xl text-white font-bold tracking-tight max-w-3xl leading-tight">
              Modernizing professional cleaning in the GTA.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden">
            <img
              src={teamImg}
              alt="The Inter-Cleaning Services team"
              width={1400}
              height={1000}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta block mb-4">
              Our Story
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              A fresh take on a familiar trade.
            </h2>
            <div className="space-y-4 text-charcoal/70 text-lg leading-relaxed">
              <p>
                Inter-Cleaning Services was built on a simple idea: cleaning should feel premium —
                from the moment you request a quote to the second you walk into a perfectly
                refreshed space.
              </p>
              <p>
                We serve the Greater Toronto Area with vetted, trained professionals, modern
                equipment, and a quality-control standard that consistently exceeds expectations.
                Whether it's a downtown condo, a Brampton family home or a Mississauga office,
                we bring the same level of care to every job.
              </p>
              <p>
                Our vibrant brand is a deliberate choice. In a market full of forgettable
                cleaners, we stand for energy, passion and unwavering excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta block mb-4">
              Our Values
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
              What we promise, every visit.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: ShieldCheck, t: "Reliability", d: "Punctual, vetted, insured." },
              { Icon: Sparkles, t: "Excellence", d: "Sparkling results, every time." },
              { Icon: Heart, t: "Care", d: "Your space, treated like ours." },
              { Icon: Award, t: "Professionalism", d: "Uniformed, trained, accountable." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="bg-white p-8 rounded-3xl ring-1 ring-charcoal/5">
                <div className="w-12 h-12 rounded-2xl bg-magenta/10 grid place-items-center mb-6">
                  <Icon className="w-6 h-6 text-magenta" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">{t}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8 tracking-tight">
            Let's make your space <span className="text-gradient-brand">sparkle.</span>
          </h2>
          <Link
            to="/quote"
            className="inline-flex bg-gradient-brand text-white px-10 py-4 rounded-full text-sm font-bold tracking-wide hover:-translate-y-0.5 transition-transform"
          >
            Get a quote in under 24 hours!
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
