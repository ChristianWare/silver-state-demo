// /airports: the hero. Heading on the left; eyebrow, intro and buttons on
// the right; a wide photo underneath with the airport counts along the
// bottom.

import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import { AIRPORT_COUNTS, NPIAS_AIRPORT_COUNT } from "@/lib/nevadaAirports";
import styles from "./AirportsHero.module.css";

const FACTS = [
  { value: String(NPIAS_AIRPORT_COUNT), label: "Public airports in Nevada" },
  {
    value: String(AIRPORT_COUNTS.commercial),
    label: "With commercial service",
  },
  {
    value: String(AIRPORT_COUNTS.reliever),
    label: "Private aviation relievers",
  },
  { value: "4", label: "We drive every day" },
];

export default function AirportsHero() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.top}>
          {/* Two lines, set by the break; they never wrap. */}
          <h1 className={styles.heading}>
            Nevada
            <br />
            airports.
          </h1>

          <div className={styles.side}>
            <PulseEyeBrow text='Airports in Nevada' />
            <p className={styles.copy}>
              Every public airport in Nevada in one place, with codes and drive
              times from the Strip, starting with the four we drive to every
              day.
            </p>
            <div className={styles.actions}>
              <ArrowButton
                href='/book?trip=from-airport&airport=LAS'
                text='Book an airport pickup'
                variant='midnight'
              />
              <Link href='#all-airports' className={styles.textLink}>
                See every airport
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.media}>
          <Image
            src='/images/other/vegasAirport.jpg'
            alt='Freeway to Harry Reid International Airport at night'
            fill
            priority
            sizes='(max-width: 1344px) 100vw, 1344px'
            className={styles.img}
          />
          <div className={styles.shade} aria-hidden='true' />
          <dl className={styles.facts}>
            {FACTS.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt className={styles.factLabel}>{f.label}</dt>
                <dd className={styles.factValue}>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </LayoutWrapper>
    </section>
  );
}
