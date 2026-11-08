// Home page: FAQ, written as a short note from the owner and the five
// questions riders ask most. Numbers come from the booking rules, and the
// same questions go out as FAQPage schema.

import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import { SITE } from "@/config/site";
import {
  AIRPORT_FREE_WAIT_MINUTES,
  BOOKING_LEAD_HOURS,
  CANCELLATION_FREE_HOURS,
} from "@/lib/booking/rules";
import { BUSINESS_REF } from "@/lib/schema";
import { getCompanySettings } from "../../../../actions/admin/companySettings";
import FaqList, { type FaqItem } from "./FaqList";
import styles from "./FaqSection.module.css";

const FAQS: FaqItem[] = [
  {
    topic: "Booking",
    question: "How far ahead should I book?",
    answer: `Book at least ${BOOKING_LEAD_HOURS} hours ahead online. For conventions, fight weekends and holidays, book as early as you can; cars run out first on the biggest weekends.`,
  },
  {
    topic: "Airport pickups",
    question: "What happens if my flight is delayed?",
    answer: `We track your flight and adjust your pickup time automatically. You get ${AIRPORT_FREE_WAIT_MINUTES} minutes of free wait after landing.`,
  },
  {
    topic: "Airport pickups",
    question: "Where do I meet my chauffeur at the airport?",
    answer:
      "Inside baggage claim, holding a sign with your name. They'll help with your bags and walk you to the car.",
  },
  {
    topic: "Pricing",
    question: "Is the price really the price?",
    answer:
      "Yes. The booking tool shows your total before you pay. There's no surge pricing. Gratuity is your choice.",
  },
  {
    topic: "Changes",
    question: "Can I cancel?",
    answer: `Yes. Cancel up to ${CANCELLATION_FREE_HOURS} hours before pickup for a full refund.`,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  about: BUSINESS_REF,
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default async function FaqSection() {
  const s = await getCompanySettings();
  const phone = s.dispatchPhone || SITE.phone.display;
  const phoneTel = s.dispatchPhoneRaw
    ? `+1${s.dispatchPhoneRaw}`
    : SITE.phone.tel;
  const email = s.supportEmail || SITE.email.support;

  return (
    <section className={styles.section}>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LayoutWrapper>
        <div className={styles.top}>
          <div className={styles.letter}>
            <div className={styles.photo}>
              <Image
                src='/people/DO.jpg'
                alt={SITE.owner.name}
                fill
                sizes='96px'
                className={styles.img}
              />
            </div>
            <div className={styles.letterBody}>
              <p className={styles.letterCopy}>
                Most riders ask one of these five things before they book, so
                here they are with my answers. Anything else, call us on{" "}
                <a href={`tel:${phoneTel}`}>{phone}</a> or write to{" "}
                <a href={`mailto:${email}`}>{email}</a>.
              </p>
              <p className={styles.signOff}>Yours,</p>
              <p className={styles.signName}>{SITE.owner.name}</p>
              <p className={styles.signTitle}>{SITE.owner.title}</p>
            </div>
          </div>

          <div className={styles.headingWrap}>
            <PulseEyeBrow text='FAQ' />
            <h2 className={styles.heading}>Before you book</h2>
          </div>
        </div>

        <FaqList items={FAQS} />
      </LayoutWrapper>
    </section>
  );
}
