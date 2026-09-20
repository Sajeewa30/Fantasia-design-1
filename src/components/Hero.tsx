"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { hero, businesses } from "@/data/site";
import ElasticLine from "./ElasticLine";

const ease = [0.16, 1, 0.3, 1] as const;

/* Word-by-word headline reveal. The last word is set in italic brand colour. */
function Headline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="display text-[2.85rem] text-ink sm:text-[3.6rem] lg:text-[4.6rem] xl:text-[5.2rem]">
      {words.map((w, i) => {
        const last = i === words.length - 1;
        return (
          <span key={i} className="-mb-[0.24em] -mt-[0.06em] inline-block overflow-hidden pb-[0.24em] pt-[0.06em] align-top">
            <motion.span
              className={`inline-block ${last ? "text-brand italic" : ""}`}
              initial={{ y: "135%", rotate: 3 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.15 + i * 0.06, ease }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </h1>
  );
}

/* Four material swatches that fan out on load and tilt with the cursor. */
function MaterialStack() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const poses = [
    { r: -9, x: -34, y: 26 },
    { r: -3, x: -10, y: 8 },
    { r: 3, x: 12, y: -6 },
    { r: 9, x: 36, y: -22 },
  ];

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] [perspective:1400px] lg:max-w-none"
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="absolute inset-0">
        {businesses.map((b, i) => (
          <motion.figure
            key={b.slug}
            className="absolute inset-x-[8%] inset-y-[6%] overflow-hidden rounded-[1.4rem] bg-paper-3 shadow-[0_40px_80px_-30px_rgba(26,18,22,0.45)] ring-1 ring-black/5"
            initial={{ opacity: 0, y: 80, rotate: 0, x: 0, scale: 0.9 }}
            animate={{ opacity: 1, y: poses[i].y, rotate: poses[i].r, x: poses[i].x, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.5 + i * 0.12, ease }}
            style={{ zIndex: i, translateZ: i * 30 }}
          >
            <Image
              src={b.image}
              alt={b.imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              priority={i === 3}
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/70 to-transparent px-5 pb-4 pt-12 text-white">
              <span className="font-mono text-[0.7rem] tracking-[0.18em]">{b.index}</span>
              <span className="text-sm font-semibold">{b.short}</span>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36">
      {/* soft magenta bloom, top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #f3e6ef, transparent 70%)" }}
      />
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.p
            className="eyebrow mb-6 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            {hero.eyebrow}
          </motion.p>
          <Headline text={hero.headline} />
          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted lg:text-[1.2rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
          >
            {hero.body}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
          >
            <Link href={hero.primary.href} className="btn btn-primary">
              {hero.primary.label} <span className="arrow">→</span>
            </Link>
            <Link href={hero.secondary.href} className="btn btn-ghost">
              {hero.secondary.label}
            </Link>
          </motion.div>
        </div>
        <div className="lg:col-span-5">
          <MaterialStack />
        </div>
      </div>

      <ElasticLine />
    </section>
  );
}
