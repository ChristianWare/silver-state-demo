// Home page: airport pickups. Copy and a "what's included" card on the left,
// a tall photo on the right. The wait time and meet & greet come from the
// booking rules (src/config/site.ts → booking).

import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import {
  AIRPORT_FREE_WAIT_MINUTES,
  MEET_AND_GREET_FREE,
} from "@/lib/booking/rules";
import styles from "./AirportsSection.module.css";

const INCLUDED = [
  {
    label: "Flight tracking",
    meta: "Every airport booking",
    value: "Included",
  },
  {
    label: "Free wait after landing",
    meta: "From touchdown",
    value: `${AIRPORT_FREE_WAIT_MINUTES} min`,
  },
  {
    label: "Meet & greet with a name sign",
    meta: "Inside baggage claim",
    value: MEET_AND_GREET_FREE ? "Free" : "Add-on",
  },
  {
    label: "Terminal 1 and Terminal 3",
    meta: "Both terminals",
    value: "T1 · T3",
  },
  {
    label: "Private aviation (FBOs)",
    meta: "LAS and Henderson",
    value: "Yes",
  },
];

export default function AirportsSection() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.grid}>
          <div className={styles.content}>
            <div className={styles.head}>
              <PulseEyeBrow text='Airport pickups' />
              <h2 className={styles.heading}>
                Landing at Harry Reid? Your chauffeur&apos;s already there.
              </h2>
            </div>

            <p className={styles.intro}>
              Tell us your flight number when you book. We track it, adjust for
              delays and meet you inside baggage claim with a name sign. You get{" "}
              {AIRPORT_FREE_WAIT_MINUTES} minutes of free wait after landing, so
              a slow bag carousel never costs you.
            </p>

            <div className={styles.card}>
              <p className={styles.cardLabel}>Every airport pickup</p>
              <dl className={styles.list}>
                {INCLUDED.map((r) => (
                  <div key={r.label} className={styles.item}>
                    <dt className={styles.itemLabel}>{r.label}</dt>
                    <dd className={styles.itemMeta}>{r.meta}</dd>
                    <dd className={styles.itemValue}>{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <ArrowButton
              href='/book?trip=from-airport&airport=LAS'
              text='Book an airport pickup'
              variant='midnight'
            />
          </div>

          <div className={styles.media}>
            <Image
              src='/img7.jpg'
              alt='Rider stepping out of a black SUV at the airport terminal'
              fill
              sizes='(max-width: 1068px) 100vw, 45vw'
              className={styles.img}
            />
            <span className={styles.caption}>
              <span className={styles.captionDot} aria-hidden='true' />
              Harry Reid International · LAS
            </span>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
