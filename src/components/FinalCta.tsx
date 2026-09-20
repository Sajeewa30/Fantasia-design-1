import Link from "next/link";
import { finalCta, site } from "@/data/site";
import Reveal from "./Reveal";
import ElasticStrings from "./ElasticStrings";

/**
 * Closing call to action. The background is a field of elastic strings that
 * wobble at rest and can be plucked with the cursor — the same interaction as
 * the "Material Lab" hero, re-coloured for paper.
 */
export default function FinalCta({
  headline = finalCta.headline,
  body = finalCta.body,
  cta = finalCta.cta,
  eyebrow = "Start here",
  showEmail = true,
}: {
  headline?: string;
  body?: string;
  cta?: { label: string; href: string };
  eyebrow?: string;
  showEmail?: boolean;
}) {
  return (
    <section id="enquiry" className="relative overflow-hidden border-t border-line bg-paper">
      <ElasticStrings />
      {/* Soft paper glow behind the copy keeps the strings from crossing the words too loudly. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[52rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-paper blur-3xl"
      />
      <div className="container-x relative py-24 text-center lg:py-40">
        <Reveal>
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h2 className="display mx-auto max-w-3xl text-[3rem] leading-[0.98] text-ink sm:text-[4rem] lg:text-[5.5rem]">
            {headline}
          </h2>
          <p className="mx-auto mt-7 max-w-md text-lg text-ink-muted">{body}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={cta.href} className="btn btn-primary">
              {cta.label} <span className="arrow">→</span>
            </Link>
            {showEmail && (
              <a href={`mailto:${site.email}`} className="link-draw">
                or email {site.email}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
