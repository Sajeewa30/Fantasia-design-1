"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { story } from "@/data/site";
import Reveal from "./Reveal";

/* Each word brightens as the reader scrolls through the statement. */
function ScrollWords({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="display text-[2.2rem] leading-[1.08] text-ink sm:text-[2.9rem] lg:text-[3.8rem]">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="story" ref={ref} className="relative overflow-hidden bg-brand-tint py-24 lg:py-40">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-8">Behind the finished item</p>
          <ScrollWords text={story.headline} />
          <Reveal delay={0.1} as="p" className="mt-9 max-w-xl text-lg leading-relaxed text-ink-muted">
            {story.body}
          </Reveal>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-black/5">
              <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
                <Image
                  src="/images/garment.jpg"
                  alt="Folded activewear with a jacquard elastic waistband"
                  fill
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
