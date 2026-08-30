"use client";

import { gsap } from "@/lib/gsap-config";
import { prefersReducedMotion } from "@/lib/split-text";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";

type Props = {
  src: StaticImageData | string;
  alt: string;
  /** Aspect + border classes for the frame. */
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Slow counter-scroll on the inner image. */
  parallax?: boolean;
};

/**
 * Image in a frame that wipes open on scroll while the picture settles
 * back from a slight overscale. Falls back to a plain, fully visible
 * image under reduced motion.
 */
export default function Figure({
  src,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
  parallax = false,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const frame = frameRef.current;
      const inner = innerRef.current;
      if (!frame || !inner || prefersReducedMotion()) return;

      gsap.set(frame, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(inner, { scale: 1.14 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: frame, start: "top 86%", once: true },
      });
      tl.to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.out" }).to(
        inner,
        { scale: 1, duration: 1.3, ease: "expo.out" },
        0,
      );

      if (parallax) {
        gsap.to(inner, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: frameRef, dependencies: [parallax] },
  );

  return (
    <div ref={frameRef} className={clsx("relative overflow-hidden bg-paper-2", className)}>
      <div ref={innerRef} className="absolute inset-0 will-change-transform">
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
