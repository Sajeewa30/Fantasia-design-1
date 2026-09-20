import Reveal from "./Reveal";

/** Eyebrow + display headline + optional body, used at the top of inner-page sections. */
export default function SectionHeading({
  eyebrow,
  headline,
  body,
  size = "md",
  align = "left",
  className = "",
}: {
  eyebrow: string;
  headline: string;
  body?: string;
  size?: "md" | "lg";
  align?: "left" | "center";
  className?: string;
}) {
  const h =
    size === "lg"
      ? "text-[2.6rem] sm:text-[3.4rem] lg:text-[4.2rem]"
      : "text-[2.2rem] sm:text-[2.8rem] lg:text-[3.4rem]";
  return (
    <Reveal className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h2 className={`display leading-[1.02] text-ink ${h}`}>{headline}</h2>
      {body && <p className={`mt-6 max-w-xl text-lg leading-relaxed text-ink-muted ${align === "center" ? "mx-auto" : ""}`}>{body}</p>}
    </Reveal>
  );
}
