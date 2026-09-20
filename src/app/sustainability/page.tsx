import type { Metadata } from "next";
import Image from "next/image";
import { sustainabilityPage as page } from "@/data/pages";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Pending from "@/components/Pending";
import Reveal from "@/components/Reveal";
import FinalCta from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Sustainability",
  description: page.body,
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        headline={page.headline}
        body={page.body}
        primary={page.cta}
        image="/images/solar-detail.jpg"
        imageAlt="Rows of solar panels on a factory roof at golden hour"
        caption="On-site generation across two Fantasia factories"
      />

      {/* Key facts */}
      <section className="container-x pb-24 lg:pb-36">
        <ul className="grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2">
          {page.facts.map((f, i) => (
            <Reveal as="li" key={f.label} delay={i * 0.08} className="bg-paper px-7 py-9 lg:px-10 lg:py-12">
              <p className="display text-[3.2rem] leading-none text-solar lg:text-[4.2rem]">{f.value}</p>
              <p className="mt-3 text-[1rem] text-ink-muted">{f.label}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Solar story */}
      <section id="solar-story" className="scroll-mt-24 border-t border-line bg-paper-2 py-24 lg:py-36">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] ring-1 ring-black/5">
                <Image
                  src="/images/solar.jpg"
                  alt="Factory roof covered with solar panels at golden hour"
                  fill
                  sizes="(min-width: 1024px) 50vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionHeading eyebrow={page.story.eyebrow} headline={page.story.headline} />
            <div className="mt-8">
              {page.story.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08} as="p" className="mb-6 text-lg leading-relaxed text-ink-muted">
                  {p}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project details */}
      <section className="border-t border-line py-24 lg:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow={page.details.eyebrow}
              headline={page.details.headline}
              body="These figures are being verified with Fantasia and will be published here before launch."
            />
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <dl className="divide-y divide-line rounded-[1.6rem] bg-paper-2 px-7 ring-1 ring-black/5 sm:px-9">
              {page.details.rows.map((row) => (
                <div key={row} className="grid gap-1.5 py-5 sm:grid-cols-[16rem_1fr] sm:gap-6">
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-dim sm:pt-1">{row}</dt>
                  <dd className="text-[1.02rem] italic text-ink-dim">To be confirmed</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Beyond solar */}
      <section className="border-t border-line bg-paper-2 py-24 lg:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={page.beyond.eyebrow} headline={page.beyond.headline} body={page.beyond.intro} />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="grid gap-4 sm:grid-cols-2">
              {page.beyond.pending.map((p, i) => (
                <Reveal as="li" key={p} delay={i * 0.06} className="rounded-[1.4rem] bg-paper p-6 ring-1 ring-black/5">
                  <span className="font-mono text-[0.68rem] tracking-[0.18em] text-brand-deep">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-3 text-[1rem] leading-snug text-ink">{p}</p>
                  <p className="mt-2 text-[0.85rem] italic text-ink-dim">In preparation</p>
                </Reveal>
              ))}
            </ul>
            <Pending items={[...page.beyond.pending, ...page.finalCta.pending]} className="mt-8" />
          </div>
        </div>
      </section>

      <FinalCta eyebrow="Factsheet" headline={page.finalCta.headline} body={page.finalCta.body} cta={page.finalCta.cta} />
    </>
  );
}
