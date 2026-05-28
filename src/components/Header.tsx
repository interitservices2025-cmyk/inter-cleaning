import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";

const NAV: { to: "/" | "/services" | "/company" | "/career" | "/contact"; label: string; exact?: boolean }[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/services", label: "Services" },
  { to: "/company", label: "Company" },
  { to: "/career", label: "Career" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-charcoal/10 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.1)]"
          : "bg-white/70 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      {/* Top contact bar */}
      <div className="hidden md:block bg-charcoal text-white/80 text-[11px]">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          <span className="tracking-[0.2em] uppercase text-white/50">
            Serving the Greater Toronto Area · Mon–Sun
          </span>
          <div className="flex items-center gap-6">
            <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-yellow transition-colors">
              <Phone className="w-3 h-3" /> {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="hover:text-yellow transition-colors">
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-semibold text-charcoal/70 hover:text-magenta transition-colors"
              activeProps={{ className: "text-magenta" }}
              activeOptions={{ exact: item.exact ?? false }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/quote"
            className="bg-gradient-brand text-white px-5 py-3 rounded-full text-[12px] font-bold tracking-wide shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--magenta)_60%,transparent)] hover:shadow-[0_15px_40px_-10px_color-mix(in_oklab,var(--magenta)_70%,transparent)] hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            Get a quote in under 24 hours!
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-charcoal/5 bg-white overflow-hidden"
          >
            <nav className="px-6 py-6 flex flex-col gap-4">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="text-base font-semibold text-charcoal py-2 border-b border-charcoal/5"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-2 text-sm text-charcoal/70 py-2"
              >
                <Phone className="w-4 h-4 text-magenta" /> {SITE.phone}
              </a>
              <Link
                to="/quote"
                onClick={() => setOpen(false)}
                className="bg-gradient-brand text-white text-center px-6 py-3 rounded-full text-sm font-bold tracking-wide mt-2"
              >
                Get a quote in under 24 hours!
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
