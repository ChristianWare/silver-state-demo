"use client";

// A small "Open now / Closed, opens at …" line with a dot, live in Las
// Vegas time. Empty on the server and for the first paint.

import type { Hours } from "@/lib/contact";
import { deskStatus, useVegasTime } from "./useVegasTime";
import styles from "./DeskStatus.module.css";

export default function DeskStatus({
  hours,
  className = "",
}: {
  hours: Hours;
  className?: string;
}) {
  const now = useVegasTime();
  if (!now) return <span className={`${styles.status} ${className}`} />;
  const s = deskStatus(hours, now);
  return (
    <span className={`${styles.status} ${className}`}>
      <span
        className={`${styles.dot} ${s.open ? styles.open : ""}`}
        aria-hidden='true'
      />
      {s.text}
    </span>
  );
}

/** "In Las Vegas it is 18:18 on Monday". */
export function VegasClock({ className = "" }: { className?: string }) {
  const now = useVegasTime();
  return (
    <span className={className}>
      {now ? (
        <>
          In Las Vegas it is <strong>{now.label}</strong>
        </>
      ) : (
        " "
      )}
    </span>
  );
}
