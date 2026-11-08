// Home page: reviews. Three cards that hold the operator's real Google
// reviews (placeholders until they're pasted in), and a link to the Google
// Business Profile saved in Admin → Company Settings.

import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import { SITE } from "@/config/site";
import { getCompanySettings } from "../../../../actions/admin/companySettings";
import styles from "./ReviewsSection.module.css";

type Review = {
  quote: string;
  name: string;
  trip: string;
  rating: number;
};

// Replace with the operator's real Google reviews, word for word.
const REVIEWS: Review[] = [
  {
    quote: "[Review placeholder — shows the operator's real Google reviews]",
    name: "Rider name",
    trip: "Airport pickup",
    rating: 5,
  },
  {
    quote: "[Review placeholder — shows the operator's real Google reviews]",
    name: "Rider name",
    trip: "Wedding",
    rating: 5,
  },
  {
    quote: "[Review placeholder — shows the operator's real Google reviews]",
    name: "Rider name",
    trip: "Night on the Strip",
    rating: 5,
  },
];

export default async function ReviewsSection() {
  const s = await getCompanySettings();
  const company = s.companyName || SITE.name;
  const googleUrl =
    s.googleBusinessUrl ||
    `https://www.google.com/search?q=${encodeURIComponent(`${company} ${SITE.market.city} reviews`)}`;

  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <PulseEyeBrow text='What riders say' />
            <h2 className={styles.heading}>Reviews from real riders.</h2>
          </div>
          <p className={styles.intro}>
            Every review here comes from our Google Business Profile, word for
            word. Read the rest on Google.
          </p>
        </div>

        <ul className={styles.cards}>
          {REVIEWS.map((r, i) => (
            <li key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <Stars rating={r.rating} />
                <span className={styles.source}>Google review</span>
              </div>

              <blockquote className={styles.quote}>
                <p>{r.quote}</p>
              </blockquote>

              <div className={styles.cardBottom}>
                <p className={styles.score}>
                  {r.rating.toFixed(1)}
                  <span className={styles.scoreOf}>/ 5</span>
                </p>
                <dl className={styles.meta}>
                  <div>
                    <dt className={styles.metaLabel}>Rider</dt>
                    <dd className={styles.metaValue}>{r.name}</dd>
                  </div>
                  <div>
                    <dt className={styles.metaLabel}>Trip</dt>
                    <dd className={styles.metaValue}>{r.trip}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>

        <a
          href={googleUrl}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.googleLink}
        >
          Read our reviews on Google
        </a>
      </LayoutWrapper>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox='0 0 24 24'
          width='14'
          height='14'
          aria-hidden='true'
          className={i < rating ? styles.starOn : styles.starOff}
        >
          <path
            d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5L12 17.3l-5.9 3.2 1.3-6.5-4.9-4.6 6.6-.8z'
            fill='currentColor'
          />
        </svg>
      ))}
    </span>
  );
}
