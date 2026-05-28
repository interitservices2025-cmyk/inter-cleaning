import logo from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";

export function Logo({ variant = "default" }: { variant?: "default" | "light" }) {
  return (
    <Link to="/" className="flex items-center gap-3 group" aria-label="Inter-Cleaning Services — Home">
      <img
        src={logo}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 object-contain transition-transform group-hover:rotate-6"
      />
      <div className="flex flex-col leading-none">
        <span
          className={`font-heading font-bold text-sm tracking-tight uppercase ${
            variant === "light" ? "text-white" : "text-charcoal"
          }`}
        >
          Inter-Cleaning
        </span>
        <span
          className={`font-heading font-semibold text-[10px] tracking-[0.25em] uppercase ${
            variant === "light" ? "text-white/60" : "text-charcoal/50"
          }`}
        >
          Services
        </span>
      </div>
    </Link>
  );
}
