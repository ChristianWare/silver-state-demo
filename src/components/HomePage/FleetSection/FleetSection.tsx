// Home page: the fleet. One row per vehicle, photo and navy spec card side
// by side, alternating sides down the page. Capacity comes from fleetData
// (src/lib/data.ts) so the home page and /fleet/[slug] always agree.

import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import { fleetData } from "@/lib/data";
import RevealMedia from "./RevealMedia";
import styles from "./FleetSection.module.css";

type Vehicle = {
  slug: string;
  /** Short name on the capacity track and the button. */
  tag: string;
  copy: string;
  /** Third stat box (passengers and bags come from fleetData). */
  extra: { label: string; value: string };
  image: { src: string; alt: string };
  /** "cover" for photos, "contain" for cut-outs on a black background. */
  fit: "cover" | "contain";
};

// Shown in this order.
const VEHICLES: Vehicle[] = [
  {
    slug: "executive-sedan",
    tag: "sedan",
    copy: "The quiet, professional choice for one to three passengers. Leather seats, a smooth ride and room for three suitcases.",
    extra: { label: "Seats", value: "Leather" },
    image: {
      src: "/vehicles/mercedesSedanii.png",
      alt: "Black Mercedes-Benz executive sedan",
    },
    fit: "contain",
  },
  {
    slug: "luxury-suv",
    tag: "SUV",
    copy: "Room for six and their luggage, with a higher seat and a calmer ride on long desert drives.",
    extra: { label: "Rows", value: "3" },
    image: {
      src: "/vehicles/escalade.png",
      alt: "Black Chevrolet Suburban parked on an airport apron",
    },
    fit: "cover",
  },
  {
    slug: "executive-sprinter",
    tag: "Sprinter",
    copy: "Keep up to 14 people together, with stand-up headroom, captain's chairs and room for everyone's bags.",
    extra: { label: "Headroom", value: "Stand-up" },
    image: {
      src: "/vehicles/sprint.png",
      alt: "Black Mercedes-Benz Sprinter beside a private jet",
    },
    fit: "cover",
  },
  {
    slug: "stretch-limousine",
    tag: "limo",
    copy: "The classic Las Vegas arrival. Wraparound seating for up to 10, mood lighting and a partition for privacy.",
    extra: { label: "Privacy", value: "Partition" },
    image: {
      src: "/vehicles/limoii.png",
      alt: "Black stretch Cadillac Escalade limousine",
    },
    fit: "contain",
  },
];

const ROWS = VEHICLES.flatMap((v) => {
  const entry = fleetData.find((e) => e.slug === v.slug);
  return entry ? [{ ...v, ...entry }] : [];
});

// Stops on the capacity track, smallest to largest.
const STOPS = [...ROWS].sort((a, b) => a.passengers - b.passengers);

export default function FleetSection() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <PulseEyeBrow text='The fleet' />
            <h2 className={styles.heading}>The right car for the trip.</h2>
          </div>
          <div className={styles.topRight}>
            <p className={styles.intro}>
              From a quiet sedan for one to a Sprinter for 14, every vehicle is
              late-model, clean and climate-controlled for the desert.
            </p>
            <Link href='/fleet' className={styles.textLink}>
              Explore the fleet
            </Link>
          </div>
        </div>

        <ul className={styles.rows}>
          {ROWS.map((v, i) => (
            <li
              key={v.slug}
              id={`fleet-${v.slug}`}
              className={`${styles.row} ${i % 2 === 1 ? styles.flip : ""}`}
            >
              <RevealMedia
                from={i % 2 === 0 ? "left" : "right"}
                className={`${styles.media} ${v.fit === "contain" ? styles.cutout : ""}`}
              >
                <Image
                  src={v.image.src}
                  alt={v.image.alt}
                  fill
                  sizes='(max-width: 1068px) 100vw, 64vw'
                  className={styles.img}
                />
                <div className={styles.shade} aria-hidden='true' />

                <div className={styles.track} aria-hidden='true'>
                  <span className={styles.line} />
                  {STOPS.map((s) => (
                    <span
                      key={s.slug}
                      className={`${styles.stop} ${s.slug === v.slug ? styles.stopActive : ""}`}
                    >
                      <span className={styles.stopTag}>
                        {s.passengers}
                        <span className={styles.stopName}> · {s.tag}</span>
                      </span>
                      <span className={styles.stopDot} />
                    </span>
                  ))}
                </div>
              </RevealMedia>

              <div className={styles.card}>
                <div className={styles.number}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className={styles.title}>{v.name}</h3>

                <dl className={styles.stats}>
                  <div className={styles.stat}>
                    <dt className={styles.statLabel}>Passengers</dt>
                    <dd className={styles.statValue}>Up to {v.passengers}</dd>
                  </div>
                  <div className={styles.stat}>
                    <dt className={styles.statLabel}>Bags</dt>
                    <dd className={styles.statValue}>{v.luggage}</dd>
                  </div>
                  <div className={styles.stat}>
                    <dt className={styles.statLabel}>{v.extra.label}</dt>
                    <dd className={styles.statValue}>{v.extra.value}</dd>
                  </div>
                </dl>

                <p className={styles.copy}>{v.copy}</p>
                <p className={styles.bestFor}>
                  <span className={styles.bestForLabel}>Best for</span>
                  {v.bestFor}
                </p>

                <ArrowButton
                  href={`/fleet/${v.slug}`}
                  text={`See the ${v.tag}`}
                  variant='white'
                  className={styles.cardBtn}
                />
              </div>
            </li>
          ))}
        </ul>
      </LayoutWrapper>
    </section>
  );
}
