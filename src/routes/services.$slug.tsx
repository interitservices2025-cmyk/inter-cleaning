import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { getService, SERVICES, SITE } from "@/lib/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Service — Inter-Cleaning Services" }] };
    return {
      meta: [
        { title: `${s.name} — Inter-Cleaning Services GTA` },
        { name: "description", content: s.short },
        { property: "og:title", content: `${s.name} — Inter-Cleaning Services` },
        { property: "og:description", content: s.short },
        { property: "og:image", content: s.image },
        { property: "og:url", content: `/services/${s.slug}` },
        { property: "og:type", content: "article" },
        { name: "twitter:image", content: s.image },
      ],
      links: [{ rel: "canonical", href: `/services/${s.slug}` }],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="bg-white">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="font-heading text-4xl font-bold mb-4">Service not found</h1>
        <Link to="/services" className="text-magenta font-bold">
          ← Back to services
        </Link>
      </div>
      <Footer />
    </div>
  ),
});

function ServiceDetail() {
  const { service: s } = Route.useLoaderData();
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <div className="bg-white text-charcoal min-h-screen">
      <Header />

      <section className="relative bg-charcoal overflow-hidden diagonal-clip">
        <img
          src={s.image}
          alt=""
          width={1600}
          height={900}
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-magenta/95 to-orange/85 mix-blend-multiply" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
          <Reveal>
            <Link
              to="/services"
              className="text-yellow text-[11px] font-bold uppercase tracking-[0.3em] hover:underline"
            >
              ← All services
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-heading text-4xl md:text-6xl text-white font-bold tracking-tight mt-6 max-w-3xl">
              {s.name}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/90 text-lg md:text-xl mt-6 max-w-2xl">{s.short}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="font-heading text-3xl font-bold mb-6">What's included</h2>
            <p className="text-charcoal/70 text-lg leading-relaxed mb-8">{s.description}</p>
            <ul className="space-y-4">
              {s.bullets.map((b: string) => (
                <li
                  key={b}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-50 ring-1 ring-charcoal/5"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-brand grid place-items-center shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-charcoal/80 pt-1">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="md:col-span-1">
            <div className="sticky top-28 bg-charcoal text-white p-8 rounded-3xl">
              <h3 className="font-heading text-xl font-bold mb-3">Ready to book?</h3>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Get a tailored estimate for your space within 24 hours.
              </p>
              <Link
                to="/quote"
                className="block w-full text-center bg-gradient-brand text-white py-3 px-6 rounded-full text-[12px] font-bold tracking-wide mb-3"
              >
                Get a quote in under 24 hours!
              </Link>
              <a
                href={SITE.phoneHref}
                className="flex items-center justify-center gap-2 text-white/80 text-sm hover:text-yellow transition-colors"
              >
                <Phone className="w-4 h-4" /> {SITE.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-12">Other services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/services/$slug"
                params={{ slug: o.slug }}
                className="group bg-white p-8 rounded-3xl ring-1 ring-charcoal/5 hover:-translate-y-1 transition-all"
              >
                <h3 className="font-heading text-xl font-bold mb-3">{o.name}</h3>
                <p className="text-sm text-charcoal/60 mb-6">{o.short}</p>
                <span className="text-magenta font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
