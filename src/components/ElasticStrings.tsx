"use client";

import { useEffect, useRef } from "react";

/**
 * A field of horizontal "elastic strings" drawn on a canvas.
 * They wobble gently at rest; moving the cursor across them plucks the
 * strings, which spring back with a damped oscillation — like a stretched
 * elastic band being released. Ported from the "Material Lab" concept and
 * re-coloured for paper.
 */
export default function ElasticStrings({
  className = "",
  color = "159, 56, 138", // brand magenta, as "r, g, b"
  baseAlpha = 0.18,
  spacing = 56,
}: {
  className?: string;
  color?: string;
  baseAlpha?: number;
  spacing?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const POINTS = 72;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let strings: { y: number; d: Float32Array; v: Float32Array }[] = [];
    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999, active: false };
    let raf = 0;
    let t = 0;
    let visible = true;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(6, Math.round(height / spacing));
      strings = Array.from({ length: count }, (_, i) => ({
        y: ((i + 0.5) / count) * height,
        d: new Float32Array(POINTS),
        v: new Float32Array(POINTS),
      }));
      draw();
    };

    const step = () => {
      t += 0.016;
      const k = 0.045; // spring stiffness
      const damp = 0.92; // velocity damping
      const couple = 0.28; // neighbour coupling (wave propagation)
      const radius = 110;

      for (const s of strings) {
        const { d, v } = s;
        if (mouse.active) {
          const dy = mouse.y - s.y;
          if (Math.abs(dy) < radius) {
            const speed = Math.min(40, Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py));
            for (let i = 0; i < POINTS; i++) {
              const x = (i / (POINTS - 1)) * width;
              const dist = Math.hypot(x - mouse.x, dy);
              if (dist < radius) {
                const f = (1 - dist / radius) ** 2;
                v[i] += Math.sign(dy) * f * (0.6 + speed * 0.08);
              }
            }
          }
        }
        for (let i = 0; i < POINTS; i++) {
          const left = d[i - 1] ?? 0;
          const right = d[i + 1] ?? 0;
          const a = -k * d[i] + couple * (left + right - 2 * d[i]);
          v[i] = (v[i] + a) * damp;
        }
        for (let i = 0; i < POINTS; i++) d[i] += v[i];
      }
      mouse.px = mouse.x;
      mouse.py = mouse.y;

      draw();
      raf = visible ? requestAnimationFrame(step) : 0;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1.25;
      for (let si = 0; si < strings.length; si++) {
        const s = strings[si];
        let energy = 0;
        for (let i = 0; i < POINTS; i++) energy += Math.abs(s.d[i]);
        energy = Math.min(1, energy / 260);
        const idle = reduce ? 0 : Math.sin(t * 0.6 + si * 0.7) * 2.5;
        ctx.beginPath();
        for (let i = 0; i < POINTS; i++) {
          const x = (i / (POINTS - 1)) * width;
          const y = s.y + s.d[i] + idle * Math.sin((i / POINTS) * Math.PI);
          if (i === 0) ctx.moveTo(x, y);
          else {
            const px = ((i - 1) / (POINTS - 1)) * width;
            const py = s.y + s.d[i - 1] + idle * Math.sin(((i - 1) / POINTS) * Math.PI);
            ctx.quadraticCurveTo(px, py, (px + x) / 2, (py + y) / 2);
          }
        }
        const alpha = baseAlpha + energy * (0.95 - baseAlpha);
        ctx.strokeStyle = `rgba(${color}, ${alpha.toFixed(3)})`;
        ctx.stroke();
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = mouse.y = -9999;
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    /* Only animate while the section is on screen — keeps scrolling smooth elsewhere. */
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !reduce) raf = requestAnimationFrame(step);
    });
    io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    if (!reduce) raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [color, baseAlpha, spacing]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
