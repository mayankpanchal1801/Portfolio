import Link from "next/link";

export const metadata = {
  title: "404 — Not found",
  description: "The page you were looking for doesn't exist. Head back home or browse the projects index.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center pt-32 md:pt-40">
      <div className="container relative">
        <span className="ghost-num right-[-4rem] top-[-4rem]">404</span>
        <p className="eyebrow eyebrow--acid">Error · 404</p>
        <h1
          className="mt-6 font-serif text-bone leading-[0.94]"
          style={{ fontSize: "clamp(3rem, 14vw, 12rem)", letterSpacing: "-0.045em" }}
        >
          Not <em className="italic-wonk text-acid">found</em>.
        </h1>
        <p className="mt-6 max-w-measure text-lede text-pearl">
          The page you were looking for doesn&rsquo;t exist — probably moved, renamed, or never lived here at all.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary" data-cursor="hover">Back to home</Link>
          <Link href="/projects" className="btn btn-hair" data-cursor="hover">Browse projects</Link>
          <Link href="/contact" className="btn btn-hair" data-cursor="hover">Report a broken link</Link>
        </div>
      </div>
    </main>
  );
}
