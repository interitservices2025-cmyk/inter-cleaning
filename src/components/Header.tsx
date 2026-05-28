import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-semibold text-charcoal/70 hover:text-magenta transition-colors"
              activeProps={{ className: "text-magenta" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/quote"
            className="bg-gradient-brand text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--magenta)_60%,transparent)] hover:shadow-[0_15px_40px_-10px_color-mix(in_oklab,var(--magenta)_70%,transparent)] hover:-translate-y-0.5 transition-all"
          >
            Get a Free Quote
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

      {open && (
        <div className="md:hidden border-t border-charcoal/5 bg-white">
          <nav className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-charcoal py-2"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="bg-gradient-brand text-white text-center px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider mt-2"
            >
              Get a Free Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
