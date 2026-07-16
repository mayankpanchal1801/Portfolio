"use client";

import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function SiteLoader() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrap = wrapRef.current;
    const num = numRef.current;
    const bar = barRef.current;
    const wordmark = wordmarkRef.current;
    const meta = metaRef.current;
    if (!wrap || !num || !bar || !wordmark || !meta) return;

    document.body.style.overflow = "hidden";

    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });

    tl.from(meta, { opacity: 0, y: 10, duration: 0.5, ease: "power2.out" })
      .to(bar, { scaleX: 1, duration: 1.5, ease: "power3.inOut" }, 0)
      .to(
        counter,
        {
          v: 100,
          duration: 1.5,
          ease: "power3.inOut",
          onUpdate: () => {
            num.textContent = String(Math.floor(counter.v)).padStart(3, "0");
          },
        },
        0,
      )
      .to([bar, num, meta], { opacity: 0, y: -10, duration: 0.4, ease: "power2.in", stagger: 0.03 }, ">")
      .to(wordmark, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.2")
      .to(wrap, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "<");
  }, []);

  return (
    <div ref={wrapRef} className="site-loader">
      <div className="w-full flex flex-col gap-8">
        {/* Wordmark */}
        <div ref={wordmarkRef} className="flex items-baseline gap-3 will-change-transform">
          <span
            className="font-serif italic-wonk text-bone leading-[0.9]"
            style={{ fontSize: "clamp(3rem, 12vw, 10rem)", letterSpacing: "-0.04em" }}
          >
            Mayank
          </span>
          <span className="font-serif text-acid" style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}>
            .
          </span>
        </div>

        {/* Meta row */}
        <div
          ref={metaRef}
          className="flex items-end justify-between w-full pt-6 border-t border-fog"
        >
          <div className="flex flex-col gap-1">
            <span className="eyebrow eyebrow--acid">Loading portfolio</span>
            <span className="font-mono text-xs text-ash">Bengaluru · India</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-40 md:w-60 h-px bg-fog overflow-hidden">
              <span
                ref={barRef}
                className="absolute inset-0 bg-acid origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <span
              ref={numRef}
              className="font-mono text-sm text-bone tabular-nums"
              aria-hidden="true"
            >
              000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
