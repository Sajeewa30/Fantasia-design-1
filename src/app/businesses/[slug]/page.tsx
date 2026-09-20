import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { divisions, getDivision } from "@/data/divisions";
import DivisionPage from "@/components/DivisionPage";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return divisions.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const d = getDivision(slug);
  if (!d) return {};
  return {
    title: d.name,
    description: d.metaDescription,
    openGraph: { title: d.name, description: d.metaDescription, images: [{ url: d.hero.image }] },
  };
}

export default async function BusinessDetailPage({ params }: Params) {
  const { slug } = await params;
  const division = getDivision(slug);
  if (!division) notFound();
  return <DivisionPage division={division} />;
}
