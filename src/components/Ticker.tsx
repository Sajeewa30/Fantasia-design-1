import { materialsTicker } from "@/data/site";

export default function Ticker() {
  const items = [...materialsTicker, ...materialsTicker];
  return (
    <div className="marquee overflow-hidden border-y border-line py-4" aria-label="Materials we manufacture and supply">
      <div className="marquee-track">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 text-[0.95rem] font-medium text-ink-muted">
            {m}
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
