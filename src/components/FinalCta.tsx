import Link from "next/link";
import { finalCta, site } from "@/data/site";
import Reveal from "./Reveal";

export default function FinalCta() {
  return (
    <section id="enquiry" className="thread-bg border-t border-line">
      <div className="container-x py-24 text-center lg:py-40">
        <Reveal>
          <p className="eyebrow mb-6">Start here</p>
          <h2 className="display mx-auto max-w-3xl text-[3rem] leading-[0.98] text-ink sm:text-[4rem] lg:text-[5.5rem]">
            {finalCta.headline}
          </h2>
          <p className="mx-auto mt-7 max-w-md text-lg text-ink-muted">{finalCta.body}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={finalCta.cta.href} className="btn btn-primary">
              {finalCta.cta.label} <span className="arrow">→</span>
            </Link>
            <a href={`mailto:${site.email}`} className="link-draw">
              or email {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
