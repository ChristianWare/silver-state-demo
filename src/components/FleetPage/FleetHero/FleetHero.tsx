// /fleet: the hero. Heading on the left; eyebrow, intro and buttons on the
// right; a wide photo underneath with every vehicle along a capacity track
// (the same track as the home page's fleet section).

import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import { FLEET } from "@/lib/fleetDetails";
import styles from "./FleetHero.module.css";

const STOPS = [...FLEET].sort((a, b) => a.passengers - b.passengers);

export default function FleetHero() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.top}>
          {/* Two lines, set by the break; they never wrap. */}
          <h1 className={styles.heading}>
            Our Las Vegas
            <br />
            fleet.
          </h1>

          <div className={styles.side}>
            <PulseEyeBrow text='The fleet' />
            <p className={styles.copy}>
              {FLEET.length} classes of vehicle, each late-model, spotless and
              cooled for the desert. Pick by group size and luggage, and the
              booking tool shows the price for each.
            </p>
            <div className={styles.actions}>
              <ArrowButton
                href='/book'
                text='See prices in the booking tool'
                variant='midnight'
              />
              <Link href='#compare' className={styles.textLink}>
                Compare vehicles
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.media}>
          <Image
            src='/vehicles/heroiii.jpg'
            alt='Black SUV parked on an airport apron'
            fill
            priority
            sizes='(max-width: 1344px) 100vw, 1344px'
            className={styles.img}
          />
          <div className={styles.shade} aria-hidden='true' />

          {/* Every vehicle by passengers; each stop links to its page. */}
          <nav className={styles.track} aria-label='Vehicles by size'>
            <span className={styles.line} aria-hidden='true' />
            {STOPS.map((v) => (
              <Link
                key={v.slug}
                href={`/fleet/${v.slug}`}
                className={styles.stop}
              >
                <span className={styles.stopTag}>
                  {v.passengers}
                  <span className={styles.stopName}> · {v.short}</span>
                </span>
                <span className={styles.stopDot} aria-hidden='true' />
              </Link>
            ))}
          </nav>
        </div>
      </LayoutWrapper>
    </section>
  );
}
