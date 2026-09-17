"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { businesses } from "@/data/site";
import Reveal from "./Reveal";

export default function Businesses() {
  const [active, setActive] = useState(0);
  const current = businesses[active];

  return (
    <section id="businesses" className="border-t border-line bg-paper-2 py-24 lg:py-36">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow mb-5">Our businesses</p>
            <h2 className="display max-w-2xl text-[2.4rem] leading-[1.02] text-ink sm:text-[3rem] lg:text-[3.6rem]">
              Four focused areas. One practical purpose.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-md text-lg leading-relaxed text-ink-muted">
              Choose the area that matches what you are making. Not sure? Describe the finished product and we will
              guide you.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Sticky image panel — swaps with the row under the cursor */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper-3 ring-1 ring-black/5">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={current.slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image src={current.image} alt={current.imageAlt} fill sizes="40vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute left-6 top-6 rounded-full bg-paper/90 px-4 py-2 font-mono text-[0.7rem] tracking-[0.18em] text-brand-deep backdrop-blur">
                  {current.index} / 04
                </div>
              </div>
              <p className="mt-5 text-[0.95rem] text-ink-muted">{current.audience}</p>
            </div>
          </div>

          <ul className="lg:col-span-7">
            {businesses.map((b, i) => (
              <Reveal as="li" key={b.slug} delay={i * 0.06}>
                <Link
                  href={b.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative block border-t border-line py-8 transition-colors last:border-b lg:py-10"
                >
                  <span className="absolute inset-y-0 -left-4 -right-4 -z-10 origin-left scale-x-0 rounded-2xl bg-paper transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                  <div className="grid gap-5 sm:grid-cols-[3.5rem_1fr_auto] sm:items-start">
                    <span className="font-mono text-[0.75rem] tracking-[0.18em] text-brand-deep sm:pt-3">{b.index}</span>
                    <div>
                      <h3 className="display text-[1.9rem] leading-none text-ink transition-colors group-hover:text-brand-deep sm:text-[2.3rem]">
                        {b.name}
                      </h3>
                      <p className="mt-4 max-w-lg text-[1.02rem] leading-relaxed text-ink-muted">{b.description}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {b.materials.map((m) => (
                          <li
                            key={m}
                            className="rounded-full border border-line bg-paper px-3 py-1 text-[0.78rem] font-medium text-ink-muted"
                          >
                            {m}
                          </li>
                        ))}
                      </ul>
                      {/* Mobile image */}
                      <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl lg:hidden">
                        <Image src={b.image} alt={b.imageAlt} fill sizes="90vw" className="object-cover" />
                      </div>
                    </div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper text-ink transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:border-brand group-hover:bg-brand group-hover:text-white sm:mt-1">
                      <span className="transition-transform duration-500 group-hover:-rotate-45" aria-hidden>
                        →
                      </span>
                      <span className="sr-only">{b.cta}</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
