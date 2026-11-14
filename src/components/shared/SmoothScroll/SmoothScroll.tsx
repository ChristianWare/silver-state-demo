"use client";

// Smooth scrolling for the marketing site, using Lenis. Mouse-wheel and
// trackpad scrolling glide to a stop; touch scrolling on phones stays
// native. Wraps the app in the root layout.
//
// The admin, the customer, driver and corporate dashboards, the booking
// tool and checkout don't run Lenis at all, and they turn off the global
// `scroll-behavior: smooth` too (via data-native-scroll on <html>), so
// page changes, keyboard scrolling and in-page jumps are instant. They're
// full of scrollable tables, lists, modals and map popups that are easier
// to use with plain browser scrolling.

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

const NATIVE_SCROLL_ROUTES =
  /^\/(admin|dashboard|driver-dashboard|corporate|book|pay)(\/|$)/;

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const native = NATIVE_SCROLL_ROUTES.test(pathname);

  // People who turn off motion on their device keep normal scrolling.
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const html = document.documentElement;
    if (native) html.setAttribute("data-native-scroll", "");
    else html.removeAttribute("data-native-scroll");
  }, [native]);

  if (native) return <>{children}</>;

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
