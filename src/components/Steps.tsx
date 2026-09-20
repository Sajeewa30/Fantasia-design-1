import Reveal from "./Reveal";

/** Numbered steps laid out along a thread. */
export default function Steps({ items }: { items: string[] }) {
  return (
    <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] lg:gap-8">
      {/* the thread */}
      <span aria-hidden className="absolute left-0 right-0 top-[1.1rem] hidden h-px bg-line lg:block" />
      {items.map((step, i) => (
        <Reveal as="li" key={step} delay={i * 0.08} className="relative">
          <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-paper font-mono text-[0.72rem] tracking-[0.12em] text-brand-deep ring-1 ring-line">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-5 max-w-xs text-[1.05rem] leading-relaxed text-ink">{step}</p>
        </Reveal>
      ))}
    </ol>
  );
}
