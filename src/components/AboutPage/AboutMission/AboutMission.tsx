// About page: mission and vision in one block. A tall photo on the left;
// the mission, then the vision as a pulled-out quote, then the short
// version (for the footer, social bios and the Google profile) on the right.

import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import { SITE } from "@/config/site";
import styles from "./AboutMission.module.css";

/** 150 characters or fewer: reused for the footer, bios and Google. */
export const SHORT_VERSION =
  "Locally owned chauffeured car service in Las Vegas. Airport pickups, hourly cars, groups and day trips, priced upfront.";

export default function AboutMission() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.head}>
          <PulseEyeBrow text='Why we do it' />
          <h2 className={styles.heading}>Mission and vision</h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.photo}>
            <Image
              src='/img5.jpg'
              alt='Silver State chauffeur on the phone beside a black car'
              fill
              sizes='(max-width: 1068px) 100vw, 30vw'
              className={styles.img}
            />
          </div>

          <div className={styles.content}>
            <h3 className={styles.title}>Our mission</h3>
            <p className={styles.sub}>On every ride, since {SITE.founded}</p>

            <p className={styles.copy}>
              To make every ride in Las Vegas the easiest part of the trip: on
              time, upfront on price and driven by people who know the city.
              Whether it&apos;s a 6 a.m. flight, a client dinner or a wedding
              day, our job is the same. Get you there calmly, with nothing to
              think about but where you&apos;re going.
            </p>

            <figure className={styles.vision}>
              <figcaption className={styles.label}>Our vision</figcaption>
              <blockquote className={styles.quote}>
                <p>
                  &ldquo;To be the car service Las Vegas locals recommend first:
                  to their guests, their clients and their own families.&rdquo;
                </p>
              </blockquote>
            </figure>

            <p className={styles.small}>
              Visitors have hundreds of choices in this city. We want the people
              who live here, the concierges, planners and assistants who see
              every option, to point to us without thinking twice.
            </p>

            <div className={styles.foot}>
              <div className={styles.footItem}>
                <span className={styles.label}>The short version</span>
                <span className={styles.footText}>{SHORT_VERSION}</span>
              </div>
              <div className={`${styles.footItem} ${styles.footRight}`}>
                <span className={styles.label}>Since</span>
                <span className={styles.footValue}>{SITE.founded}</span>
              </div>
            </div>

            <Link href='/book' className={styles.link}>
              Book your ride
            </Link>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
