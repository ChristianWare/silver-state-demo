// After a ride request: the four steps from request to confirmed ride, in
// the same panel as the booking page's "How booking works". By default the
// first step is done and the second is where the request is now (the
// success page). The track page passes its own steps from the live status.

import type { ReactNode } from "react";
import styles from "./WhatHappensNext.module.css";

export type WhatHappensStep = {
  title: string;
  description: string;
  status: "complete" | "current" | "upcoming";
};

const DEFAULT_STEPS: WhatHappensStep[] = [
  {
    title: "Request received",
    description: "Your trip is in. You'll find it in your confirmation email.",
    status: "complete",
  },
  {
    title: "Dispatch reviews",
    description: "We check the route, the timing and the car, within 24 hours.",
    status: "current",
  },
  {
    title: "Payment link",
    description: "Once it's approved, we email you a secure link to pay.",
    status: "upcoming",
  },
  {
    title: "Ride confirmed",
    description: "After payment, your chauffeur and car are booked.",
    status: "upcoming",
  },
];

const STATUS_LABEL: Record<WhatHappensStep["status"], string> = {
  complete: "Done",
  current: "Now",
  upcoming: "",
};

const DEFAULT_NOTICE = (
  <>
    <strong>No payment yet.</strong> Nothing is charged until dispatch approves
    your trip and you pay by the link.
  </>
);

export default function WhatHappensNext({
  title = "What happens next",
  steps = DEFAULT_STEPS,
  notice = DEFAULT_NOTICE,
}: {
  title?: string;
  steps?: WhatHappensStep[];
  /** A line under the steps; null for none. */
  notice?: ReactNode;
} = {}) {
  return (
    <div className={styles.panel}>
      <p className={styles.title}>{title}</p>
      <ol className={styles.steps}>
        {steps.map((step, i) => (
          <li
            key={step.title}
            className={`${styles.step} ${styles[step.status]}`}
            aria-current={step.status === "current" ? "step" : undefined}
          >
            <span className={styles.num}>
              {step.status === "complete" ? (
                <svg
                  className={styles.check}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2.5}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                >
                  <path d='M4 12.5 9.5 18 20 6.5' />
                </svg>
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </span>
            <span className={styles.text}>
              <span className={styles.stepTitle}>
                {step.title}
                {STATUS_LABEL[step.status] ? (
                  <span className={styles.tag}>
                    {STATUS_LABEL[step.status]}
                  </span>
                ) : null}
              </span>
              <span className={styles.copy}>{step.description}</span>
            </span>
          </li>
        ))}
      </ol>
      {notice ? <p className={styles.notice}>{notice}</p> : null}
    </div>
  );
}
