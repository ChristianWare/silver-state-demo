// /fleet: every vehicle side by side, by passengers, bags and what it's
// best for, with its starting price when one is set. Prices come from
// Admin → Vehicle Categories (src/lib/booking/publicRates.ts); a vehicle
// without a linked category shows "See price" and the booking tool quotes it.

import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import { FLEET } from "@/lib/fleetDetails";
import { usdShort } from "@/lib/booking/rules";
import type { FleetRates } from "@/lib/booking/publicRates";
import styles from "./FleetCompare.module.css";

/** "Families, golf trips, day trips…": one sentence from the list. */
const sentence = (items: string[]) =>
  items
    .map((t, i) => (i === 0 ? t : t.charAt(0).toLowerCase() + t.slice(1)))
    .join(", ");

function priceFor(r: FleetRates | undefined) {
  if (!r) return null;
  if (r.callForPricing) return { value: "Call", label: "For a quote" };
  if (r.hourlyRateCents)
    return { value: `${usdShort(r.hourlyRateCents)}`, label: "From, per hour" };
  if (r.oneWayFromCents)
    return { value: usdShort(r.oneWayFromCents), label: "From, one way" };
  return null;
}

export default function FleetCompare({
  rates,
}: {
  rates: Map<string, FleetRates>;
}) {
  return (
    <section className={styles.section} id='compare'>
      <LayoutWrapper>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <PulseEyeBrow text='Compare' />
            <h2 className={styles.heading}>
              Pick by people
              <br />
              and bags.
            </h2>
          </div>
          <p className={styles.intro}>
            Every vehicle is late-model, black and cleaned before each ride.
            Choose the one that fits your group and your luggage.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.head} aria-hidden='true'>
            <span>Vehicle</span>
            <span>Passengers</span>
            <span>Bags</span>
            <span>Best for</span>
            <span className={styles.right}>Price</span>
          </div>

          <ul className={styles.rows}>
            {FLEET.map((v) => {
              const price = priceFor(rates.get(v.slug));
              return (
                <li key={v.slug} className={styles.row}>
                  <div className={styles.vehicle}>
                    <span className={styles.thumb}>
                      <Image
                        src={v.image.src}
                        alt=''
                        fill
                        sizes='96px'
                        className={styles.thumbImg}
                      />
                    </span>
                    <span className={styles.name}>
                      <Link
                        href={`/fleet/${v.slug}`}
                        className={styles.nameLink}
                      >
                        {v.name}
                      </Link>
                      <span className={styles.cls}>{v.specs[0]?.value}</span>
                    </span>
                  </div>
                  <p className={styles.fig}>
                    <span className={styles.figLabel}>Passengers</span>
                    <span className={styles.figValue}>
                      Up to {v.passengers}
                    </span>
                  </p>
                  <p className={styles.fig}>
                    <span className={styles.figLabel}>Bags</span>
                    <span className={styles.figValue}>Up to {v.luggage}</span>
                  </p>
                  <p className={styles.best}>
                    <span className={styles.figLabel}>Best for</span>
                    {sentence(v.bestFor)}
                  </p>
                  <p className={`${styles.fig} ${styles.right}`}>
                    <span className={styles.figLabel}>
                      {price ? price.label : "Price"}
                    </span>
                    <span className={styles.figValue}>
                      {price ? price.value : "See price"}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.foot}>
          <p className={styles.note}>
            Car seats available on request. Tell us the child&apos;s age when
            you book.
          </p>
          <ArrowButton
            href='/book'
            text='See prices in the booking tool'
            variant='midnight'
          />
        </div>
      </LayoutWrapper>
    </section>
  );
}
