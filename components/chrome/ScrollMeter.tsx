"use client";

import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

/** Hairline reading-progress bar pinned to the top of the viewport. */
export default function ScrollMeter() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.25,
      },
    });
  }, []);

  return <div ref={ref} className="scroll-meter" aria-hidden="true" />;
}
