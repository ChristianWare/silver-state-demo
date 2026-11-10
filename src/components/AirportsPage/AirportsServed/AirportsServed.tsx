// /airports: the four airports we drive every day, as cards. Each has a
// logo (or a code tile until a logo is added in nevadaAirports.ts), its
// name, two facts, a line of copy and a booking button.

import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import MountainIcon from "@/components/shared/icons/MountainIcon/MountainIcon";
import { AIRPORTS_SERVED } from "@/lib/nevadaAirports";
import styles from "./AirportsServed.module.css";

export default function AirportsServed() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <PulseEyeBrow text='Airport car service' />
            <h2 className={styles.heading}>
              The airports we
              <br />
              drive every day.
            </h2>
          </div>
          <p className={styles.intro}>
            Flight tracking on every pickup, a chauffeur waiting when you land,
            and the price shown before you book.
          </p>
        </div>

        <ul className={styles.grid}>
          {AIRPORTS_SERVED.map((a) => (
            <li key={a.code} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.logo}>
                  {a.logo ? (
                    <Image
                      src={a.logo}
                      alt={`${a.name} logo`}
                      fill
                      sizes='72px'
                      className={styles.logoImg}
                    />
                  ) : (
                    <span className={styles.logoTile} aria-hidden='true'>
                      <MountainIcon className={styles.logoIcon} />
                      {a.code}
                    </span>
                  )}
                </span>
                <span className={styles.code}>{a.code}</span>
              </div>

              <h3 className={`${styles.name} h4`}>{a.shortName}</h3>
              <p className={styles.full}>{a.name}</p>

              <ul className={styles.meta}>
                {a.meta.map((m) => (
                  <li key={m} className={styles.metaItem}>
                    {m}
                  </li>
                ))}
              </ul>

              <p className={styles.copy}>{a.copy}</p>

              <ArrowButton
                href={a.href}
                text='Book a pickup'
                variant='midnight'
                className={styles.btn}
              />
            </li>
          ))}
        </ul>
      </LayoutWrapper>
    </section>
  );
}
