"use client";

import Link from "next/link";
import { useEffect } from "react";
import { BsArrowClockwise, BsArrowLeft } from "react-icons/bs";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex items-center pt-32 md:pt-40">
      <div className="container relative">
        <span className="ghost-num right-[-4rem] top-[-4rem]">500</span>
        <p className="eyebrow eyebrow--acid">Error · 500</p>
        <h1
          className="mt-6 font-serif text-bone leading-[0.94]"
          style={{ fontSize: "clamp(3rem, 12vw, 10rem)", letterSpacing: "-0.045em" }}
        >
          Something <em className="italic-wonk text-acid">broke</em>.
        </h1>
        <p className="mt-6 max-w-measure text-lede text-pearl">
          An unexpected error occurred while rendering this page. It&rsquo;s been logged. Try again, or head back home.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-xs text-ash">Digest: {error.digest}</p>
        )}
        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-primary" data-cursor="hover">
            <BsArrowClockwise /> Try again
          </button>
          <Link href="/" className="btn btn-hair" data-cursor="hover">
            <BsArrowLeft /> Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
