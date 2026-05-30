import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BeforeAfter } from "./BeforeAfter";

export type BAPair = { image: string; label: string; alt: string };

export function BeforeAfterGallery({ pairs }: { pairs: BAPair[] }) {
  const [idx, setIdx] = useState(0);
  if (pairs.length === 0) return null;
  const current = pairs[idx];
  const go = (n: number) => setIdx((idx + n + pairs.length) % pairs.length);

  return (
    <div className="space-y-5">
      <BeforeAfter image={current.image} alt={current.alt} />

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous transformation"
          className="w-11 h-11 rounded-full bg-white ring-1 ring-charcoal/10 grid place-items-center hover:bg-charcoal hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 text-center">
          <div className="font-heading text-lg font-bold">{current.label}</div>
          <div className="text-xs uppercase tracking-[0.25em] text-charcoal/50 mt-1">
            {idx + 1} / {pairs.length}
          </div>
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Next transformation"
          className="w-11 h-11 rounded-full bg-white ring-1 ring-charcoal/10 grid place-items-center hover:bg-charcoal hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-2 justify-center">
        {pairs.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setIdx(i)}
            aria-label={`Show ${p.label}`}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-8 bg-gradient-brand" : "w-4 bg-charcoal/20 hover:bg-charcoal/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
