import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Phone, MapPin, Mail, Clock, ShieldCheck, Award, Leaf } from "lucide-react";
import { Logo } from "./Logo";
import { SERVICES, SITE } from "@/lib/site";

const AREAS = ["Toronto", "Mississauga", "Brampton", "Vaughan", "Markham", "Richmond Hill", "Oakville", "Etobicoke"];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full bg-magenta/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-orange/10 blur-3xl pointer-events-none" />

      {/* Trust strip */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { Icon: ShieldCheck, t: "Fully Insured & Bonded" },
            { Icon: Award, t: "Vetted & Trained Staff" },
            { Icon: Leaf, t: "Eco-Friendly Products" },
            { Icon: Clock, t: "Flexible 7-Day Scheduling" },
          ].map(({ Icon, t }) => (
            <div key={t} className="flex items-center gap-3 text-sm text-white/80">
              <span className="w-10 h-10 rounded-full bg-white/5 grid place-items-center text-yellow shrink-0">
                <Icon className="w-5 h-5" />
              </span>
              {t}
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="[&_span]:!text-white [&_span:last-child]:!text-white/50">
              <Logo variant="light" />
            </div>
            <p className="text-sm text-white/60 mt-6 max-w-xs leading-relaxed">
              Premium residential and commercial cleaning across the Greater Toronto Area. We bring
              precision, energy and a sparkling finish to every space we touch.
            </p>
            <div className="flex gap-3 mt-8">
              {[
                { Icon: Facebook, href: SITE.socials.facebook, label: "Facebook" },
                { Icon: Instagram, href: SITE.socials.instagram, label: "Instagram" },
                { Icon: Linkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/15 grid place-items-center hover:border-magenta hover:bg-magenta hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-6">
              Services
            </h5>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="text-sm text-white/70 hover:text-magenta transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-6">
              Areas Served
            </h5>
            <ul className="space-y-3">
              {AREAS.map((a) => (
                <li key={a} className="text-sm text-white/70">{a}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 mb-6">
              Get in touch
            </h5>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 text-magenta shrink-0" />
                <span>{SITE.address}</span>
              </li>
              <li>
                <a href={SITE.phoneHref} className="flex items-center gap-3 text-white/70 hover:text-magenta">
                  <Phone className="w-4 h-4 text-magenta shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-white/70 hover:text-magenta">
                  <Mail className="w-4 h-4 text-magenta shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <Clock className="w-4 h-4 mt-0.5 text-magenta shrink-0" />
                <span>Mon–Sun · 7:00 AM – 9:00 PM</span>
              </li>
            </ul>
            <Link
              to="/quote"
              className="inline-flex mt-8 bg-gradient-brand text-white px-6 py-3 rounded-full text-[11px] font-bold tracking-wide hover:-translate-y-0.5 transition-transform"
            >
              Get a quote in under 24 hours!
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/40 uppercase tracking-widest">
            Serving the Greater Toronto Area
          </p>
        </div>
      </div>
    </footer>
  );
}
