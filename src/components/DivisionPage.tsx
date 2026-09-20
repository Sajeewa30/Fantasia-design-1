import Image from "next/image";
import type { Division, DivisionSection } from "@/data/divisions";
import PageHero from "./PageHero";
import SectionHeading from "./SectionHeading";
import Pending from "./Pending";
import Steps from "./Steps";
import Reveal from "./Reveal";
import EnquiryForm from "./EnquiryForm";
import FinalCta from "./FinalCta";

/** Splits a single long "[REQUEST INFORMATION]" sentence into spec-sheet rows. */
function specRows(pending: string[]) {
  if (pending.length === 1 && pending[0].length > 80) {
    return pending[0]
      .split(/,\s*(?:and\s+)?/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1));
  }
  return pending;
}

function Section({ s }: { s: DivisionSection }) {
  switch (s.type) {
    case "list":
      return (
        <section className="border-t border-line py-24 lg:py-36">
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow={s.eyebrow} headline={s.headline} />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="divide-y divide-line border-y border-line">
                {s.items.map((it, i) => (
                  <Reveal as="li" key={it} delay={i * 0.05} className="flex items-baseline gap-6 py-5">
                    <span className="font-mono text-[0.72rem] tracking-[0.18em] text-brand-deep">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[1.15rem] text-ink">{it}</span>
                  </Reveal>
                ))}
              </ul>
              {s.pending && <Pending items={s.pending} className="mt-8" />}
            </div>
          </div>
        </section>
      );
    case "cards":
      return (
        <section className="border-t border-line py-24 lg:py-36">
          <div className="container-x">
            <SectionHeading eyebrow={s.eyebrow} headline={s.headline} />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16">
              {s.items.map((it, i) => (
                <Reveal as="li" key={it.title} delay={i * 0.08} className="rounded-[1.6rem] bg-paper-2 p-8 ring-1 ring-black/5 lg:p-10">
                  <span className="font-mono text-[0.72rem] tracking-[0.18em] text-brand-deep">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-5 text-[1.8rem] leading-none text-ink sm:text-[2.2rem]">{it.title}</h3>
                  <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink-muted">{it.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      );
    case "steps":
      return (
        <section className="border-t border-line py-24 lg:py-36">
          <div className="container-x">
            <SectionHeading eyebrow={s.eyebrow} headline={s.headline} />
            <div className="mt-14 lg:mt-20">
              <Steps items={s.items} />
            </div>
          </div>
        </section>
      );
    case "statement":
      return (
        <section className="bg-brand-tint py-24 lg:py-36">
          <div className="container-x">
            <Reveal className="max-w-4xl">
              <p className="eyebrow mb-7">{s.eyebrow}</p>
              <p className="display text-[2.2rem] leading-[1.06] text-ink sm:text-[2.9rem] lg:text-[3.6rem]">{s.headline}</p>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">{s.body}</p>
            </Reveal>
          </div>
        </section>
      );
    case "note":
      return (
        <section className="border-t border-line py-20 lg:py-28">
          <div className="container-x">
            <Reveal className="grid gap-8 rounded-[1.6rem] bg-paper-2 p-8 ring-1 ring-black/5 lg:grid-cols-12 lg:p-12">
              <div className="lg:col-span-4">
                <p className="eyebrow mb-4">{s.eyebrow}</p>
                <h2 className="display text-[1.9rem] leading-[1.05] text-ink sm:text-[2.3rem]">{s.headline}</h2>
              </div>
              <p className="text-lg leading-relaxed text-ink-muted lg:col-span-7 lg:col-start-6">{s.body}</p>
            </Reveal>
          </div>
        </section>
      );
  }
}

export default function DivisionPage({ division: d }: { division: Division }) {
  const rows = specRows(d.specs.pending);

  return (
    <>
      <PageHero
        eyebrow={`${d.index} — ${d.name}`}
        headline={d.hero.headline}
        body={d.hero.paragraphs}
        primary={d.hero.primary}
        secondary={d.hero.secondary}
        image={d.hero.image}
        imageAlt={d.hero.imageAlt}
        caption={
          <span className="flex items-center justify-between">
            <span>{d.name}</span>
            <span className="font-mono text-[0.7rem] tracking-[0.18em]">{d.index} / 04</span>
          </span>
        }
      >
        {d.hero.secondary?.pending && <Pending items={[d.hero.secondary.pending]} className="mt-8 max-w-md" />}
      </PageHero>

      {/* Range */}
      <section className="border-t border-line bg-paper-2 py-24 lg:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={d.range.eyebrow} headline={d.range.headline} />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16">
            {d.range.items.map((it, i) => (
              <Reveal as="li" key={it.title} delay={i * 0.06} className="lift overflow-hidden rounded-[1.6rem] bg-paper ring-1 ring-black/5">
                {it.image ? (
                  <div className="relative aspect-[16/10]">
                    <Image src={it.image} alt={it.imageAlt ?? ""} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                  </div>
                ) : (
                  <div className="flex aspect-[16/5] items-end bg-paper-3 px-7 pb-4">
                    <span className="display text-[3rem] leading-none text-brand-tint-2">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                )}
                <div className="p-7 lg:p-8">
                  <h3 className="display text-[1.7rem] leading-none text-ink sm:text-[2rem]">{it.title}</h3>
                  <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-muted">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          {d.range.pending && <Pending items={d.range.pending} className="mt-8" />}
        </div>
      </section>

      {d.sections.map((s) => (
        <Section key={s.eyebrow} s={s} />
      ))}

      {/* Specifications */}
      <section className="border-t border-line py-24 lg:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow={d.specs.eyebrow}
              headline={d.specs.headline}
              body="Rows marked “to be confirmed” are being completed with the Fantasia team and will be published before launch."
            />
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <dl className="divide-y divide-line rounded-[1.6rem] bg-paper-2 px-7 ring-1 ring-black/5 sm:px-9">
              {d.specs.confirmed?.map((row) => (
                <div key={row.label} className="grid gap-1.5 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brand-deep sm:pt-1">{row.label}</dt>
                  <dd className="text-[1.02rem] text-ink">{row.value}</dd>
                </div>
              ))}
              {rows.map((row) => (
                <div key={row} className="grid gap-1.5 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-dim sm:pt-1">{row}</dt>
                  <dd className="text-[1.02rem] italic text-ink-dim">To be confirmed</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <EnquiryForm
        id="enquiry-form"
        headline={d.form.headline}
        intro={d.form.intro}
        fields={d.form.fields}
        submit={d.form.submit}
        success={d.form.success}
        source={`/businesses/${d.slug}`}
      />

      <FinalCta headline={d.finalCta.headline} body={d.finalCta.body} cta={d.finalCta.cta} eyebrow={`${d.index} — ${d.short}`} />
    </>
  );
}
