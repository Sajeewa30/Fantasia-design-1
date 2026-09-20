import type { MetadataRoute } from "next";
import { divisions } from "@/data/divisions";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fantasia.lk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/about", "/businesses", "/sustainability", "/contact", "/privacy", "/terms", "/cookies"];
  return [
    ...routes.map((r) => ({ url: `${base}${r}`, lastModified: now, priority: r === "" ? 1 : 0.7 })),
    ...divisions.map((d) => ({ url: `${base}/businesses/${d.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
