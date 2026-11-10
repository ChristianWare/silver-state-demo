"use client";

// About page: the timeline. Heading and intro on the left (pinned while the
// list scrolls past on wide screens), the milestones on the right.
//
// The line down the left of the list fills in as you scroll, and each dot
// lights up once the line reaches it. It works straight on the DOM (a CSS
// variable for the fill and a data attribute per item) so scrolling never
// re-renders the list. With "reduce motion" the line is simply full.
//
// The first year is SITE.founded (src/config/site.ts). The years after it
// are offsets from that until the operator gives the real ones: set `year`
// on each milestone to the actual year, and cut any milestone that doesn't
// apply rather than guess.

import { useEffect, useRef } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import { SITE } from "@/config/site";
import styles from "./AboutTimeline.module.css";

const FOUNDED = Number(SITE.founded) || new Date().getFullYear();
const yearAfter = (n: number) => String(FOUNDED + n);

const MILESTONES = [
  {
    year: String(FOUNDED),
    title: "One car, one certificate",
    copy: `${SITE.owner.name} starts Silver State with one black sedan and a Nevada Transportation Authority certificate.`,
  },
  {
    year: yearAfter(1),
    title: "The first luxury SUVs",
    copy: "SUVs join the fleet for families, golf groups and desert day trips.",
  },
  {
    year: yearAfter(2),
    title: "The Executive Sprinter",
    copy: "The first Sprinter arrives, so groups of up to 14 can ride together.",
  },
  {
    year: yearAfter(3),
    title: "Corporate accounts",
    copy: "Businesses get one monthly invoice for every ride their people take.",
  },
  {
    year: yearAfter(4),
    title: "A stretch limousine",
    copy: "For weddings, birthdays and nights on the Strip.",
  },
  {
    year: yearAfter(5),
    title: "Online booking",
    copy: "Book any time, day or night, with the price shown before you pay.",
  },
];

export default function AboutTimeline() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(
      list.querySelectorAll<HTMLElement>("[data-milestone]"),
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const rail = list.getBoundingClientRect();
      // The line fills down to 60% of the way down the screen.
      const point = window.innerHeight * 0.6;
      const fill = reduced.matches
        ? rail.height
        : Math.min(rail.height, Math.max(0, point - rail.top));
      list.style.setProperty("--fill", `${fill}px`);
      for (const item of items) {
        const dot = item.getBoundingClientRect().top + 12;
        item.dataset.reached = String(
          reduced.matches || dot - rail.top <= fill,
        );
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduced.addEventListener("change", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", onScroll);
    };
  }, []);

  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.head}>
              <PulseEyeBrow text='Our timeline' />
              <h2 className={styles.heading}>
                From one car
                <br />
                to a fleet
              </h2>
            </div>
            <p className={styles.intro}>
              Every vehicle we added answered something riders kept asking for.
              Here&apos;s how it happened, one year at a time.
            </p>
            <ArrowButton
              href='/fleet'
              text='See the fleet'
              variant='midnight'
            />
          </div>

          <div ref={listRef} className={styles.list}>
            <span className={styles.rail} aria-hidden='true' />
            <span className={styles.railFill} aria-hidden='true' />
            <ol className={styles.items}>
              {MILESTONES.map((m, i) => {
                const last = i === MILESTONES.length - 1;
                return (
                  <li
                    key={m.title}
                    data-milestone=''
                    data-reached='false'
                    className={`${styles.item} ${last ? styles.itemLast : ""}`}
                  >
                    <span className={styles.year}>{m.year}</span>
                    <span className={styles.marker} aria-hidden='true'>
                      {last ? (
                        <span className={styles.flag}>
                          <span className={styles.flagPole} />
                          <span className={styles.flagCloth} />
                          <span className={styles.flagBase} />
                        </span>
                      ) : (
                        <span className={styles.dot} />
                      )}
                    </span>
                    <div className={styles.body}>
                      <h3 className={`${styles.title} h4`}>{m.title}</h3>
                      <p className={styles.copy}>{m.copy}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
