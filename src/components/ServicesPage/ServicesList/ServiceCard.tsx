// One service card: photo beside the name, a short line, the summary, a
// "best for" line with one key number, and a "Learn more" link. Used by the
// services page list and the "More services" block on each service page.

import Image from "next/image";
import Link from "next/link";
import type { ServiceCardData } from "./serviceCards";
import styles from "./ServicesList.module.css";

export default function ServiceCard({
  s,
  headingLevel = "h3",
}: {
  s: ServiceCardData;
  /** h3 on the services page; h3 under the "More services" h2 too. */
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <>
      <div className={styles.photo}>
        <Image
          src={s.img}
          alt={s.alt}
          fill
          sizes='(max-width: 568px) 100vw, 200px'
          className={styles.img}
        />
      </div>

      <div className={styles.body}>
        <Heading className={styles.title}>{s.title}</Heading>
        <p className={styles.sub}>{s.sub}</p>
        <p className={styles.copy}>
          {s.copy} {s.more}
        </p>

        <div className={styles.foot}>
          <div className={styles.footItem}>
            <span className={styles.label}>Best for</span>
            <span className={styles.footText}>{s.bestFor}</span>
          </div>
          <div className={`${styles.footItem} ${styles.footRight}`}>
            <span className={styles.label}>{s.stat.label}</span>
            <span className={styles.footValue}>{s.stat.value}</span>
          </div>
        </div>

        <Link href={`/services/${s.slug}`} className={styles.link}>
          Learn more
          <span className={styles.srOnly}> about {s.title}</span>
        </Link>
      </div>
    </>
  );
}
