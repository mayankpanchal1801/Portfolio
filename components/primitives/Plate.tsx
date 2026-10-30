"use client";

import Mark from "@/components/primitives/Mark";
import { useTilt } from "@/lib/use-tilt";
import clsx from "clsx";

type Props = {
  as?: React.ElementType;
  /** Drop the offset bracket - for tightly gridded surfaces. */
  flush?: boolean;
  /** Corner brackets drawn inside the panel, seeded off this string. */
  seed?: string;
  /** Swing the panel toward the pointer in 3D. Peak degrees per axis. */
  tilt?: number;
  /** Lay a specular band across the panel as the pointer crosses it. */
  gleam?: boolean;
  className?: string;
  /** Passed through when `as` is a link component. */
  href?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">;

/**
 * The one surface. A hairline panel with a second outline offset behind
 * it, a specular top edge, two stacked shadows for elevation, and a
 * spotlight that tracks the pointer (see `.plate` in globals.css).
 *
 * `tilt` swings it in 3D toward the pointer. Layer separation is left to
 * the caller (`.stage` + `.deep` + `.pop`): a plate that clips its own
 * overflow is forced flat by the spec, so depth inside one cannot be
 * relied on. Pointer position is written as CSS variables, so React
 * never re-renders on move.
 */
export default function Plate({
  as: Tag = "div",
  flush = false,
  seed,
  tilt = 0,
  gleam = false,
  className,
  children,
  ...rest
}: Props) {
  const ref = useTilt<HTMLElement>({ max: tilt, lift: tilt ? 14 : 0 });

  return (
    <Tag
      ref={ref}
      className={clsx("plate", flush && "plate--flush", className)}
      {...rest}
    >
      {seed && <Mark preset="brackets" seed={seed} />}
      {gleam && <span aria-hidden className="gleam" />}
      {children}
    </Tag>
  );
}
