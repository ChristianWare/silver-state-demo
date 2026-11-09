// Services page: every service, two to a row (one at 1068px and below).
// Each has a photo, its name, a short line, its one-line summary from
// src/lib/services.ts with a little more detail, a "best for" line and one
// key number, and a link to its own page.
//
// A service only shows here if it's in servicesData, so this list, the
// sitemap and /services/[slug] always agree. Its extra details are in
// DETAILS below, by slug; numbers come from the booking rules and fleet.

import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import { servicesData } from "@/lib/services";
import { fleetData } from "@/lib/data";
import {
  AIRPORT_FREE_WAIT_MINUTES,
  HOURLY_MIN_HOURS,
} from "@/lib/booking/rules";
import styles from "./ServicesList.module.css";

const LARGEST = Math.max(...fleetData.map((v) => v.passengers));

type Details = {
  /** Short line under the name. */
  sub: string;
  /** Added after the one-line summary. */
  more: string;
  bestFor: string;
  stat: { label: string; value: string };
  img: string;
  alt: string;
};

const DETAILS: Record<string, Details> = {
  "airport-transfers": {
    sub: "LAS, Henderson Executive and North Las Vegas",
    more: "We track your flight and meet you inside baggage claim with a name sign.",
    bestFor: "Arrivals, departures, private jets",
    stat: { label: "Free wait", value: `${AIRPORT_FREE_WAIT_MINUTES} min` },
    img: "/img7.jpg",
    alt: "Traveler stepping out of a black car at the airport terminal",
  },
  "hourly-chauffeur": {
    sub: `${HOURLY_MIN_HOURS}-hour minimum`,
    more: "Your chauffeur waits nearby and pulls up when you text, for as many stops as you like.",
    bestFor: "Date nights, client dinners, shopping days",
    stat: { label: "Minimum", value: `${HOURLY_MIN_HOURS} hrs` },
    img: "/img4.jpg",
    alt: "Chauffeur in a suit waiting beside a black car",
  },
  "corporate-travel": {
    sub: "One monthly invoice",
    more: "Employees book their own rides, or a travel manager books for them, with a receipt for each.",
    bestFor: "Conventions, client pickups, roadshows",
    stat: { label: "Billing", value: "Monthly" },
    img: "/img8.jpg",
    alt: "Executive with a coffee in the back of a car",
  },
  weddings: {
    sub: "Chapel to reception",
    more: "A stretch limousine, luxury SUV or Sprinter, plus shuttles between the hotel, the ceremony and the reception.",
    bestFor: "Couples, wedding parties, guests",
    stat: { label: "Typical", value: "3–5 hrs" },
    img: "/img10.jpg",
    alt: "Bride holding flowers in the back of a car",
  },
  "nightlife-events": {
    sub: "Door drop-off and pickup",
    more: "We text you the pickup spot before the show lets out, and there's no surge afterward.",
    bestFor: "Concerts, fights, games, the clubs",
    stat: { label: "Surge", value: "None" },
    img: "/img11.jpg",
    alt: "Rider laughing out of a car window on a night out",
  },
  "group-transportation": {
    sub: "Sprinters and motor coaches",
    more: "Bigger groups ride in several vehicles on one booking, with one invoice.",
    bestFor: "Bachelor parties, golf trips, conference teams",
    stat: { label: "Seats", value: `Up to ${LARGEST}` },
    img: "/vehicles/sprinteriii.jpg",
    alt: "Executive Sprinter waiting beside a private jet",
  },
  "point-to-point": {
    sub: "One ride, door to door",
    more: "Hotel to restaurant, home to the Strip, or across the valley to Henderson or Summerlin.",
    bestFor: "Dinners, meetings, a ride home",
    stat: { label: "Price", value: "Upfront" },
    img: "/images/other/herov.jpg",
    alt: "The Las Vegas Valley lit up at night",
  },
  "day-trips": {
    sub: "Hoover Dam to Zion",
    more: "Book by the hour, stop wherever the view tells you to, and be back for dinner.",
    bestFor: "Sightseeing, photos, a day out of the city",
    stat: { label: "Hoover Dam", value: "45 min" },
    img: "/img2.png",
    alt: "Black SUV on the open desert road",
  },
};

const SERVICES = servicesData.flatMap((s) => {
  const d = DETAILS[s.slug];
  return d ? [{ ...s, ...d }] : [];
});

export default function ServicesList() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <h2 className={styles.srOnly}>All our services</h2>
        <ul className={styles.list}>
          {SERVICES.map((s) => (
            <li key={s.slug} className={styles.item}>
              <div className={styles.photo}>
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes='(max-width: 568px) 100vw, 200px'
                  className={styles.img}
                />
              </div>

              <div className={styles.body}>
                <h3 className={`${styles.title} h4`}>{s.title}</h3>
                <p className={styles.sub}>{s.sub}</p>
                <p className={styles.copy}>
                  {s.copy} {s.more}
                </p>

                <div className={styles.foot}>
                  <div className={styles.footItem}>
                    <span className={styles.label}>Best for</span>
                    <span className={styles.footText}>{s.bestFor}</span>
                  </div>
                  <div className={`${styles.footItem} ${styles.footRight}`}>
                    <span className={styles.label}>{s.stat.label}</span>
                    <span className={styles.footValue}>{s.stat.value}</span>
                  </div>
                </div>

                <Link href={`/services/${s.slug}`} className={styles.link}>
                  Learn more
                  <span className={styles.srOnly}> about {s.title}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </LayoutWrapper>
    </section>
  );
}
