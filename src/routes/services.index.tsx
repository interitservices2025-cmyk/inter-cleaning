import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SERVICES } from "@/lib/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Cleaning Services in the GTA — Inter-Cleaning Services" },
      {
        name: "description",
        content:
          "Explore our 6 specialty cleaning services: residential, office, deep cleaning, move-in/out, carpet & upholstery and window & glass cleaning.",
      },
      { property: "og:title", content: "Our Cleaning Services — Inter-Cleaning" },
      { property: "og:description", content: "Six specialty services across the GTA." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <div className="bg-white text-charcoal min-h-screen">
      <Header />

      <section className="relative bg-charcoal overflow-hidden diagonal-clip">
        <div className="absolute inset-0 bg-gradient-to-br from-magenta to-orange opacity-95" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-yellow mb-6 block">
            Our Services
          </span>
          <h1 className="font-heading text-5xl md:text-7xl text-white font-bold tracking-tight leading-tight max-w-3xl">
            Specialty cleaning, tailored to your space.
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {SERVICES.map((s, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={s.slug}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden ring-1 ring-charcoal/5">
                  <img
                    src={s.image}
                    alt={s.name}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-[0.3em] block mb-4 ${
                      s.accent === "magenta" ? "text-magenta" : s.accent === "orange" ? "text-orange" : "text-yellow"
                    }`}
                  >
                    0{i + 1} — {s.accent === "yellow" ? "Specialty" : s.accent === "orange" ? "Commercial" : "Care"}
                  </span>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    {s.name}
                  </h2>
                  <p className="text-charcoal/70 text-lg leading-relaxed mb-6">{s.description}</p>
                  <ul className="space-y-2 mb-8">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-charcoal/80">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-magenta shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="inline-flex items-center gap-2 text-magenta font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
