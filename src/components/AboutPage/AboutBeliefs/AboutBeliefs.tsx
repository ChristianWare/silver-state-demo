// About page: what we believe. A navy panel: heading, intro, two facts and
// a button beside a photo, then the three promises as cards along a ruler.

import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import { SITE } from "@/config/site";
import styles from "./AboutBeliefs.module.css";

const PROMISES = [
  {
    when: "On the day",
    title: "On time is the minimum.",
    copy: "Being on time isn't the goal; it's the starting point. We plan around Strip traffic, convention crowds and road closures so you never have to.",
    practice:
      "Chauffeurs arrive 15 minutes early for every pickup, and we track every flight from takeoff.",
  },
  {
    when: "Before you book",
    title: "The price is the price.",
    copy: "You see what your ride costs before you book. No surge after the fight, the concert or the game, and nothing added on the day that you didn't agree to.",
    practice:
      "The booking tool shows your total before you pay; gratuity is your choice.",
  },
  {
    when: "In the car",
    title: "Quiet professionals.",
    copy: "Our chauffeurs are there to make your trip easier, not to be part of it. Talk business on the phone, nap after a red-eye or celebrate loudly; the ride is yours.",
    practice:
      "Suits, a clean car, the temperature set before you get in, and no small talk unless you want it.",
  },
];

const FACTS = [
  { label: "Promises", value: "Three, on every ride" },
  { label: "Kept since", value: SITE.founded },
];

export default function AboutBeliefs() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.panel}>
          <div className={styles.top}>
            <div className={styles.content}>
              <div className={styles.head}>
                <PulseEyeBrow text='What we believe' color='white' />
                <h2 className={styles.heading}>
                  Three promises we keep
                </h2>
              </div>
              <p className={styles.intro}>
                These aren&apos;t slogans on a wall. They&apos;re how we decide
                what to do when a flight is three hours late or a wedding runs
                long.
              </p>

              <dl className={styles.facts}>
                {FACTS.map((f) => (
                  <div key={f.label} className={styles.fact}>
                    <dt className={styles.factLabel}>{f.label}</dt>
                    <dd className={styles.factValue}>{f.value}</dd>
                  </div>
                ))}
              </dl>

              <ArrowButton href='/book' text='Book your ride' />
            </div>

            <div className={styles.photo}>
              <Image
                src='/images/other/vegas.jpg'
                alt='The Las Vegas Strip by day'
                fill
                sizes='(max-width: 1068px) 100vw, 40vw'
                className={styles.img}
              />
            </div>
          </div>

          {/* A ruler with a tick over each card, like a schedule. */}
          <ol className={styles.promises}>
            {PROMISES.map((p, i) => (
              <li key={p.title} className={styles.promise}>
                <span className={styles.tick}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={styles.card}>
                  <span className={styles.when}>{p.when}</span>
                  <h3 className={styles.title}>{p.title}</h3>
                  <p className={styles.copy}>{p.copy}</p>
                  <p className={styles.practice}>
                    <span className={styles.practiceLabel}>In practice</span>
                    {p.practice}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </LayoutWrapper>
    </section>
  );
}
