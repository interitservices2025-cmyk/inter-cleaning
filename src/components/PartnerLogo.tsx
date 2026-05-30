import type { LucideIcon } from "lucide-react";

export function PartnerLogo({
  name,
  tag,
  Icon,
}: {
  name: string;
  tag: string;
  Icon: LucideIcon;
}) {
  return (
    <div className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-white ring-1 ring-charcoal/10 hover:ring-magenta/40 hover:-translate-y-0.5 transition-all">
      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-charcoal to-charcoal/70 text-white grid place-items-center shrink-0 group-hover:from-magenta group-hover:to-orange transition-colors">
        <Icon className="w-5 h-5" />
      </span>
      <div className="min-w-0">
        <div className="font-heading font-bold text-sm text-charcoal leading-tight truncate">
          {name}
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mt-0.5 truncate">
          {tag}
        </div>
      </div>
    </div>
  );
}
