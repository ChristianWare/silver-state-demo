"use client";

// About page: our story, in three steps: Then, Today and Tomorrow.
//
// On wider screens the block pins in place as you scroll, and the steps
// change in turn (useScrollSteps): the card's story and numbers, the photo
// and the navy box all move together. Clicking a step scrolls to it. At
// 1068px and below, or whenever the block doesn't fit on screen, it's a
// plain click-to-switch block.
//
// All three steps are always in the page, stacked in the same spot, so the
// block is as tall as its tallest step and never jumps when it changes.
//
// The founder's name and founding year come from src/config/site.ts
// (owner.name, founded). The rest of the operator's details are in STORY
// below: swap them for the real ones per operator.

import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import { useScrollSteps } from "@/components/shared/ScrollSteps/useScrollSteps";
import { SITE } from "@/config/site";
import { fleetData } from "@/lib/data";
import styles from "./AboutStory.module.css";

const FOUNDER = SITE.owner.name;
const YEAR = SITE.founded;
const SHORT = "Silver State";

// Fill in with the operator's real details.
const STORY = {
  yearsDriving: "ten",
  droveFor: "the big Strip limousine companies",
  firstCar: "sedan",
  base: "a garage off Sunset Road, ten minutes from Harry Reid",
  founderPhoto: "/people/DO.jpg",
};

const LARGEST = Math.max(...fleetData.map((v) => v.passengers));

type Step = {
  id: string;
  label: string;
  /** Top right of the card. */
  when: string;
  paragraphs: string[];
  rows: { label: string; sub: string; value: string }[];
  note: string;
  photo: { src: string; alt: string; position?: string };
};

const STEPS: Step[] = [
  {
    id: "then",
    label: "Then",
    when: `${YEAR}, one black ${STORY.firstCar}`,
    paragraphs: [
      `${FOUNDER} started ${SHORT} in ${YEAR} after ${STORY.yearsDriving} years driving in Las Vegas for ${STORY.droveFor}. The work was good. The way riders were treated wasn't always: prices that changed after the booking, cars that turned up late on the busiest nights, and a phone nobody answered after midnight.`,
      `So ${FOUNDER} bought one black ${STORY.firstCar} and ran ${SHORT} the other way. Show the price before the booking. Track every flight. Leave early for every pickup. Answer the phone at 3 a.m. Treat a Tuesday airport run as seriously as a Saturday wedding.`,
    ],
    rows: [
      { label: "Cars", sub: `One black ${STORY.firstCar}`, value: "1" },
      { label: "Phone", sub: "Answered at any hour", value: "3 a.m." },
      {
        label: "Surprise charges",
        sub: "Price shown before the booking",
        value: "0",
      },
    ],
    note: "Licensed by the Nevada Transportation Authority from the first ride.",
    photo: {
      src: "/img9.jpg",
      alt: "Chauffeur's hand on the steering wheel",
      position: "50% 55%",
    },
  },
  {
    id: "today",
    label: "Today",
    when: `Today, ${fleetData.length} kinds of vehicle`,
    paragraphs: [
      `Word spread the way it does in Las Vegas: from a hotel concierge to a convention planner, from a bride to her sister, from one golf group to the next. ${SHORT} added SUVs for families and golf trips, Sprinters for groups, a stretch limousine for the nights that call for one and a motor coach for the biggest groups. The company grew. The rules didn't change.`,
      `Today ${SHORT} is still owned and run by ${FOUNDER} from ${STORY.base}, with a team of chauffeurs who live in the valley and know it at every hour.`,
    ],
    rows: [
      {
        label: "Vehicle types",
        sub: "From a sedan to a motor coach",
        value: String(fleetData.length),
      },
      {
        label: "Biggest group",
        sub: "In one vehicle",
        value: String(LARGEST),
      },
      { label: "Rules changed", sub: `Since ${YEAR}`, value: "0" },
    ],
    note: "Still locally owned, still licensed by the Nevada Transportation Authority.",
    photo: {
      src: "/img1.png",
      alt: "Black SUV parked on the desert flats at sunset",
    },
  },
  {
    id: "tomorrow",
    label: "Tomorrow",
    when: "What comes next",
    paragraphs: [
      `The plan for ${SHORT} is the one it started with, just bigger. More cars for the weekends Las Vegas sells out, more businesses on one monthly invoice, and more of the desert day trips our riders keep asking for.`,
      `Whatever the fleet looks like next, the rules stay where they've always been: the price before the booking, a person on the phone at any hour, and a chauffeur who's there before you are.`,
    ],
    rows: [
      {
        label: "Day trips",
        sub: "Hoover Dam to Zion and Death Valley",
        value: "4",
      },
      { label: "Booking", sub: "Online, any hour of the day", value: "24/7" },
      { label: "Rules we'll change", sub: "Ever", value: "0" },
    ],
    note: "Still locally owned. Still answering the phone.",
    photo: {
      src: "/img2.png",
      alt: "Black SUV on the open desert road",
    },
  },
];

// The rules from the story, in the navy box on "Today".
const RULES = [
  "Show the price before the booking",
  "Track every flight",
  "Leave early for every pickup",
  "Answer the phone at 3 a.m.",
  "Every ride counts the same",
];

// What's next, in the navy box on "Tomorrow".
const NEXT = [
  "More cars for the busiest weekends",
  "More corporate accounts, one invoice",
  "More desert day trips",
  "The same rules, every ride",
];

export default function AboutStory() {
  const { trackRef, stickyRef, active, setActive } = useScrollSteps(
    STEPS.length,
    { disableBelow: 1068 },
  );

  const isOn = (i: number) => i === active;
  const panelClass = (i: number, base: string, on: string) =>
    `${base} ${isOn(i) ? on : ""}`;

  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <PulseEyeBrow text='Our story' />
              {/* Always two lines, like the hero's h1: the break sets them
                  and they never wrap. Keep any new heading this short. */}
              <h2 className={styles.heading}>
                Behind the wheel →
                <br />
                not behind a desk
              </h2>
            </div>
            <p className={styles.intro}>
              One black car, one set of rules and a phone that&apos;s always
              answered. The company grew. The rules didn&apos;t change.
            </p>
          </div>

          <div ref={trackRef} className={styles.track}>
            <div ref={stickyRef} className={styles.sticky}>
              <div className={styles.grid}>
                {/* ── The card ── */}
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <div
                      className={styles.tabs}
                      role='group'
                      aria-label='Our story'
                    >
                      {STEPS.map((s, i) => (
                        <button
                          key={s.id}
                          type='button'
                          aria-pressed={isOn(i)}
                          aria-controls='story-panels'
                          className={panelClass(
                            i,
                            styles.tab,
                            styles.tabActive,
                          )}
                          onClick={() => setActive(i)}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                    <div className={styles.stack}>
                      {STEPS.map((s, i) => (
                        <p
                          key={s.id}
                          className={panelClass(i, styles.when, styles.on)}
                          aria-hidden={!isOn(i)}
                        >
                          {s.when}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div
                    id='story-panels'
                    aria-live='polite'
                    className={styles.stack}
                  >
                    {STEPS.map((s, i) => (
                      <div
                        key={s.id}
                        className={panelClass(i, styles.panel, styles.on)}
                        aria-hidden={!isOn(i)}
                        inert={!isOn(i)}
                      >
                        <div className={styles.story}>
                          {s.paragraphs.map((p) => (
                            <p key={p.slice(0, 24)} className={styles.para}>
                              {p}
                            </p>
                          ))}
                        </div>

                        <dl className={styles.rows}>
                          {s.rows.map((r) => (
                            <div key={r.label} className={styles.row}>
                              <dt className={styles.rowText}>
                                <span className={styles.rowLabel}>
                                  {r.label}
                                </span>
                                <span className={styles.rowSub}>{r.sub}</span>
                              </dt>
                              <dd className={`${styles.rowValue} h3`}>
                                {r.value}
                              </dd>
                            </div>
                          ))}
                        </dl>

                        <p className={styles.note}>{s.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Photo + navy box ── */}
                <div className={styles.right}>
                  <div className={styles.photo}>
                    {STEPS.map((s, i) => (
                      <Image
                        key={s.id}
                        src={s.photo.src}
                        alt={isOn(i) ? s.photo.alt : ""}
                        aria-hidden={!isOn(i)}
                        fill
                        sizes='(max-width: 1068px) 100vw, 35vw'
                        className={panelClass(i, styles.img, styles.imgOn)}
                        style={{ objectPosition: s.photo.position }}
                      />
                    ))}
                  </div>

                  <aside className={`${styles.box} ${styles.stack}`}>
                    {/* Then: the founder's quote */}
                    <div
                      className={panelClass(0, styles.boxPanel, styles.on)}
                      aria-hidden={!isOn(0)}
                    >
                      <h3 className={`${styles.boxTitle} h4`}>
                        From the founder
                      </h3>
                      <figure className={styles.quote}>
                        <blockquote className={styles.quoteText}>
                          <p>
                            &ldquo;Most people only ride with us once or twice a
                            year. That&apos;s two chances to get it exactly
                            right, and we don&apos;t waste either of
                            them.&rdquo;
                          </p>
                        </blockquote>
                        <figcaption className={styles.quoteBy}>
                          <span className={styles.quotePhoto}>
                            <Image
                              src={STORY.founderPhoto}
                              alt={FOUNDER}
                              fill
                              sizes='48px'
                              className={styles.quoteImg}
                            />
                          </span>
                          <span className={styles.quoteName}>
                            {FOUNDER}
                            <span className={styles.quoteRole}>
                              {SITE.owner.title}
                            </span>
                          </span>
                        </figcaption>
                      </figure>
                    </div>

                    {/* Today: the rules */}
                    <div
                      className={panelClass(1, styles.boxPanel, styles.on)}
                      aria-hidden={!isOn(1)}
                    >
                      <h3 className={`${styles.boxTitle} h4`}>
                        The rules we still run by
                      </h3>
                      <ol className={styles.list}>
                        {RULES.map((r, n) => (
                          <li key={r} className={styles.listItem}>
                            <span className={styles.listNum}>
                              {String(n + 1).padStart(2, "0")}
                            </span>
                            {r}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Tomorrow: what's next */}
                    <div
                      className={panelClass(2, styles.boxPanel, styles.on)}
                      aria-hidden={!isOn(2)}
                    >
                      <h3 className={`${styles.boxTitle} h4`}>
                        What&apos;s next
                      </h3>
                      <ul className={styles.list}>
                        {NEXT.map((r, n) => (
                          <li key={r} className={styles.listItem}>
                            <span className={styles.listNum}>
                              {String(n + 1).padStart(2, "0")}
                            </span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
