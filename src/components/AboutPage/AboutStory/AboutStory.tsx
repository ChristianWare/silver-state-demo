"use client";

// About page: our story. A card with two tabs ("Then" and "Today"), each
// with half of the story and a few big numbers, a photo under it, and a
// navy box beside it with the founder's quote and the rules the company has
// always run by.
//
// The founder's name and founding year come from src/config/site.ts
// (owner.name, founded). The rest of the operator's details are in STORY
// below: swap them for the real ones per operator.

import { useState } from "react";
import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
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

type Tab = {
  id: string;
  label: string;
  /** Top right of the card. */
  when: string;
  paragraphs: string[];
  rows: { label: string; sub: string; value: string }[];
  note: string;
};

const TABS: Tab[] = [
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
  },
];

// The rules from the story, in the navy box.
const RULES = [
  {
    title: "Show the price before the booking",
    copy: "Upfront, with no surge after the fight, the concert or the game.",
  },
  {
    title: "Track every flight",
    copy: "So a delay moves your pickup time, not your plans.",
  },
  {
    title: "Leave early for every pickup",
    copy: "Strip traffic and convention crowds are our problem, not yours.",
  },
  {
    title: "Answer the phone at 3 a.m.",
    copy: "Plans change late in Las Vegas. A person picks up when they do.",
  },
  {
    title: "Every ride counts the same",
    copy: "A Tuesday airport run gets the care of a Saturday wedding.",
  },
];

export default function AboutStory() {
  const [tabId, setTabId] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === tabId) ?? TABS[0];

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
                Behind the wheel,
                <br />
                not behind a desk.
              </h2>
            </div>
            <p className={styles.intro}>
              One black car, one set of rules and a phone that&apos;s always
              answered. The company grew. The rules didn&apos;t change.
            </p>
          </div>

          <div className={styles.grid}>
            <div className={styles.left}>
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <div
                    className={styles.tabs}
                    role='tablist'
                    aria-label='Our story'
                  >
                    {TABS.map((t) => (
                      <button
                        key={t.id}
                        type='button'
                        role='tab'
                        id={`story-tab-${t.id}`}
                        aria-selected={t.id === tab.id}
                        aria-controls='story-panel'
                        className={`${styles.tab} ${t.id === tab.id ? styles.tabActive : ""}`}
                        onClick={() => setTabId(t.id)}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <p className={styles.when}>{tab.when}</p>
                </div>

                <div
                  id='story-panel'
                  role='tabpanel'
                  aria-labelledby={`story-tab-${tab.id}`}
                  className={styles.panel}
                  key={tab.id}
                >
                  <div className={styles.story}>
                    {tab.paragraphs.map((p) => (
                      <p key={p.slice(0, 24)} className={styles.para}>
                        {p}
                      </p>
                    ))}
                  </div>

                  <dl className={styles.rows}>
                    {tab.rows.map((r) => (
                      <div key={r.label} className={styles.row}>
                        <dt className={styles.rowText}>
                          <span className={styles.rowLabel}>{r.label}</span>
                          <span className={styles.rowSub}>{r.sub}</span>
                        </dt>
                        <dd className={`${styles.rowValue} h3`}>{r.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className={styles.note}>{tab.note}</p>
                </div>
              </div>

              <div className={styles.photo}>
                <Image
                  src='/img1.png'
                  alt='Black SUV parked on the desert flats at sunset'
                  fill
                  sizes='(max-width: 1068px) 100vw, 60vw'
                  className={styles.img}
                />
              </div>
            </div>

            <aside className={styles.box}>
              <div className={styles.boxGroup}>
                <h3 className={`${styles.boxTitle} h4`}>From the founder</h3>
                <figure className={styles.quote}>
                  <blockquote className={styles.quoteText}>
                    <p>
                      &ldquo;Most people only ride with us once or twice a year.
                      That&apos;s two chances to get it exactly right, and we
                      don&apos;t waste either of them.&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className={styles.quoteBy}>
                    <span className={styles.quotePhoto}>
                      <Image
                        src={STORY.founderPhoto}
                        alt={FOUNDER}
                        fill
                        sizes='56px'
                        className={styles.img}
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

              <div className={styles.boxGroup}>
                <h3 className={`${styles.boxTitle} h4`}>
                  The rules we started with
                </h3>
                <ul className={styles.rules}>
                  {RULES.map((r) => (
                    <li key={r.title} className={styles.rule}>
                      <span className={styles.ruleTitle}>{r.title}</span>
                      <span className={styles.ruleCopy}>{r.copy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
