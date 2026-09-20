import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { businesses } from "@/data/site";
import { about } from "@/data/pages";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Pending from "@/components/Pending";
import Reveal from "@/components/Reveal";
import FinalCta from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "About",
  description: about.body,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        headline={about.headline}
        body={about.body}
        primary={{ label: "Explore our businesses", href: "/businesses" }}
        secondary={{ label: "Talk to our team", href: "/contact" }}
        image="/images/about-factory.jpg"
        imageAlt="Elastic knitting machines producing cream and magenta tapes in a daylit factory"
        caption="Fantasia Narrow Fabrics — BOI-approved facility, Sri Lanka"
      />

      {/* Our story */}
      <section className="border-t border-line py-24 lg:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper-3 ring-1 ring-black/5">
                  <Image
                    src="/images/hero-elastics.jpg"
                    alt="Rolls of knitted and woven elastic tape in rose, charcoal, and cream"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow={about.story.eyebrow} headline={about.story.headline} />
            <div className="mt-10">
              {about.story.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08} as="p" className="mb-6 text-lg leading-relaxed text-ink-muted">
                  {p}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-line bg-paper-2 py-24 lg:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={about.whatWeDo.eyebrow} headline={about.whatWeDo.headline} />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {about.whatWeDo.items.map((it, i) => (
              <Reveal as="li" key={it.title} delay={i * 0.08} className="bg-paper px-7 py-9 lg:px-8 lg:py-10">
                <span className="font-mono text-[0.72rem] tracking-[0.18em] text-brand-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-6 text-[1.8rem] leading-none text-ink sm:text-[2rem]">{it.title}</h3>
                <p className="mt-4 text-[1rem] leading-relaxed text-ink-muted">{it.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Purpose */}
      <section className="bg-brand-tint py-24 lg:py-40">
        <div className="container-x">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-8">{about.purpose.eyebrow}</p>
            <p className="display text-[2.2rem] leading-[1.06] text-ink sm:text-[3rem] lg:text-[3.8rem]">{about.purpose.statement}</p>
          </Reveal>
        </div>
      </section>

      {/* Leadership message */}
      <section className="border-t border-line py-24 lg:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-5">{about.leadershipMessage.eyebrow}</p>
              <span className="display block text-[6rem] leading-[0.6] text-brand-tint-2" aria-hidden>
                “
              </span>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {about.leadershipMessage.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 + i * 0.08} as="p" className="display mb-7 text-[1.5rem] leading-[1.3] text-ink sm:text-[1.8rem]">
                {p}
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-dim">Name and title to be confirmed</p>
              <Pending items={about.leadershipMessage.pending} className="mt-8 max-w-lg" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-t border-line bg-paper-2 py-24 lg:py-36">
        <div className="container-x">
          <SectionHeading
            eyebrow={about.journey.eyebrow}
            headline={about.journey.headline}
            body="The timeline is laid out and waiting for the confirmed years and details from Fantasia."
          />
          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6 lg:gap-6">
            <span aria-hidden className="absolute left-0 right-0 top-[0.95rem] hidden h-px bg-line lg:block" />
            {about.journey.milestones.map((m, i) => (
              <Reveal as="li" key={m.label} delay={i * 0.07} className="relative">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-paper ring-1 ring-line">
                  <span className="h-2 w-2 rounded-full bg-brand" />
                </span>
                <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-dim">Year TBC</p>
                <h3 className="display mt-2 text-[1.6rem] leading-none text-ink">{m.label}</h3>
                <p className="mt-3 text-[0.92rem] leading-snug text-ink-dim italic">{m.pending}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership */}
      <section className="border-t border-line py-24 lg:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={about.leadership.eyebrow} headline={about.leadership.headline} body={about.leadership.intro} />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {Array.from({ length: about.leadership.placeholders }).map((_, i) => (
              <Reveal as="li" key={i} delay={i * 0.08} className="overflow-hidden rounded-[1.6rem] bg-paper-2 ring-1 ring-black/5">
                <div className="relative flex aspect-[4/4.4] items-end justify-center overflow-hidden bg-paper-3">
                  <svg viewBox="0 0 200 220" className="h-[85%] w-auto text-line" aria-hidden>
                    <circle cx="100" cy="78" r="46" fill="currentColor" />
                    <path d="M20 220c0-52 36-84 80-84s80 32 80 84" fill="currentColor" />
                  </svg>
                </div>
                <div className="p-6">
                  <p className="display text-[1.4rem] leading-none text-ink">Name to be confirmed</p>
                  <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-dim">Title</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Pending items={about.leadership.pending} className="mt-8 max-w-lg" />
        </div>
      </section>

      {/* Group structure */}
      <section className="border-t border-line bg-paper-2 py-24 lg:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={about.structure.eyebrow} headline={about.structure.headline} body={about.structure.body} />
            <Pending items={about.structure.pending} className="mt-8 max-w-md" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal className="rounded-[2rem] bg-paper p-6 ring-1 ring-black/5 sm:p-8">
              <p className="display text-[2rem] text-ink">
                fantasia<span className="text-brand">.</span>
              </p>
              <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-dim">Master brand</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {businesses.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={b.href}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-line px-5 py-4 transition-colors hover:border-brand hover:bg-brand-tint"
                    >
                      <span>
                        <span className="block font-mono text-[0.68rem] tracking-[0.18em] text-brand-deep">{b.index}</span>
                        <span className="mt-1 block font-semibold text-ink">{b.name}</span>
                      </span>
                      <span className="text-brand transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
