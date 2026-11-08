"use client";

// The fleet photo: hidden until its row scrolls into view, then it slides
// in from its own side ("left" or "right") and fades up. Runs once.

import { useEffect, useRef, useState } from "react";
import styles from "./FleetSection.module.css";

export default function RevealMedia({
  from,
  className = "",
  children,
}: {
  from: "left" | "right";
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      // Starts once a fifth of the photo is on screen, clear of the bottom.
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${styles.reveal} ${
        from === "left" ? styles.fromLeft : styles.fromRight
      } ${shown ? styles.revealed : ""}`}
    >
      {children}
    </div>
  );
}
