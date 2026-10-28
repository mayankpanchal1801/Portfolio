"use client";

import Magnetic from "@/components/primitives/Magnetic";
import Reveal from "@/components/primitives/Reveal";
import { contact } from "@/constants/personal";
import Link from "next/link";
import { useState } from "react";

type Props = { index?: string; headingId?: string };

export default function ContactCta({ index = "05", headingId = "cta-heading" }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section id="contact" className="band shell" aria-labelledby={headingId}>
      <div className="relative overflow-hidden rounded-[28px] border border-rule-strong bg-paper-2 px-6 py-16 sm:px-12 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--c-glow), transparent 65%)" }}
        />

        <p className="tag tag--accent relative flex items-center gap-4">
          <span className="tabular-nums">{index}</span>
          <span aria-hidden className="h-px w-12 bg-accent-line" />
          Contact
        </p>

        <Reveal
          as="h2"
          id={headingId}
          mode="words"
          className="relative mt-8 font-display text-mark font-normal"
        >
          Let&rsquo;s build
          <br />
          <span className="text-signal">something</span> sharp.
        </Reveal>

        <div className="relative mt-12 flex flex-wrap items-center gap-4">
          <Magnetic>
            <Link href="/contact" className="btn btn-solid" data-cursor="Write">
              Start a conversation →
            </Link>
          </Magnetic>
          <button
            type="button"
            onClick={copy}
            className="btn btn-outline normal-case tracking-normal"
            aria-live="polite"
          >
            {copied ? "Copied to clipboard ✓" : `${contact.email} ⧉`}
          </button>
        </div>
      </div>
    </section>
  );
}
