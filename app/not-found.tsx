import Link from "next/link";

export const metadata = {
  title: "404 - Not found",
  description:
    "The page you were looking for doesn't exist. Head back home or browse the projects index.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="ruled flex min-h-[75vh] items-center py-12 sm:py-16 md:py-24">
      <div className="shell relative z-[1]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 border border-accent-line bg-accent-soft px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-tag uppercase tracking-[0.14em] text-accent-ink">
              Page Not Found · 404
            </span>
          </div>

          <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[0.92] tracking-[-0.042em] text-ink">
            Not found<span className="text-accent">.</span>
          </h1>

          <p className="measure mt-6 text-base leading-relaxed text-ink-2 sm:text-lede">
            This page doesn&rsquo;t exist - it might have been moved, renamed, or
            never existed at all. Head back to the index or explore the portfolio.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/" className="btn btn-solid w-full sm:w-auto">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Back home</span>
            </Link>

            <Link href="/projects" className="btn btn-outline w-full sm:w-auto">
              <span>Browse projects</span>
            </Link>

            <Link href="/contact" className="btn btn-quiet w-full sm:w-auto">
              <span>Report a broken link →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
