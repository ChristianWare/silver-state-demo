// About page: the hero. Heading on the left, eyebrow, copy and buttons on
// the right, then a wide photo with a pickup-to-drop-off track along the
// bottom and a caption underneath. The phone number comes from Admin →
// Company Settings (falls back to src/config/site.ts).

import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import { SITE } from "@/config/site";
import { getCompanySettings } from "../../../../actions/admin/companySettings";
import styles from "./AboutHero.module.css";

export default async function AboutHero() {
  const s = await getCompanySettings();
  const phone = s.dispatchPhone || SITE.phone.display;
  const phoneTel = s.dispatchPhoneRaw
    ? `+1${s.dispatchPhoneRaw}`
    : SITE.phone.tel;

  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.top}>
          {/* Always two lines: the break sets them, the lines never wrap,
              and the column sizes itself to the longer one. Keep any new
              heading to two short lines like these. */}
          <h1 className={styles.heading}>
            Driven by people
            <br />
            who live here
          </h1>

          <div className={styles.side}>
            <PulseEyeBrow text='About us' />
            <p className={styles.copy}>
              Silver State Black Car is a locally owned chauffeured car service
              in Las Vegas. We drive the Strip, the airports and the desert
              beyond them for travelers, businesses and locals who want the ride
              to be the easy part of the trip.
            </p>
            <div className={styles.actions}>
              <ArrowButton
                href='/book'
                text='Book your ride'
                variant='midnight'
              />
              <a href={`tel:${phoneTel}`} className={styles.call}>
                Call {phone}
              </a>
            </div>
          </div>
        </div>

        <figure className={styles.figure}>
          <div className={styles.media}>
            <Image
              src='/images/other/aboutHeroiii.png'
              alt='Silver State chauffeur stepping out of a black SUV'
              fill
              priority
              sizes='(max-width: 1344px) 100vw, 1344px'
              className={styles.img}
            />
            <div className={styles.overlay} aria-hidden='true' />

            <div className={styles.legend} aria-hidden='true'>
              <span className={styles.legendItem}>
                <span className={styles.legendSquare} /> Your ride
              </span>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} /> Arrived
              </span>
            </div>

            <div className={styles.track} aria-hidden='true'>
              <span className={styles.line} />
              <span className={`${styles.stop} ${styles.stopStart}`}>
                <span className={styles.tag}>Pickup</span>
                <span className={styles.dot} />
              </span>
              <span className={`${styles.stop} ${styles.stopMid}`}>
                <span className={styles.tag}>Las Vegas</span>
                <span className={styles.tick} />
              </span>
              <span className={`${styles.stop} ${styles.stopEnd}`}>
                <span className={styles.tag}>Drop-off</span>
                <span className={styles.ring} />
              </span>
            </div>
          </div>

          <figcaption className={styles.caption}>
            <span className={styles.captionTitle}>
              Locally owned in Las Vegas
            </span>
            <span className={styles.captionText}>
              Licensed by the Nevada Transportation Authority · Chauffeurs who
              live in the valley · Upfront pricing on every ride
            </span>
          </figcaption>
        </figure>
      </LayoutWrapper>
    </section>
  );
}
