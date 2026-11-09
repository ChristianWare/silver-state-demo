"use client";

// Pins a block in place while the page scrolls through a list of steps.
//
//   const { trackRef, stickyRef, active, setActive } = useScrollSteps(6);
//   <div ref={trackRef}><div ref={stickyRef}>…</div></div>
//
// The track grows by one "step" of scroll per item (the last one included,
// so it stays on screen as long as the others before the block moves on),
// and the sticky block stays put while you scroll through it; `active`
// follows the scroll.
// setActive() scrolls to that step. It turns itself off (a plain block with
// click-to-change) at `disableBelow` px and narrower, and whenever the block
// is too tall to fit on screen under the nav.

import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  /** Off at this viewport width and below (px). */
  disableBelow?: number;
  /** Space kept clear at the top for the fixed nav (px). */
  topOffset?: number;
  /** Scroll distance per step, as a share of the viewport height. */
  stepVh?: number;
};

export function useScrollSteps(
  count: number,
  { disableBelow = 568, topOffset = 96, stepVh = 0.45 }: Options = {},
) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [active, setActiveState] = useState(0);
  const enabledRef = useRef(false);
  const geom = useRef({ top: topOffset, step: 300 });

  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return;

    const reset = () => {
      enabledRef.current = false;
      track.style.height = "";
      sticky.style.position = "";
      sticky.style.top = "";
    };

    const layout = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const h = sticky.offsetHeight;
      const fits = h <= vh - topOffset - 16;
      if (vw <= disableBelow || !fits || count < 2) {
        reset();
        return;
      }
      const step = Math.round(vh * stepVh);
      // Centered in the space under the nav.
      const top = Math.max(topOffset, Math.round((vh - h) / 2 + topOffset / 2));
      geom.current = { top, step };
      enabledRef.current = true;
      track.style.height = `${h + step * count}px`;
      sticky.style.position = "sticky";
      sticky.style.top = `${top}px`;
      onScroll();
    };

    const onScroll = () => {
      if (!enabledRef.current) return;
      const { top, step } = geom.current;
      const progress = top - track.getBoundingClientRect().top;
      const i = Math.min(count - 1, Math.max(0, Math.floor(progress / step)));
      setActiveState((prev) => (prev === i ? prev : i));
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(sticky);
    window.addEventListener("resize", layout);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", layout);
      window.removeEventListener("scroll", onScroll);
      reset();
    };
  }, [count, disableBelow, topOffset, stepVh]);

  /** Show step i. While pinned, scrolls the page to it. */
  const setActive = useCallback((i: number) => {
    const track = trackRef.current;
    if (!enabledRef.current || !track) {
      setActiveState(i);
      return;
    }
    const { top, step } = geom.current;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      // The middle of the step.
      top: trackTop - top + i * step + Math.round(step / 2),
      behavior: "smooth",
    });
  }, []);

  return { trackRef, stickyRef, active, setActive };
}
