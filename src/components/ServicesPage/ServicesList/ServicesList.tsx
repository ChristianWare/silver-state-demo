// Services page: every service, two to a row (one at 1068px and below).
// The card is ServiceCard; each service's extra details are in
// serviceCards.ts.

import LayoutWrapper from "@/components/shared/LayoutWrapper";
import ServiceCard from "./ServiceCard";
import { SERVICE_CARDS } from "./serviceCards";
import styles from "./ServicesList.module.css";

export default function ServicesList() {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <h2 className={styles.srOnly}>All our services</h2>
        <ul className={styles.list}>
          {SERVICE_CARDS.map((s) => (
            <li key={s.slug} className={styles.item}>
              <ServiceCard s={s} />
            </li>
          ))}
        </ul>
      </LayoutWrapper>
    </section>
  );
}
