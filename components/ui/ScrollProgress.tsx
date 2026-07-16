"use client";

import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }, []);
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
