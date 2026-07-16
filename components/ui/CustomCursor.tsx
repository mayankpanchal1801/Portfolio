"use client";

import { gsap } from "@/lib/gsap-config";
import { useEffect, useRef } from "react";

/**
 * Custom cursor with:
 * - trailing ring (eased catch-up)
 * - hover state when over any `a`, `button`, `[data-cursor]`
 * - magnetic snap to `[data-cursor-magnetic]` elements
 * - variant state via `data-cursor="image|drag"` on hovered element
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const dot = dotRef.current;
    const rng = ringRef.current;
    if (!dot || !rng) return;

    // If touch device, do nothing.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    const dotSetX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const dotSetY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      // Magnetic snap for cursor
      const magnetic = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor-magnetic]");
      if (magnetic) {
        const r = magnetic.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        // pull cursor slightly toward magnet center
        target.current.x = cx + (e.clientX - cx) * 0.5;
        target.current.y = cy + (e.clientY - cy) * 0.5;
      }

      dotSetX(target.current.x);
      dotSetY(target.current.y);
    };

    const tick = () => {
      // ring lags behind dot
      ring.current.x += (target.current.x - ring.current.x) * 0.16;
      ring.current.y += (target.current.y - ring.current.y) * 0.16;
      rng.style.transform = `translate3d(${ring.current.x - rng.offsetWidth / 2}px, ${ring.current.y - rng.offsetHeight / 2}px, 0)`;
      dot.style.marginLeft = `-${dot.offsetWidth / 2}px`;
      dot.style.marginTop = `-${dot.offsetHeight / 2}px`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const setHover = (state: "" | "hover" | "image" | "drag") => {
      dot.classList.toggle("is-hover", state === "hover");
      rng.classList.toggle("is-hover", state === "hover");
      rng.classList.toggle("is-image", state === "image");
      rng.classList.toggle("is-drag", state === "drag");
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const el = t.closest<HTMLElement>("a, button, [role='button'], [data-cursor]");
      if (!el) return setHover("");
      const variant = el.getAttribute("data-cursor");
      if (variant === "image") setHover("image");
      else if (variant === "drag") setHover("drag");
      else setHover("hover");
    };

    const leave = () => setHover("");

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
