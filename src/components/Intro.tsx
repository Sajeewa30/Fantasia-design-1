"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { intro, facts } from "@/data/site";
import Reveal from "./Reveal";

function Counter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, decimals]);
  return (
    <span ref={ref}>
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Intro() {
  return (
    <section id="intro" className="container-x py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-5">Fantasia Group</p>
          <h2 className="display text-[2.4rem] leading-[1.02] text-ink sm:text-[3rem] lg:text-[3.6rem]">
            {intro.headline}
          </h2>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          {intro.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1} as="p" className="mb-6 text-lg leading-relaxed text-ink-muted">
              {p}
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <Link href="/about" className="link-draw">
              About Fantasia Group <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </div>

      <ul className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line lg:mt-28 lg:grid-cols-4">
        {facts.map((f, i) => (
          <Reveal as="li" key={f.label} delay={i * 0.08} className="bg-paper px-6 py-8 lg:px-8 lg:py-10">
            <p className="display text-[2.6rem] leading-none text-brand lg:text-[3.4rem]">
              {f.isText ? f.value : <Counter value={Number(f.value)} suffix={f.suffix} decimals={f.decimals ?? 0} />}
            </p>
            <p className="mt-3 text-[0.95rem] text-ink-muted">{f.label}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
