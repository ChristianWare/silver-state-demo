"use client";

// /contact: where we meet you. A simple drawn map (not to scale) of the
// Strip, Harry Reid and our office, with tabs for Terminal 1 and Terminal 3
// that light up that terminal and its route to the Strip. Beside it, how
// pickups work at the airport, at your hotel, and at our office. Content is
// in src/lib/contact.ts.

import { useState } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import { MEET_BLOCKS, MEET_POINTS } from "@/lib/contact";
import styles from "./ContactWhere.module.css";

type PointId = (typeof MEET_POINTS)[number]["id"];

// Route from each terminal to the Strip, along Tropicana.
const ROUTES: Record<PointId, string> = {
  t1: "M340 150 L330 120 L170 120",
  t3: "M270 222 L232 222 L232 120 L170 120",
};

const PINS: Record<PointId, { x: number; y: number }> = {
  t1: { x: 340, y: 150 },
  t3: { x: 270, y: 222 },
};

export default function ContactWhere() {
  const [active, setActive] = useState<PointId>("t1");
  const point = MEET_POINTS.find((p) => p.id === active) ?? MEET_POINTS[0];

  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.grid}>
          <div className={styles.mapCol}>
            <figure className={styles.map}>
              <svg
                viewBox='0 0 600 400'
                className={styles.svg}
                role='img'
                aria-label={`Map: ${point.tab} to the Strip, with our office on Sunset Road`}
              >
                {/* Airport grounds and runways */}
                <path
                  d='M250 140 L560 140 L560 290 L250 290 Z'
                  className={styles.grounds}
                />
                <path d='M290 270 L520 160' className={styles.runway} />
                <path d='M300 285 L540 175' className={styles.runway} />
                <path d='M420 150 L420 280' className={styles.runway} />

                {/* Roads */}
                <path d='M95 0 L120 400' className={styles.freeway} />
                <path d='M0 360 L600 360' className={styles.freeway} />
                <path d='M170 0 L170 400' className={styles.strip} />
                <path d='M90 120 L600 120' className={styles.road} />
                <path d='M170 300 L600 300' className={styles.road} />
                <path d='M330 0 L330 120 L340 150' className={styles.road} />
                <path d='M262 360 L270 222' className={styles.road} />

                {/* The active route */}
                <path
                  key={active}
                  d={ROUTES[active]}
                  className={styles.route}
                />

                {/* Terminals */}
                {MEET_POINTS.map((p) => {
                  const pin = PINS[p.id];
                  const on = p.id === active;
                  return (
                    <g key={p.id}>
                      <circle
                        cx={pin.x}
                        cy={pin.y}
                        r={on ? 9 : 6}
                        className={on ? styles.pinOn : styles.pin}
                      />
                      <rect
                        x={pin.x + 12}
                        y={pin.y - 11}
                        width={78}
                        height={22}
                        rx={3}
                        className={on ? styles.labelBoxOn : styles.labelBox}
                      />
                      <text
                        x={pin.x + 51}
                        y={pin.y + 4}
                        className={on ? styles.labelTextOn : styles.labelText}
                      >
                        {p.pin}
                      </text>
                    </g>
                  );
                })}

                {/* Office */}
                <circle cx={470} cy={300} r={7} className={styles.office} />
                <rect
                  x={410}
                  y={312}
                  width={120}
                  height={22}
                  rx={3}
                  className={styles.officeBox}
                />
                <text x={470} y={327} className={styles.officeText}>
                  Our office
                </text>

                {/* Labels */}
                <rect
                  x={128}
                  y={36}
                  width={84}
                  height={22}
                  rx={3}
                  className={styles.stripBox}
                />
                <text x={170} y={51} className={styles.stripText}>
                  The Strip
                </text>
                <text x={404} y={222} className={styles.groundsText}>
                  HARRY REID (LAS)
                </text>
                <text x={44} y={112} className={styles.roadText}>
                  Tropicana
                </text>
                <text x={560} y={292} className={styles.roadTextEnd}>
                  Sunset Rd
                </text>
                <text x={88} y={392} className={styles.roadTextEnd}>
                  I-15
                </text>
                <text x={590} y={352} className={styles.roadTextEnd}>
                  I-215
                </text>

                {/* North */}
                <path
                  d='M40 46 L46 30 L52 46 L46 42 Z'
                  className={styles.north}
                />
                <text x={46} y={60} className={styles.northText}>
                  N
                </text>
              </svg>
              <figcaption className={styles.caption}>
                <span>{point.note}</span>
                <span className={styles.scale}>Not to scale</span>
              </figcaption>
            </figure>

            <div className={styles.tabs} role='group' aria-label='Terminal'>
              {MEET_POINTS.map((p) => (
                <button
                  key={p.id}
                  type='button'
                  aria-pressed={p.id === active}
                  className={`${styles.tab} ${p.id === active ? styles.tabOn : ""}`}
                  onClick={() => setActive(p.id)}
                >
                  {p.tab}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.head}>
              <PulseEyeBrow text='Pickups' />
              <h2 className={styles.heading}>
                Where we
                <br />
                meet you.
              </h2>
            </div>
            <p className={styles.intro}>
              Most rides start at Harry Reid or a hotel on the Strip.
              Here&apos;s how each one works.
            </p>

            <ul className={styles.blocks}>
              {MEET_BLOCKS.map((b) => (
                <li key={b.title} className={styles.block}>
                  <h3 className={`${styles.blockTitle} h4`}>{b.title}</h3>
                  <p className={styles.blockCopy}>{b.copy}</p>
                  <p className={styles.blockSmall}>{b.small}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
