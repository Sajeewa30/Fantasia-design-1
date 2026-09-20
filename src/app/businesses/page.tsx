import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { businesses, enquirySteps } from "@/data/site";
import { businessesPage } from "@/data/pages";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Steps from "@/components/Steps";
import Reveal from "@/components/Reveal";
import FinalCta from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Our Businesses",
  description: businessesPage.body,
};

export default function BusinessesPage() {
  return (
    <>
      <PageHero eyebrow={businessesPage.eyebrow} headline={businessesPage.headline} body={businessesPage.body} />

      <section className="container-x pb-24 lg:pb-36">
        <ul className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {businesses.map((b, i) => (
            <Reveal as="li" key={b.slug} delay={i * 0.08}>
              <Link
                href={b.href}
                className="lift group block overflow-hidden rounded-[2rem] bg-paper-2 ring-1 ring-black/5"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={b.image}
                    alt={b.imageAlt}
                    fill
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-paper/90 px-4 py-2 font-mono text-[0.7rem] tracking-[0.18em] text-brand-deep backdrop-blur">
                    {b.index} / 04
                  </span>
                </div>
                <div className="flex items-start justify-between gap-6 p-7 lg:p-9">
                  <div>
                    <h2 className="display text-[1.9rem] leading-none text-ink transition-colors group-hover:text-brand-deep sm:text-[2.3rem]">
                      {b.name}
                    </h2>
                    <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink-muted">{b.audience}</p>
                    <span className="link-draw mt-6">
                      {b.cta} <span aria-hidden>→</span>
                    </span>
                  </div>
                  <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <span className="transition-transform duration-500 group-hover:-rotate-45" aria-hidden>
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-paper-2 py-24 lg:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={businessesPage.steps.eyebrow} headline={businessesPage.steps.headline} />
          <div className="mt-14 lg:mt-20">
            <Steps items={enquirySteps} />
          </div>
        </div>
      </section>

      <FinalCta
        eyebrow="Not sure where to start?"
        headline={businessesPage.finalCta.headline}
        body={businessesPage.finalCta.body}
        cta={businessesPage.finalCta.cta}
      />
    </>
  );
}
