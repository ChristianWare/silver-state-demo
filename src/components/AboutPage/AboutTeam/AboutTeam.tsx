// About page: the team. Built like the home page's fleet section: a photo
// on top that slides in from its side as it scrolls into view, then a navy
// card with a number, the name, three stats, a short bio and a button. All
// the cards are the same height.
//
// The founder's name and year come from src/config/site.ts. Everyone else
// is in TEAM below: swap in the operator's real people and photos, and
// leave a card out rather than use a stock photo.

import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import RevealMedia from "@/components/HomePage/FleetSection/RevealMedia";
import { SITE } from "@/config/site";
import styles from "./AboutTeam.module.css";

const FOUNDED = Number(SITE.founded) || new Date().getFullYear();

// Fill in with the operator's real team.
const TEAM = [
  {
    name: SITE.owner.name,
    role: SITE.owner.title,
    photo: "/people/DO.jpg",
    stats: [
      { label: "Since", value: String(FOUNDED) },
      { label: "Driving", value: "10+ yrs" },
      { label: "Shift", value: "Mornings" },
    ],
    bio: "Drove Las Vegas for years before starting Silver State. Still takes the early airport runs, and still answers the phone when dispatch is busy.",
    askAbout: "The road out to Valley of Fire at sunrise",
  },
  {
    name: "Maria Delgado",
    role: "Operations & Dispatch",
    photo: "/people/TB.jpg",
    stats: [
      { label: "Since", value: String(FOUNDED + 1) },
      { label: "Dispatch", value: "8 yrs" },
      { label: "Shift", value: "Nights" },
    ],
    bio: "The voice on the phone at 2 a.m. Watches every flight, every pickup and every road closure, and moves cars before a problem reaches you.",
    askAbout: "Getting a car to you after a three-hour delay",
  },
  {
    name: "Marcus Reed",
    role: "Lead Chauffeur",
    photo: "/people/MR.jpg",
    stats: [
      { label: "Since", value: String(FOUNDED + 2) },
      { label: "Driving", value: "12 yrs" },
      { label: "Shift", value: "Days" },
    ],
    bio: "Trains every new chauffeur the Silver State way: early, quiet and spotless. Knows every porte-cochère on the Strip by heart.",
    askAbout: "The quickest way off the Strip after a show",
  },
];

export default function AboutTeam() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <PulseEyeBrow text='The people' />
            <h2 className={styles.heading}>
              The faces behind the wheel and the phone.
            </h2>
          </div>
          <div className={styles.topRight}>
            <p className={styles.intro}>
              Silver State is a small team on purpose. You&apos;ll talk to the
              same people when you book, when your flight lands and when you
              book again next year.
            </p>
            <Link href='/contact' className={styles.textLink}>
              Get in touch
            </Link>
          </div>
        </div>

        <ul className={styles.rows}>
          {TEAM.map((p, i) => (
            <li key={p.name} className={styles.row}>
              <RevealMedia
                from={i % 2 === 0 ? "left" : "right"}
                className={styles.media}
              >
                <Image
                  src={p.photo}
                  alt={`${p.name}, ${p.role}`}
                  fill
                  sizes='(max-width: 1068px) 100vw, 33vw'
                  className={styles.img}
                />
                <span className={styles.roleTag}>{p.role}</span>
              </RevealMedia>

              <div className={styles.card}>
                <div className={styles.number}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className={styles.title}>{p.name}</h3>

                <dl className={styles.stats}>
                  {p.stats.map((s) => (
                    <div key={s.label} className={styles.stat}>
                      <dt className={styles.statLabel}>{s.label}</dt>
                      <dd className={styles.statValue}>{s.value}</dd>
                    </div>
                  ))}
                </dl>

                <p className={styles.copy}>{p.bio}</p>
                <p className={styles.bestFor}>
                  <span className={styles.bestForLabel}>Ask them about</span>
                  {p.askAbout}
                </p>

                <ArrowButton
                  href='/contact'
                  text={`Contact ${p.name.split(" ")[0]}`}
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
