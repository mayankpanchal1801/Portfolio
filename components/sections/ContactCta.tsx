"use client";

import FigureLabel from "@/components/primitives/FigureLabel";
import Magnetic from "@/components/primitives/Magnetic";
import Mark from "@/components/primitives/Mark";
import Roll from "@/components/primitives/Roll";
import { contact } from "@/constants/personal";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef, useState } from "react";

type Props = { index?: string; headingId?: string };

/** Each line slides in from its own side - the lenis.dev footer's offset stack. */
const LINES: Array<{ text: React.ReactNode; from: number; className?: string }> = [
  { text: <>Let&rsquo;s build</>, from: -18 },
  { text: <span className="lit">something</span>, from: 22, className: "pl-[8vw]" },
  { text: <>sharp.</>, from: -12, className: "text-right" },
];

export default function ContactCta({ index = "06", headingId = "cta-heading" }: Props) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        for (const line of gsap.utils.toArray<HTMLElement>("[data-line]")) {
          gsap.fromTo(
            line,
            { xPercent: Number(line.dataset.line) },
            {
              xPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                end: "center 55%",
                scrub: true,
              },
            },
          );
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

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
    <section ref={ref} id="contact" className="band shell" aria-labelledby={headingId} data-lit>
      <div className="relative isolate overflow-hidden border border-rule-strong bg-paper-2 px-6 py-16 shadow-[inset_0_1px_0_var(--c-sheen),0_44px_90px_-48px_var(--c-shadow)] sm:px-12 sm:py-24">
        <Mark preset="brackets" seed="contact-cta" accent />

        {/* The same three depths as the hero, closing the page the way it
            opened: a floor running to a horizon, and clay light above it. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="floor opacity-70" />
          <span className="orb -right-32 -top-32 h-[32rem] w-[32rem]" />
        </div>

        <FigureLabel index={index} label="contact" rule={false} className="relative" />

        <h2
          id={headingId}
          className="relative mt-10 font-display text-[clamp(3.25rem,13vw,12rem)] font-medium leading-[0.86] tracking-[-0.05em] text-ink"
        >
          {LINES.map((line, i) => (
            <span key={i} data-line={line.from} className={`block will-change-transform ${line.className ?? ""}`}>
              {line.text}
              {i < LINES.length - 1 && " "}
            </span>
          ))}
        </h2>

        <div className="relative mt-14 flex flex-wrap items-center gap-5">
          <Magnetic>
            <Link href="/contact" className="btn btn-solid" data-cursor="Write">
              <Roll>Start a conversation →</Roll>
            </Link>
          </Magnetic>
          <button
            type="button"
            onClick={copy}
            className="btn btn-outline normal-case tracking-normal"
            aria-live="polite"
          >
            <Roll>{copied ? "Copied to clipboard ✓" : `${contact.email} ⧉`}</Roll>
          </button>
        </div>
      </div>
    </section>
  );
}
