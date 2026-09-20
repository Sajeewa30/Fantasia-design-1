"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, businesses } from "@/data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled || open
            ? "bg-paper/85 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Link href="/" aria-label="Fantasia Group — home" className="relative flex items-center">
            <Image
              src="/brand/logo.png"
              alt="Fantasia"
              width={152}
              height={58}
              priority
              className="h-8 w-auto lg:h-9"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative text-[0.95rem] font-medium transition-colors hover:text-ink ${
                    active ? "text-ink" : "text-ink-muted"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[1.5px] w-full bg-brand transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100 ${
                      active ? "origin-left scale-x-100" : "origin-right scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn btn-primary hidden h-11! px-5! text-sm lg:inline-flex">
              Talk to our team
              <span className="arrow" aria-hidden>
                →
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-paper-2 lg:hidden"
            >
              <span
                className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-[3.5px]"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-[3.5px]"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-paper lg:hidden"
          >
            <div className="container-x flex min-h-full flex-col py-8">
              <nav aria-label="Mobile" className="flex flex-col">
                {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-center justify-between border-b border-line py-5 text-[2rem] text-ink"
                    >
                      {item.label}
                      <span className="text-brand" aria-hidden>
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8">
                <p className="eyebrow mb-4">Business areas</p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {businesses.map((b) => (
                    <li key={b.slug}>
                      <Link href={b.href} onClick={() => setOpen(false)} className="text-ink-muted hover:text-ink">
                        {b.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-10">
                <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full justify-center">
                  Talk to our team <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
