import Link from "next/link";
import { site } from "@/data/site";
import Pending from "./Pending";
import Reveal from "./Reveal";

/** Privacy, terms and cookies share one layout until the approved wording arrives. */
export default function LegalPage({ title, description, pending }: { title: string; description: string; pending: string }) {
  return (
    <section className="container-x pt-28 pb-24 lg:pt-36 lg:pb-36">
      <Reveal className="max-w-3xl">
        <p className="eyebrow mb-6">Legal</p>
        <h1 className="display text-[2.7rem] leading-[1.02] text-ink sm:text-[3.6rem] lg:text-[4.2rem]">{title}</h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">{description}</p>
      </Reveal>
      <Reveal delay={0.1} className="mt-12 max-w-3xl">
        <div className="rounded-[1.6rem] bg-paper-2 p-8 ring-1 ring-black/5 lg:p-10">
          <p className="display text-[1.6rem] leading-[1.2] text-ink">
            The approved wording for this page is being finalised and will be published before the website goes live.
          </p>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-ink-muted">
            Until then, questions about how Fantasia Group handles your information can be sent to{" "}
            <a href={`mailto:${site.email}`} className="link-draw">
              {site.email}
            </a>
            .
          </p>
          <Pending items={[pending]} className="mt-8" />
        </div>
        <Link href="/" className="btn btn-ghost mt-10">
          Return home
        </Link>
      </Reveal>
    </section>
  );
}
