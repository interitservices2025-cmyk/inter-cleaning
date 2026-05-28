import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Phone, MapPin, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { SERVICES, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="[&_span]:!text-white [&_span:last-child]:!text-white/50">
              <Logo variant="light" />
            </div>
            <p className="text-sm text-white/60 mt-6 max-w-xs leading-relaxed">
              Premium cleaning services across the Greater Toronto Area. Excellence in every sweep.
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

          <div className="md:col-span-4">
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

          <div className="md:col-span-4">
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
            </ul>
            <Link
              to="/quote"
              className="inline-flex mt-8 bg-gradient-brand text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 transition-transform"
            >
              Request a Free Quote
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
