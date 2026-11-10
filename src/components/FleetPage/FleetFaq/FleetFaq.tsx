// /fleet: questions about the vehicles, in the home page's FAQ cards. The
// same questions go out as FAQPage schema from the page.

import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import FaqList, {
  type FaqItem,
} from "@/components/HomePage/FaqSection/FaqList";
import styles from "./FleetFaq.module.css";

export default function FleetFaq({
  items,
  heading = "Questions about the fleet",
}: {
  items: FaqItem[];
  heading?: string;
}) {
  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <PulseEyeBrow text='FAQ' />
            <h2 className={styles.heading}>{heading}</h2>
          </div>
          <p className={styles.intro}>
            Anything else? Call dispatch any time, or ask when you book.
          </p>
        </div>
        <FaqList items={items} />
      </LayoutWrapper>
    </section>
  );
}
