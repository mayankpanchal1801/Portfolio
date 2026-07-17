"use client";

import PageTransition from "@/components/ui/PageTransition";

/**
 * Next.js re-mounts template.tsx on every route change (unlike layout.tsx),
 * which gives us a clean hook for per-route enter animations.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
