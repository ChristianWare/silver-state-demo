// /airports: the private aviation band. A navy panel with a photo, the
// pitch, three facts and a booking button.

import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import styles from "./AirportsAviation.module.css";

const FACTS = [
  { label: "Tracking", value: "By tail number" },
  { label: "Meet", value: "FBO lobby or planeside" },
  { label: "Airports", value: "LAS, HND and VGT" },
];

export default function AirportsAviation() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.panel}>
          <div className={styles.photo}>
            <Image
              src='/vehicles/sprinteriii.jpg'
              alt='Executive Sprinter waiting beside a private jet'
              fill
              sizes='(max-width: 1068px) 100vw, 40vw'
              className={styles.img}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.head}>
              <PulseEyeBrow text='Private aviation' color='white' />
              <h2 className={styles.heading}>
                {/* Two lines, set by the break; they never wrap. */}
                Flying private?
                <br />
                We meet the jet.
              </h2>
            </div>
            <p className={styles.copy}>
              Give us your tail number when you book. We track the flight, meet
              you in the FBO lobby or at the aircraft, and handle the bags, for
              passengers and crew, at Harry Reid, Henderson Executive and North
              Las Vegas.
            </p>
            <dl className={styles.facts}>
              {FACTS.map((f) => (
                <div key={f.label} className={styles.fact}>
                  <dt className={styles.factLabel}>{f.label}</dt>
                  <dd className={styles.factValue}>{f.value}</dd>
                </div>
              ))}
            </dl>
            <ArrowButton
              href='/book?trip=from-airport&airport=HND'
              text='Book an FBO pickup'
            />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
