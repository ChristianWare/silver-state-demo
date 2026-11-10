// /contact: who to call. An ivory panel with the live Las Vegas time, then
// one row per desk: name with a dotted leader to its number, what it's for,
// its email, its hours and whether it's open now. Desks are in
// src/lib/contact.ts.

import LayoutWrapper from "@/components/shared/LayoutWrapper";
import { DESKS } from "@/lib/contact";
import DeskStatus, { VegasClock } from "../DeskStatus";
import styles from "./ContactDesks.module.css";

const tel = (display: string) => `+1${display.replace(/\D/g, "")}`;

export default function ContactDesks() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.panel}>
          <div className={styles.head}>
            <h2 className={styles.heading}>Who to call</h2>
            <VegasClock className={styles.clock} />
          </div>

          <ul className={styles.desks}>
            {DESKS.map((d) => (
              <li key={d.id} className={styles.desk}>
                <div className={styles.line}>
                  <h3 className={`${styles.name} h4`}>{d.name}</h3>
                  <span className={styles.leader} aria-hidden='true' />
                  <a href={`tel:${tel(d.phone)}`} className={styles.phone}>
                    {d.phone}
                  </a>
                </div>

                <div className={styles.body}>
                  <p className={styles.copy}>{d.copy}</p>
                  <a href={`mailto:${d.email}`} className={styles.email}>
                    {d.email}
                  </a>
                  <div className={styles.hours}>
                    <span className={styles.hoursLabel}>{d.hours.label}</span>
                    <DeskStatus hours={d.hours} />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p className={styles.foot}>
            Each desk keeps its own hours. Outside them, call dispatch, which
            never closes, or send an email and we&apos;ll come back to you the
            next morning.
          </p>
        </div>
      </LayoutWrapper>
    </section>
  );
}
