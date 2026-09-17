"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { sustainability } from "@/data/site";
import Reveal from "./Reveal";

export default function Sustainability() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.6"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const sunY = useTransform(scrollYProgress, [0, 1], [70, 0]);

  return (
    <section id="sustainability" ref={ref} className="container-x py-24 lg:py-36">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-7">
          <Reveal>
            <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] ring-1 ring-black/5">
              <Image
                src="/images/solar.jpg"
                alt="Factory roof covered with solar panels at golden hour"
                fill
                sizes="(min-width: 1024px) 55vw, 90vw"
                className="object-cover"
              />
              {/* Sun arc drawn on scroll */}
              <svg viewBox="0 0 400 200" className="absolute inset-x-0 top-0 h-auto w-full" aria-hidden>
                <motion.path
                  d="M 40 190 A 160 160 0 0 1 360 190"
                  fill="none"
                  stroke="#fff"
                  strokeOpacity="0.9"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  style={{ pathLength }}
                />
                <motion.circle cx="200" cy="30" r="14" fill="#F4B860" style={{ y: sunY }} />
              </svg>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-paper px-6 py-5 shadow-[0_30px_60px_-30px_rgba(26,18,22,0.35)] ring-1 ring-black/5 lg:-right-8 lg:left-auto lg:bottom-10">
              <p className="display text-[3rem] leading-none text-solar lg:text-[3.6rem]">1.5 MW</p>
              <p className="mt-2 text-sm text-ink-muted">installed solar capacity</p>
            </div>
          </Reveal>
        </div>
        <div className="pt-8 lg:col-span-4 lg:col-start-9 lg:pt-0">
          <Reveal>
            <p className="eyebrow mb-5">Sustainability</p>
            <h2 className="display text-[2.4rem] leading-[1.02] text-ink sm:text-[3rem]">{sustainability.headline}</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">{sustainability.body}</p>
            <Link href={sustainability.cta.href} className="btn btn-ghost mt-8">
              {sustainability.cta.label} <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
