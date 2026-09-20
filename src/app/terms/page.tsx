import type { Metadata } from "next";
import { legalPages } from "@/data/pages";
import LegalPage from "@/components/LegalPage";

const page = legalPages.terms;

export const metadata: Metadata = { title: page.title, description: page.description };

export default function Page() {
  return <LegalPage {...page} />;
}
