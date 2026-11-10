// /book: the intro. Heading and intro on the left; how booking works on the
// right (request, we confirm, you pay by link), with the dispatch number for
// anything sooner than online booking allows.

import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import { BOOKING_LEAD_HOURS } from "@/lib/booking/rules";
import styles from "./BookingPageIntro.module.css";

const STEPS = [
  {
    title: "Tell us the trip",
    copy: "Pickup, drop-off, date, time and the vehicle. It takes about two minutes.",
  },
  {
    title: "Dispatch confirms",
    copy: "We check the route and the car, then confirm your final price.",
  },
  {
    title: "Pay by link",
    copy: "Your payment link comes with the confirmation. Nothing is charged before that.",
  },
];

export default function BookingPageIntro({
  phone,
  phoneTel,
}: {
  phone: string;
  phoneTel: string;
}) {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.grid}>
          <div className={styles.content}>
            <PulseEyeBrow text='Book online' />
            {/* Two lines, set by the break; they never wrap. */}
            <h1 className={styles.heading}>
              Book your  ride
            </h1>
            <p className={styles.intro}>
              Tell us where and when, choose a vehicle and see your estimate.
              Dispatch confirms the price before you pay anything.
            </p>
          </div>

          <div className={styles.panel}>
            <p className={styles.panelTitle}>How booking works</p>
            <ol className={styles.steps}>
              {STEPS.map((s, i) => (
                <li key={s.title} className={styles.step}>
                  <span className={styles.stepNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.stepText}>
                    <span className={styles.stepTitle}>{s.title}</span>
                    <span className={styles.stepCopy}>{s.copy}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className={styles.call}>
              Riding in the next {BOOKING_LEAD_HOURS} hours? Call dispatch on{" "}
              <a href={`tel:${phoneTel}`} className={styles.callLink}>
                {phone}
              </a>
              .
            </p>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
