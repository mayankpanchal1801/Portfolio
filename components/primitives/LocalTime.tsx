"use client";

import { contact } from "@/constants/personal";
import { useEffect, useState } from "react";

/**
 * Bengaluru wall-clock. Renders a placeholder on the server so the first
 * client paint can't disagree with it, then ticks once a minute.
 */
export default function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: contact.timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? "--:--"} IST
    </span>
  );
}
