"use client";

// The FAQ cards: two staggered columns on desktop, one column (in order) on
// tablet and phone. One answer open at a time. Answers stay in the page when
// folded so search engines and find-in-page still see them.

import { useState } from "react";
import styles from "./FaqSection.module.css";

export type FaqItem = { topic: string; question: string; answer: string };

export default function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  // Even cards on the left, odd on the right; `order` puts them back in
  // sequence when the columns collapse into one.
  const columns = [
    items.map((f, i) => ({ f, i })).filter(({ i }) => i % 2 === 0),
    items.map((f, i) => ({ f, i })).filter(({ i }) => i % 2 === 1),
  ];

  return (
    <div className={styles.list}>
      {columns.map((col, c) => (
        <div key={c} className={styles.column}>
          {col.map(({ f, i }) => {
            const isOpen = open === i;
            const answerId = `faq-answer-${i}`;
            return (
              <article
                key={f.question}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                style={{ order: i }}
              >
                <div className={styles.itemHead}>
                  <p className={styles.dear}>Dear Silver State,</p>
                  <h3 className={styles.question}>{f.question}</h3>
                  <div className={styles.itemFoot}>
                    <span className={styles.topic}>{f.topic}</span>
                    <button
                      type='button'
                      className={styles.toggle}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      {isOpen ? "Fold it away" : "Read the answer"}
                      <span className={styles.toggleBox} aria-hidden='true'>
                        <svg viewBox='0 0 24 24' width='14' height='14'>
                          <path
                            d={isOpen ? "M6 12h12" : "M12 6v12M6 12h12"}
                            stroke='currentColor'
                            strokeWidth='1.8'
                            strokeLinecap='round'
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>

                <div
                  id={answerId}
                  className={styles.answerWrap}
                  inert={!isOpen}
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answer}>{f.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ))}
    </div>
  );
}
