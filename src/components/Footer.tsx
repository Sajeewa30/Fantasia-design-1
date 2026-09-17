import Link from "next/link";
import { site, footer } from "@/data/site";

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="eyebrow mb-5">{title}</p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[0.95rem] text-ink-muted transition-colors hover:text-brand-deep">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper-2">
      <div className="container-x pt-16 pb-10 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="display text-[2rem] text-ink">
              fantasia<span className="text-brand">.</span>
            </p>
            <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-ink-muted">{site.brandLine}</p>
            <div className="mt-8 space-y-1 text-[0.9rem] text-ink-muted">
              <p className="font-semibold text-ink">{site.name}</p>
              <p>{site.address}</p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:text-brand-deep">
                  {site.email}
                </a>
              </p>
              <p>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-brand-deep">
                  {site.phone}
                </a>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3 lg:pl-12">
            <Column title="Company" links={footer.main} />
            <Column title="Businesses" links={footer.businesses} />
            <Column title="Legal" links={footer.legal} />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-[0.8rem] text-ink-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {site.year} {site.name}. All rights reserved.
          </p>
          <p>Elastics · Yarn · Polymer · CHEMX</p>
        </div>
      </div>

      {/* Giant wordmark — clipped at the page edge, purely decorative */}
      <div aria-hidden className="pointer-events-none select-none">
        <p className="display -mb-[0.28em] whitespace-nowrap text-center text-[22vw] leading-none text-brand-tint-2 italic">
          fantasia
        </p>
      </div>
    </footer>
  );
}
