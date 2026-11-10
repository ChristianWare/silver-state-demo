"use client";

// Smooth scrolling for the marketing site, using Lenis. Mouse-wheel and trackpad scrolling glide to a stop; touch
// scrolling on phones stays native. Wraps the app in the root layout.
//
// The admin, portals, booking tool and checkout keep normal browser
// scrolling: they're full of scrollable tables, lists, modals and map
// popups that are easier to use without it.

import { useState, type ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

const NATIVE_SCROLL_ROUTES =
  /^\/(admin|dashboard|driver-dashboard|corporate|book|pay)(\/|$)/;

const onNativeRoute = () =>
  typeof window !== "undefined" &&
  NATIVE_SCROLL_ROUTES.test(window.location.pathname);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  // People who turn off motion on their device keep normal scrolling.
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <ReactLenis
      root
      options={{
        // How quickly the page catches up with the wheel: lower is
        // smoother and slower, higher is snappier. 0.1 is Lenis's default.
        lerp: 0.1,
        smoothWheel: !reducedMotion,
        // Links to a spot on the same page (href='#services') glide there.
        anchors: true,
        // Hand scrolling back to the browser on the app routes above.
        prevent: () => onNativeRoute(),
        // Leave sideways gestures alone, so rows that scroll sideways
        // still work with a trackpad.
        virtualScroll: ({ deltaX, deltaY }) =>
          Math.abs(deltaX) <= Math.abs(deltaY),
      }}
    >
      {children}
    </ReactLenis>
  );
}
