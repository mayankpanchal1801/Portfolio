"use client";

import { playInk } from "@/lib/ink";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

/**
 * Runs the ink director over whatever is currently on the page.
 *
 * Mounted once in the layout and re-run per route: useGSAP reverts its
 * context when `pathname` changes, so the triggers from the page being
 * left behind are killed before the next page's are created.
 */
export default function InkLayer() {
  const pathname = usePathname();

  useGSAP(() => playInk(), { dependencies: [pathname] });

  return null;
}
