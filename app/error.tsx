"use client";

import Link from "next/link";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="ruled flex min-h-[70vh] items-center py-20">
      <div className="shell relative z-[1]">
        <p className="tag tag--accent">Error · 500</p>
        <h1 className="mt-6 font-display text-mark font-semibold text-ink">
          Something broke<span className="text-accent">.</span>
        </h1>
        <p className="measure mt-8 text-lede text-ink-2">
          An unexpected error came up while rendering this page. Try again, or
          head back home.
        </p>
        {error.digest && (
          <p className="marginal mt-4">Digest: {error.digest}</p>
        )}
        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-solid">
            Try again
          </button>
          <Link href="/" className="btn btn-outline">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
