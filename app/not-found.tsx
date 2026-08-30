import Link from "next/link";

export const metadata = {
  title: "404 — Not found",
  description:
    "The page you were looking for doesn't exist. Head back home or browse the projects index.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="ruled flex min-h-[70vh] items-center py-20">
      <div className="shell relative z-[1]">
        <p className="tag tag--accent">Error · 404</p>
        <h1 className="mt-6 font-display text-mark font-semibold text-ink">
          Not found<span className="text-accent">.</span>
        </h1>
        <p className="measure mt-8 text-lede text-ink-2">
          This page doesn&rsquo;t exist — moved, renamed, or it never lived here
          at all.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-solid">
            Back home
          </Link>
          <Link href="/projects" className="btn btn-outline">
            Browse projects
          </Link>
          <Link href="/contact" className="btn btn-quiet">
            Report a broken link
          </Link>
        </div>
      </div>
    </section>
  );
}
