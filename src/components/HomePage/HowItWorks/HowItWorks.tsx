// Home page: how booking works, laid out like a menu card beside a photo.

import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    title: "Tell us the trip",
    copy: "Pick the service, add pickup and drop-off, and choose your date and time.",
  },
  {
    title: "Choose your vehicle",
    copy: "See every vehicle that fits your group, with the price for each.",
  },
  {
    title: "Pay and relax",
    copy: "Pay securely online. Your confirmation arrives by email, and your chauffeur's details follow before pickup.",
  },
];

const AFTER = [
  { label: "Confirmation", value: "By email, right away" },
  { label: "Chauffeur details", value: "Before your pickup" },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <PulseEyeBrow text='How it works' />
            <h2 className={styles.heading}>Booked in three steps.</h2>
          </div>
          <p className={styles.intro}>
            No phone tag and no waiting for a quote. Book online any time, day
            or night, and see your price before you pay.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.photo}>
            <Image
              src='/img2.png'
              alt='Black SUV on a desert highway outside Las Vegas'
              fill
              sizes='(max-width: 1068px) 100vw, 55vw'
              className={styles.img}
            />
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h3 className={`${styles.cardTitle} h4`}>Your booking</h3>
              <span className={styles.cardMeta}>About two minutes</span>
            </div>

            <ol className={styles.steps}>
              {STEPS.map((s, i) => (
                <li key={s.title} className={styles.step}>
                  <div className={styles.stepLine}>
                    <span className={styles.stepTitle}>{s.title}</span>
                    <span className={styles.leader} aria-hidden='true' />
                    <span className={styles.stepNum}>
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className={styles.stepCopy}>{s.copy}</p>
                </li>
              ))}
            </ol>

            <dl className={styles.after}>
              {AFTER.map((a) => (
                <div key={a.label} className={styles.afterItem}>
                  <dt className={styles.afterLabel}>{a.label}</dt>
                  <dd className={styles.afterValue}>{a.value}</dd>
                </div>
              ))}
            </dl>

            <Link href='/book' className={styles.link}>
              Book your ride
            </Link>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
