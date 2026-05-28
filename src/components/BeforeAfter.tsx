import { useRef, useState, useCallback } from "react";

export function BeforeAfter({ image, alt }: { image: string; alt: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl select-none cursor-ew-resize ring-1 ring-charcoal/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)]"
      onMouseDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
      }}
      onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => updateFromClientX(e.touches[0].clientX)}
      onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
    >
      {/* AFTER (full, right side reference) */}
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "right center", clipPath: "inset(0 0 0 50%)" }}
      />
      {/* BEFORE clipped by position */}
      <img
        src={image}
        alt=""
        loading="lazy"
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: "left center",
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      />

      <span className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.25em] uppercase bg-charcoal/80 text-white px-3 py-1.5 rounded-full backdrop-blur">
        Before
      </span>
      <span className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.25em] uppercase bg-gradient-brand text-white px-3 py-1.5 rounded-full">
        After
      </span>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_20px_rgba(0,0,0,0.4)] pointer-events-none"
        style={{ left: `${pos}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white grid place-items-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="flex gap-1">
          <span className="w-1 h-4 bg-magenta rounded-full" />
          <span className="w-1 h-4 bg-orange rounded-full" />
        </div>
      </div>
    </div>
  );
}
