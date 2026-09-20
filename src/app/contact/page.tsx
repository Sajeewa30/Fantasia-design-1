import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { site, businesses } from "@/data/site";
import { contactPage as page } from "@/data/pages";
import PageHero from "@/components/PageHero";
import Pending from "@/components/Pending";
import Reveal from "@/components/Reveal";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: page.body,
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} headline={page.headline} body={page.body} />

      <section className="border-t border-line bg-paper-2 py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-4">Enquiry form</p>
              <h2 className="display mb-8 text-[2.2rem] leading-[1.02] text-ink sm:text-[2.8rem]">{page.form.headline}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Suspense fallback={<div className="min-h-[40rem] rounded-[1.6rem] bg-paper ring-1 ring-black/5" />}>
                <ContactForm />
              </Suspense>
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] ring-1 ring-black/5">
                  <Image
                    src="/images/contact-desk.jpg"
                    alt="Elastic swatches, yarn cones, polymer pellets and a notebook on a desk"
                    fill
                    sizes="(min-width: 1024px) 30vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="eyebrow mb-5 mt-10">{page.details.eyebrow}</p>
                <dl className="space-y-4 text-[0.98rem]">
                  <div>
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-dim">Email</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${site.email}`} className="font-semibold text-ink hover:text-brand-deep">
                        {site.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-dim">Telephone</dt>
                    <dd className="mt-1">
                      <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-semibold text-ink hover:text-brand-deep">
                        {site.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-dim">Head office</dt>
                    <dd className="mt-1 text-ink-muted">{site.address}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-dim">Business hours</dt>
                    <dd className="mt-1 italic text-ink-dim">To be confirmed</dd>
                  </div>
                </dl>
                <Pending items={page.details.pending} className="mt-8" />
              </Reveal>
              <Reveal delay={0.15}>
                <p className="eyebrow mb-4 mt-10">Business areas</p>
                <ul className="divide-y divide-line border-y border-line">
                  {businesses.map((b) => (
                    <li key={b.slug}>
                      <Link href={b.href} className="group flex items-center justify-between py-3 text-[0.98rem] text-ink-muted transition-colors hover:text-brand-deep">
                        <span>
                          <span className="mr-3 font-mono text-[0.68rem] tracking-[0.18em] text-brand-deep">{b.index}</span>
                          {b.name}
                        </span>
                        <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
