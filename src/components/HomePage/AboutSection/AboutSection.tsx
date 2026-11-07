// Home page: who we are, three quick facts, and two ways to ride.

import Image from "next/image";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import styles from "./AboutSection.module.css";

const FACTS = [
  "Flight tracking on every pickup",
  "Sedans to 14-seat Sprinters",
  "Serving the Las Vegas Valley",
];

export default function AboutSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <h2 className={styles.heading}>
            Driven by people <br />
            who know the city
          </h2>
          <div className={styles.topImg}>
            <Image
              src='/images/other/about-1.jpg'
              alt='Chauffeur holding the door of a black car in Las Vegas'
              fill
              sizes='(max-width: 1068px) 100vw, 240px'
              className={styles.img}
            />
          </div>
        </div>

        <ul className={styles.facts}>
          {FACTS.map((f) => (
            <li key={f} className={styles.fact}>
              {f}
            </li>
          ))}
        </ul>

        <div className={styles.cards}>
          <article className={`${styles.card} ${styles.cardGold}`}>
            <div className={styles.cardImg}>
              <Image
                src='/images/other/about-2.jpg'
                alt='Chauffeur meeting a traveler at Harry Reid International Airport'
                fill
                sizes='(max-width: 1068px) 100vw, 320px'
                className={styles.img}
              />
            </div>
            <div className={styles.cardBody}>
              <PulseEyeBrow text='Airport pickups' />
              <h3 className={styles.cardHeading}>Land and leave</h3>
              <p className={styles.cardCopy}>
                Your chauffeur tracks your flight, waits inside baggage claim
                with your name on a sign, and has you on the road while the
                rideshare line is still forming.
              </p>
              <ArrowButton
                href='/book?trip=from-airport&airport=LAS'
                text='Book an airport pickup'
                variant='midnight'
                className={styles.cardBtn}
              />
            </div>
          </article>

          <article className={`${styles.card} ${styles.cardNavy}`}>
            <div className={styles.cardBody}>
              <PulseEyeBrow text='Groups up to 14' color='white' />
              <h3 className={styles.cardHeading}>Bring the whole group</h3>
              <p className={styles.cardCopy}>
                Bachelor weekends, conference teams and golf trips ride together
                in an Executive Sprinter, with room for every bag and one
                booking for everyone.
              </p>
              <ArrowButton
                href='/services/group-transportation'
                text='Plan a group ride'
                className={styles.cardBtn}
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
