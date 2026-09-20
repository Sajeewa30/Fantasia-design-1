/**
 * Content the client still has to supply. Rendered on purpose during review so
 * every [REQUEST INFORMATION] item from the copy document is visible in place.
 * Remove or leave empty once the information arrives.
 */
export default function Pending({
  items,
  title = "Awaiting information from Fantasia",
  className = "",
}: {
  items: string[];
  title?: string;
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <aside className={`pending px-6 py-5 ${className}`} aria-label={title}>
      <p className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-brand-deep">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
        {title}
      </p>
      <ul className="mt-3 space-y-1.5 text-[0.92rem] leading-snug text-brand-ink">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5">
            <span className="mt-[0.55em] h-px w-3 shrink-0 bg-brand-deep/60" aria-hidden />
            {it}
          </li>
        ))}
      </ul>
    </aside>
  );
}
