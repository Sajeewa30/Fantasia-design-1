import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-start justify-center pt-24">
      <p className="eyebrow mb-5">404</p>
      <h1 className="display max-w-2xl text-[2.6rem] leading-[1.02] sm:text-[3.6rem]">
        This page did not make it through production.
      </h1>
      <p className="mt-6 max-w-md text-lg opacity-80">Let us get you back to the materials that matter.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Return home
      </Link>
    </section>
  );
}
