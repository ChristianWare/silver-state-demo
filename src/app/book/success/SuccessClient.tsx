"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function SuccessClient() {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    // The site's colors: the accent, midnight, champagne and white.
    const root = getComputedStyle(document.documentElement);
    const read = (name: string, fallback: string) =>
      root.getPropertyValue(name).trim() || fallback;
    const colors = [
      read("--gold", "#ff9f00"),
      read("--midnight", "#0b0f1a"),
      read("--champagne", "#e8d9b0"),
      "#ffffff",
    ];

    const end = Date.now() + 1200;

    const frame = () => {
      confetti({
        particleCount: 5,
        spread: 70,
        startVelocity: 35,
        ticks: 140,
        origin: { x: 0.2, y: 0.6 },
        colors,
      });

      confetti({
        particleCount: 5,
        spread: 70,
        startVelocity: 35,
        ticks: 140,
        origin: { x: 0.8, y: 0.6 },
        colors,
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  }, []);

  return null;
}
