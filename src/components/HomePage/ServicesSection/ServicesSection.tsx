"use client";

// Home page: what we do. Six services down the left; the open one's details,
// photo and link fill the gold box on the right.
//
// On wider screens the block pins in place as you scroll, and each service
// opens in turn (useScrollSteps). It's a plain click-to-open list at 568px
// and below, or whenever the block doesn't fit on screen.

import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import { useScrollSteps } from "@/components/shared/ScrollSteps/useScrollSteps";
import {
  AIRPORT_FREE_WAIT_MINUTES,
  HOURLY_MIN_HOURS,
  MEET_AND_GREET_FREE,
} from "@/lib/booking/rules";
import styles from "./ServicesSection.module.css";

type Service = {
  slug: string;
  title: string;
  /** Short line under the title in the list. */
  phrase: string;
  desc: string;
  rows: { label: string; value: string }[];
  note: string;
  img: string;
  alt: string;
};

// Numbers come from the booking rules (src/config/site.ts → booking).
const SERVICES: Service[] = [
  {
    slug: "airport-transfers",
    title: "Airport transfers",
    phrase: "LAS, HND and VGT",
    desc: "Harry Reid International, Henderson Executive and North Las Vegas, with flight tracking and meet & greet.",
    rows: [
      {
        label: "Airports",
        value:
          "Harry Reid (LAS), Henderson Executive (HND) and North Las Vegas (VGT).",
      },
      {
        label: "Flight tracking",
        value: "On every pickup, so a delay moves your pickup time with it.",
      },
      {
        label: "Free wait",
        value: `${AIRPORT_FREE_WAIT_MINUTES} minutes after your flight lands.`,
      },
      {
        label: "Meet & greet",
        value: `Inside baggage claim with your name on a sign${MEET_AND_GREET_FREE ? ", at no charge" : ""}.`,
      },
    ],
    note: "Flying out? Book a drop-off and we'll time your pickup to your flight.",
    img: "/img7.jpg",
    alt: "Traveler stepping out of a black car at the airport terminal",
  },
  {
    slug: "hourly-chauffeur",
    title: "Hourly chauffeur",
    phrase: `${HOURLY_MIN_HOURS}-hour minimum`,
    desc: `Keep your car and chauffeur for dinner, a show and the night out. ${HOURLY_MIN_HOURS}-hour minimum.`,
    rows: [
      {
        label: "Minimum",
        value: `${HOURLY_MIN_HOURS} hours, then billed by the hour.`,
      },
      { label: "Stops", value: "As many as you want within your hours." },
      {
        label: "Waiting",
        value: "Your chauffeur waits nearby and pulls up when you text.",
      },
      {
        label: "Good for",
        value: "Date nights, client dinners, shopping days and property tours.",
      },
    ],
    note: "Running late on the night? Ask your chauffeur to add time, if the car is free.",
    img: "/img4.jpg",
    alt: "Chauffeur in a suit waiting beside a black car",
  },
  {
    slug: "corporate-travel",
    title: "Corporate travel",
    phrase: "One monthly invoice",
    desc: "Conventions, client pickups and executive travel on one monthly invoice.",
    rows: [
      {
        label: "Billing",
        value: "Every ride on one monthly invoice, with a receipt for each.",
      },
      {
        label: "Booking",
        value:
          "Employees book their own rides, or a travel manager books for them.",
      },
      {
        label: "Guests",
        value:
          "Send a car for a client or speaker and bill it to your account.",
      },
      {
        label: "Conventions",
        value: "Shuttles between hotels and the convention center.",
      },
    ],
    note: "Convention weeks sell out first. Reserve cars for CES and the big shows early.",
    img: "/img8.jpg",
    alt: "Executive with a coffee in the back of a car",
  },
  {
    slug: "weddings",
    title: "Weddings",
    phrase: "Chapel to reception",
    desc: "Chapel to reception, with time for photos on the way.",
    rows: [
      {
        label: "Vehicles",
        value: "Stretch limousine, luxury SUV or Executive Sprinter.",
      },
      {
        label: "Photo stops",
        value: "The Welcome to Las Vegas sign, Downtown or the desert.",
      },
      {
        label: "Guests",
        value: "Shuttles between the hotel, the ceremony and the reception.",
      },
      { label: "Typical booking", value: "3 to 5 hours." },
    ],
    note: "Marrying in Las Vegas? We can stop at the Marriage License Bureau downtown first.",
    img: "/img10.jpg",
    alt: "Bride holding flowers in the back of a car",
  },
  {
    slug: "nightlife-events",
    title: "Nightlife & events",
    phrase: "Door drop-off and pickup",
    desc: "Allegiant Stadium, T-Mobile Arena, Sphere and the clubs, dropped at the door and picked up after.",
    rows: [
      {
        label: "Venues",
        value:
          "Allegiant Stadium, T-Mobile Arena, Sphere and the Strip's clubs.",
      },
      {
        label: "Pickup",
        value:
          "At the venue's car service area. We text you the spot before it lets out.",
      },
      { label: "Pricing", value: "No surge after the event." },
      { label: "Groups", value: "Sprinters for up to 14." },
    ],
    note: "Big fight or concert weekend? Book as soon as you have tickets.",
    img: "/img11.jpg",
    alt: "Rider laughing out of a car window on a night out",
  },
  {
    slug: "group-transportation",
    title: "Group transportation",
    phrase: "Sprinters for up to 14",
    desc: "Sprinters for bachelor parties, golf trips and conference teams.",
    rows: [
      { label: "Seats", value: "Up to 14 in an Executive Sprinter." },
      {
        label: "Larger groups",
        value: "Several vehicles on one booking, with one invoice.",
      },
      { label: "Airport runs", value: "Timed to one flight or several." },
      {
        label: "Good for",
        value:
          "Bachelor and bachelorette parties, golf trips and conference teams.",
      },
    ],
    note: "Bringing golf bags? Tell us when you book so there's room for every set.",
    img: "/vehicles/sprinteriii.jpg",
    alt: "Executive Sprinter waiting beside a private jet",
  },
];

export default function ServicesSection() {
  const { trackRef, stickyRef, active, setActive } = useScrollSteps(
    SERVICES.length,
    { disableBelow: 568 },
  );
  const current = SERVICES[active] ?? SERVICES[0];

  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <PulseEyeBrow text='What we do' />
            <h2 className={styles.heading}>
              One call for every ride in Las Vegas.
            </h2>
          </div>
          <p className={styles.intro}>
            Six ways to ride, all booked in one place. Pick a service to see
            what&apos;s included. Every ride shows its price before you book.
          </p>
        </div>

        <div ref={trackRef} className={styles.track}>
          <div ref={stickyRef} className={styles.sticky}>
            <div className={styles.grid}>
              <div className={styles.listCol}>
                <ul className={styles.list}>
                  {SERVICES.map((s, i) => {
                    const open = i === active;
                    return (
                      <li
                        key={s.slug}
                        className={`${styles.item} ${open ? styles.itemOpen : ""}`}
                      >
                        <span className={styles.itemText}>
                          {/* The button covers the whole row (see .tab::after). */}
                          <h3 className={`${styles.title} h4`}>
                            <button
                              type='button'
                              aria-pressed={open}
                              aria-controls='svc-panel'
                              className={styles.tab}
                              onClick={() => setActive(i)}
                            >
                              {s.title}
                            </button>
                          </h3>
                          <span className={styles.phrase}>{s.phrase}</span>
                        </span>
                        <span className={styles.itemNum} aria-hidden='true'>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <Link href='/services' className={styles.allLink}>
                  See all services
                </Link>
              </div>

              <div id='svc-panel' aria-live='polite' className={styles.box}>
                <div className={styles.boxHead} key={current.slug}>
                  <h3 className={styles.boxTitle}>{current.title}</h3>
                  <p className={styles.desc}>{current.desc}</p>
                </div>

                <div className={styles.boxBody}>
                  <dl className={styles.rows} key={current.slug}>
                    {current.rows.map((r) => (
                      <div key={r.label} className={styles.row}>
                        <dt className={styles.rowLabel}>{r.label}</dt>
                        <dd className={styles.rowValue}>{r.value}</dd>
                      </div>
                    ))}
                  </dl>

                  {/* All six photos are stacked; the open one fades in. */}
                  <div className={styles.photo}>
                    {SERVICES.map((s, i) => (
                      <Image
                        key={s.slug}
                        src={s.img}
                        alt={i === active ? s.alt : ""}
                        aria-hidden={i !== active}
                        fill
                        sizes='(max-width: 1068px) 100vw, 30vw'
                        className={`${styles.img} ${i === active ? styles.imgActive : ""}`}
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.boxFoot}>
                  <p className={styles.note} key={current.slug}>
                    {current.note}
                  </p>
                  <ArrowButton
                    href={`/services/${current.slug}`}
                    text={`More on ${current.title.toLowerCase()}`}
                    variant='midnight'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
