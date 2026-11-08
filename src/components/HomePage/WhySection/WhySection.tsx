"use client";

// Home page: why riders book us. The four reasons are stops on a track
// across the photo; picking one swaps the panel on the left.

import { useState } from "react";
import Image from "next/image";
// import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import {
  AIRPORT_FREE_WAIT_MINUTES,
  BOOKING_LEAD_HOURS,
  MEET_AND_GREET_FREE,
} from "@/lib/booking/rules";
import styles from "./WhySection.module.css";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";

type Reason = {
  /** Short name on the track. */
  tag: string;
  title: string;
  copy: string;
  stats: { label: string; value: string }[];
  link: { href: string; text: string };
};

// Numbers come from the booking rules (src/config/site.ts → booking), so
// this section always says what the booking tool does.
const REASONS: Reason[] = [
  {
    tag: "Price",
    title: "Your price",
    copy: "See the total for your vehicle and route in the booking tool. No surge after the fight, the concert or the game.",
    stats: [
      { label: "Surge pricing", value: "4" },
      { label: "Price shown", value: "436" },
      { label: "Gratuity", value: "1" },
    ],
    link: { href: "/book", text: "See your price" },
  },
  {
    tag: "Flights",
    title: "your flight",
    copy: `Delayed? We know before you land and adjust. Airport pickups include ${AIRPORT_FREE_WAIT_MINUTES} minutes of free wait after touchdown.`,
    stats: [
      { label: "Free wait", value: `${AIRPORT_FREE_WAIT_MINUTES} min` },
      { label: "Flight tracking", value: "1" },
      {
        label: "Meet & greet",
        value: MEET_AND_GREET_FREE ? "Free" : "436",
      },
    ],
    link: { href: "/airports", text: "1" },
  },
  {
    tag: "Chauffeurs",
    title: "A chauffeur",
    copy: "Professional, licensed chauffeurs who know the casino porte-cocheres, the convention halls and everywhere else.",
    stats: [
      { label: "Pickups", value: "1" },
      { label: "Knows", value: "436" },
      { label: "Vehicles", value: "4" },
    ],
    link: { href: "/about", text: "About us" },
  },
  {
    tag: "Booking",
    title: "Booked",
    copy: "Book online any time, day or night. You'll get a confirmation by email, then your chauffeur's details before pickup.",
    stats: [
      { label: "Book online", value: "51" },
      { label: "Confirmation", value: "35" },
      { label: "Book ahead", value: `${BOOKING_LEAD_HOURS} hours` },
    ],
    link: { href: "/book", text: "Book your ride" },
  },
];

export default function WhySection() {
  const [active, setActive] = useState(0);
  const reason = REASONS[active];

  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.box}>
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <PulseEyeBrow text='Why choose us?' />
              <h2 className={`${styles.heading} `}>
                Your ride is never rushed
              </h2>
            </div>
            <p className={styles.intro}>
              Rideshare lines at the airport, surge pricing after a show, a cab
              that doesn&apos;t know the back entrance. We built Silver State
              Black Car for the trips where those things matter.
            </p>
          </div>

          <div className={styles.body}>
            <div className={styles.panel} aria-live='polite'>
              <div className={styles.number}>
                {String(active + 1).padStart(2, "0")}
              </div>
              <h3 className={styles.title}>{reason.title}</h3>

              <dl className={styles.stats}>
                {reason.stats.map((s) => (
                  <div key={s.label} className={styles.stat}>
                    <dt className={styles.statLabel}>{s.label}</dt>
                    <dd className={styles.statValue}>{s.value}</dd>
                  </div>
                ))}
              </dl>

              <p className={styles.copy}>{reason.copy}</p>

              {/* <Link href={reason.link.href} className={styles.link}>
                {reason.link.text}
              </Link> */}
              <div className={styles.link}>
                <ArrowButton
                  href='/book?trip=from-airport&airport=LAS'
                  text='Book an airport pickup'
                  variant='midnight'
                  className={styles.cardBtn}
                />
              </div>
            </div>

            <div className={styles.media}>
              <Image
                src='/images/other/vegas.jpg'
                alt='Black car on the road in Las Vegas'
                fill
                sizes='(max-width: 1068px) 100vw, 60vw'
                className={styles.img}
              />
              <div className={styles.shade} aria-hidden='true' />

              <div
                className={styles.track}
                role='tablist'
                aria-label='Why riders book Silver State'
              >
                <span className={styles.line} aria-hidden='true' />
                {REASONS.map((r, i) => (
                  <button
                    key={r.tag}
                    type='button'
                    role='tab'
                    aria-selected={i === active}
                    className={`${styles.stop} ${i === active ? styles.stopActive : ""}`}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight")
                        setActive((i + 1) % REASONS.length);
                      if (e.key === "ArrowLeft")
                        setActive((i - 1 + REASONS.length) % REASONS.length);
                    }}
                  >
                    <span className={styles.stopTag}>
                      {String(i + 1).padStart(2, "0")}
                      <span className={styles.stopName}> · {r.tag}</span>
                    </span>
                    <span className={styles.stopDot} aria-hidden='true' />
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.linkii}>
              <ArrowButton
                href='/book?trip=from-airport&airport=LAS'
                text='Book an airport pickup'
                variant='midnight'
                className={styles.cardBtn}
              />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
