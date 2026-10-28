"use client";

import clsx from "clsx";
import { useRef } from "react";

type Props = {
  as?: React.ElementType;
  className?: string;
  /** Passed through when `as` is a link component. */
  href?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">;

/**
 * Glass card whose spotlight (see `.panel` in globals.css) tracks the
 * pointer. Position is written as two CSS variables, so React never
 * re-renders on move.
 */
export default function Panel({ as: Tag = "div", className, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag ref={ref} onPointerMove={onMove} className={clsx("panel", className)} {...rest}>
      {children}
    </Tag>
  );
}
