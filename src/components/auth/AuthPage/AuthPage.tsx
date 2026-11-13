// The layout for /login and /register, the same as the booking page's
// intro: the eyebrow, a two-line heading, the intro and the form on the
// left; an ivory panel on the right with what an account is for, and a
// closing line under the steps.

import type { ReactNode } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import styles from "./AuthPage.module.css";

export type AuthPanelStep = { title: string; copy: string };

export default function AuthPage({
  eyebrow,
  heading,
  intro,
  panelTitle,
  steps,
  panelNote,
  children,
}: {
  eyebrow: string;
  /** Two lines, set with a <br />. */
  heading: ReactNode;
  intro: string;
  panelTitle: string;
  steps: AuthPanelStep[];
  panelNote?: ReactNode;
  /** The form. */
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.grid}>
          <div className={styles.content}>
            <PulseEyeBrow text={eyebrow} />
            {/* Two lines, set by the break; they never wrap. */}
            <h1 className={styles.heading}>{heading}</h1>
            <p className={styles.intro}>{intro}</p>
            <div className={styles.form}>{children}</div>
          </div>

          <aside className={styles.panel}>
            <p className={styles.panelTitle}>{panelTitle}</p>
            <ol className={styles.steps}>
              {steps.map((s, i) => (
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
            {panelNote ? <p className={styles.note}>{panelNote}</p> : null}
          </aside>
        </div>
      </LayoutWrapper>
    </section>
  );
}
