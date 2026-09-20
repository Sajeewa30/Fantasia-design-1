"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Fragment, type ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/* Word-by-word headline reveal shared by every inner page. The last word is italic brand colour. */
export function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <h1 className={`display text-ink ${className}`}>
      {words.map((w, i) => {
        const last = i === words.length - 1;
        return (
          <Fragment key={i}>
            {/* The mask is padded so descenders (g, y, p) are not clipped; the negative margins keep line spacing unchanged. */}
            <span className="-mb-[0.24em] -mt-[0.06em] inline-block overflow-hidden pb-[0.24em] pt-[0.06em] align-top">
              <motion.span
                className={`inline-block ${last ? "text-brand italic" : ""}`}
                initial={{ y: "135%", rotate: 3 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.05, ease }}
              >
                {w}
              </motion.span>
            </span>
            {last ? "" : " "}
          </Fragment>
        );
      })}
    </h1>
  );
}

type Cta = { label: string; href: string };

/**
 * Top of every inner page: eyebrow, animated headline, body copy, buttons and
 * an optional photograph. Mirrors the home hero's rhythm without repeating it.
 */
export default function PageHero({
  eyebrow,
  headline,
  body,
  primary,
  secondary,
  image,
  imageAlt,
  caption,
  children,
}: {
  eyebrow: string;
  headline: string;
  body?: string | string[];
  primary?: Cta;
  secondary?: Cta;
  image?: string;
  imageAlt?: string;
  caption?: ReactNode;
  children?: ReactNode;
}) {
  const paragraphs = Array.isArray(body) ? body : body ? [body] : [];
  const withImage = Boolean(image);

  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #f3e6ef, transparent 70%)" }}
      />
      <div className={`container-x grid gap-14 pb-16 lg:pb-24 ${withImage ? "items-center lg:grid-cols-12 lg:gap-8" : ""}`}>
        <div className={withImage ? "lg:col-span-7" : "max-w-3xl"}>
          <motion.p
            className="eyebrow mb-6 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="h-px w-8 bg-brand" aria-hidden />
            {eyebrow}
          </motion.p>
          <WordReveal
            text={headline}
            className={withImage ? "text-[2.7rem] sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.6rem]" : "text-[2.7rem] sm:text-[3.6rem] lg:text-[4.6rem] xl:text-[5.2rem]"}
          />
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted lg:text-[1.2rem]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 + i * 0.1, ease }}
            >
              {p}
            </motion.p>
          ))}
          {(primary || secondary) && (
            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8, ease }}
            >
              {primary && (
                <Link href={primary.href} className="btn btn-primary">
                  {primary.label} <span className="arrow">→</span>
                </Link>
              )}
              {secondary && (
                <Link href={secondary.href} className="btn btn-ghost">
                  {secondary.label}
                </Link>
              )}
            </motion.div>
          )}
          {children}
        </div>

        {withImage && (
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 40, rotate: 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease }}
          >
            <figure className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-[2rem] bg-paper-3 ring-1 ring-black/5 lg:max-w-none">
              <Image src={image!} alt={imageAlt ?? ""} fill priority sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
              {caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-5 pb-4 pt-12 text-sm text-white">
                  {caption}
                </figcaption>
              )}
            </figure>
          </motion.div>
        )}
      </div>
    </section>
  );
}
