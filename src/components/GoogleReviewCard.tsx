import { Star } from "lucide-react";

function GoogleG({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 16.1 4 9.3 8.6 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.2 39.4 16 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C40.9 35.7 44 30.3 44 24c0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  );
}

export function GoogleReviewCard({
  name,
  meta,
  text,
  avatar,
  initials,
  daysAgo,
}: {
  name: string;
  meta: string;
  text: string;
  avatar?: string;
  initials?: string;
  daysAgo: string;
}) {
  return (
    <figure className="bg-white p-7 rounded-3xl ring-1 ring-charcoal/10 flex flex-col h-full hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.2)] transition-all">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img src={avatar} alt={name} className="w-11 h-11 rounded-full object-cover" />
          ) : (
            <div className="w-11 h-11 rounded-full bg-gradient-brand text-white grid place-items-center font-heading font-bold text-sm">
              {initials ?? name.slice(0, 1)}
            </div>
          )}
          <div>
            <div className="font-bold text-sm leading-tight">{name}</div>
            <div className="text-[11px] text-charcoal/50 mt-0.5">{meta}</div>
          </div>
        </div>
        <GoogleG className="w-5 h-5 shrink-0" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} className="w-4 h-4 fill-yellow text-yellow" />
          ))}
        </div>
        <span className="text-[11px] text-charcoal/40">{daysAgo}</span>
      </div>

      <blockquote className="text-charcoal/80 leading-relaxed text-[15px] flex-1">
        {text}
      </blockquote>

      <div className="mt-5 pt-4 border-t border-charcoal/5 flex items-center gap-2 text-[11px] text-charcoal/50">
        <GoogleG className="w-3.5 h-3.5" />
        <span>Posted on Google</span>
      </div>
    </figure>
  );
}
