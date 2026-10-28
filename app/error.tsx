"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.error("Runtime error caught by error boundary:", error);
  }, [error]);

  const copyError = () => {
    const details = {
      message: error?.message ?? "Unknown error",
      digest: error?.digest ?? "None",
      stack: error?.stack ?? "No stack trace available",
      url: typeof window !== "undefined" ? window.location.href : "Unknown",
      time: new Date().toISOString(),
    };

    navigator.clipboard.writeText(JSON.stringify(details, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section className="ruled flex min-h-[75vh] items-center py-12 sm:py-16 md:py-24">
      <div className="shell relative z-[1]">
        <div className="max-w-2xl">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-soft px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-tag uppercase tracking-[0.14em] text-accent-ink">
              Runtime Error · 500
            </span>
          </div>

          <h1 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-normal leading-[0.95] tracking-[-0.025em] text-ink">
            Something broke<span className="text-accent">.</span>
          </h1>

          <p className="measure mt-6 text-base leading-relaxed text-ink-2 sm:text-lede">
            An unexpected error occurred while rendering this page. The runtime
            caught the exception safely so the rest of your session remains intact.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={reset}
              className="btn btn-solid w-full sm:w-auto"
            >
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
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 21h5v-5" />
              </svg>
              <span>Try again</span>
            </button>

            <Link href="/" className="btn btn-outline w-full sm:w-auto">
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
              <span>Report issue →</span>
            </Link>
          </div>

          {/* Technical Diagnostics Card */}
          <div className="mt-10 border-t border-rule pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowDetails((v) => !v)}
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-3 hover:text-ink transition-colors"
                aria-expanded={showDetails}
              >
                <span
                  className={`inline-block transition-transform duration-200 ${
                    showDetails ? "rotate-90 text-accent" : ""
                  }`}
                >
                  ▶
                </span>
                <span>{showDetails ? "Hide technical diagnostic" : "View technical diagnostic"}</span>
              </button>

              {showDetails && (
                <button
                  type="button"
                  onClick={copyError}
                  className="font-mono text-xs text-accent-ink hover:underline cursor-pointer"
                >
                  {copied ? "✓ Copied to clipboard" : "Copy error details"}
                </button>
              )}
            </div>

            {showDetails && (
              <div className="mt-4 rounded-sm border border-rule bg-paper-2 p-4 text-xs font-mono text-ink-2 overflow-hidden">
                <div className="space-y-2">
                  <div>
                    <span className="text-ink-3">Name: </span>
                    <span className="text-ink font-normal">{error?.name ?? "Error"}</span>
                  </div>
                  <div>
                    <span className="text-ink-3">Message: </span>
                    <span className="text-accent-ink break-words">{error?.message || "No error message provided"}</span>
                  </div>
                  {error?.digest && (
                    <div>
                      <span className="text-ink-3">Digest: </span>
                      <span className="text-ink tabular-nums">{error.digest}</span>
                    </div>
                  )}
                </div>

                {error?.stack && (
                  <div className="mt-4 border-t border-rule pt-3">
                    <span className="text-ink-3 block mb-1.5">Stack Trace:</span>
                    <pre className="max-h-48 overflow-x-auto text-[0.7rem] leading-relaxed text-ink-3 whitespace-pre-wrap break-all p-2 rounded bg-paper border border-rule">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
