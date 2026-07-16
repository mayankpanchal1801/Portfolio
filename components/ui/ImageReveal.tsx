"use client";

import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";

type Props = {
  src: StaticImageData | string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: boolean;
  from?: "bottom" | "top" | "left" | "right";
};

/**
 * Image with clip-path reveal + inner scale-down on scroll enter.
 * Optional gentle parallax after reveal.
 */
export default function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
  parallax = false,
  from = "bottom",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrap = wrapRef.current;
    const inner = imgRef.current;
    if (!wrap || !inner) return;

    const fromClip = {
      bottom: "inset(0 0 100% 0)",
      top:    "inset(100% 0 0 0)",
      left:   "inset(0 100% 0 0)",
      right:  "inset(0 0 0 100%)",
    }[from];

    gsap.set(wrap, { clipPath: fromClip });
    gsap.set(inner, { scale: 1.2 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      tl.to(wrap, { clipPath: "inset(0 0 0 0)", duration: 1.2, ease: "expo.out" })
        .to(inner, { scale: 1, duration: 1.4, ease: "expo.out" }, 0);

      if (parallax) {
        gsap.to(inner, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, wrap);
    return () => ctx.revert();
  }, [from, parallax]);

  return (
    <div ref={wrapRef} className={clsx("relative overflow-hidden bg-char", className)}>
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={clsx("object-cover", imgClassName)}
        />
      </div>
    </div>
  );
}
