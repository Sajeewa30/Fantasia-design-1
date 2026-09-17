"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";

/**
 * A full-width "elastic band". Hovering over it pulls the line towards the
 * cursor; leaving lets it spring back — a small nod to what Fantasia makes.
 */
export default function ElasticLine() {
  const ref = useRef<HTMLDivElement>(null);
  const [hint, setHint] = useState(true);
  const cx = useMotionValue(600);
  const cy = useMotionValue(60);
  const sx = useSpring(cx, { stiffness: 120, damping: 9, mass: 0.6 });
  const sy = useSpring(cy, { stiffness: 120, damping: 9, mass: 0.6 });
  const d = useMotionTemplate`M 0 60 Q ${sx} ${sy} 1200 60`;

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width) * 1200;
    const y = 60 + ((e.clientY - r.top) / r.height - 0.5) * 180;
    cx.set(x);
    cy.set(y);
    setHint(false);
  };
  const onLeave = () => {
    cy.set(60);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mt-16 h-[120px] w-full cursor-crosshair lg:mt-20"
      aria-hidden
    >
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <motion.path d={d} fill="none" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinecap="round" />
        <motion.path
          d={d}
          fill="none"
          stroke="var(--color-brand)"
          strokeOpacity="0.25"
          strokeWidth="14"
          strokeLinecap="round"
          style={{ filter: "blur(8px)" }}
        />
      </svg>
      <span
        className={`absolute right-5 top-1/2 -translate-y-1/2 font-mono text-[0.68rem] tracking-[0.18em] text-ink-dim uppercase transition-opacity duration-700 sm:right-8 lg:right-14 ${
          hint ? "opacity-100" : "opacity-0"
        }`}
      >
        stretch me
      </span>
    </div>
  );
}
