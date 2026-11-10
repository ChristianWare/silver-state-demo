// /fleet/[slug]: one vehicle in full.
//
// Intro: the vehicle on an ivory panel with the capacity track, beside its
// name, intro, what it's best for, three stat boxes and the buttons.
// Details: the rows (vehicle details, features, specs, rates and booking
// rules, policies) beside a sticky navy card with a photo and the starting
// price. Then a two-photo gallery and the other vehicles.
//
// Prices come from Admin → Vehicle Categories (publicRates.ts); booking
// rules and policies from src/config/site.ts → booking, so the page always
// matches the booking tool.

import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import { SITE } from "@/config/site";
import { FLEET, type FleetVehicle } from "@/lib/fleetDetails";
import type { FleetRates } from "@/lib/booking/publicRates";
import {
  AIRPORT_FREE_WAIT_MINUTES,
  CANCELLATION_POLICY,
  CANCELLATION_POLICY_DETAIL,
  EXTRA_STOP_FEE_LABEL,
  HOURLY_MIN_HOURS,
  MEET_AND_GREET_FREE,
  usdShort,
} from "@/lib/booking/rules";
import { getCompanySettings } from "../../../../actions/admin/companySettings";
import styles from "./FleetDetail.module.css";

const STOPS = [...FLEET].sort((a, b) => a.passengers - b.passengers);

export default async function FleetDetail({
  vehicle: v,
  rates,
}: {
  vehicle: FleetVehicle;
  /** Null until a vehicle category is linked to this page in the admin. */
  rates: FleetRates | null;
}) {
  const s = await getCompanySettings();
  const phone = s.dispatchPhone || SITE.phone.display;
  const phoneTel = s.dispatchPhoneRaw
    ? `+1${s.dispatchPhoneRaw}`
    : SITE.phone.tel;

  // The big number in the navy card.
  const price = rates?.callForPricing
    ? {
        value: "Call",
        label: rates.callForPricingMessage || "For a custom quote",
      }
    : rates?.hourlyRateCents
      ? {
          value: usdShort(rates.hourlyRateCents),
          label: `Per hour, ${rates.hourlyMinHours}-hour minimum`,
        }
      : rates?.oneWayFromCents
        ? { value: usdShort(rates.oneWayFromCents), label: "From, one way" }
        : { value: `Up to ${v.passengers}`, label: "Passengers" };

  const rateLines = [
    ...(rates?.callForPricing
      ? [rates.callForPricingMessage || "Call for a custom quote"]
      : [
          rates?.hourlyRateCents
            ? `By the hour from ${usdShort(rates.hourlyRateCents)}/hr, ${rates.hourlyMinHours}-hour minimum${
                rates.hourlyMinimumCents
                  ? ` (from ${usdShort(rates.hourlyMinimumCents)} total)`
                  : ""
              }`
            : `Hourly bookings: ${HOURLY_MIN_HOURS}-hour minimum`,
          ...(rates?.oneWayFromCents
            ? [`One-way rides from ${usdShort(rates.oneWayFromCents)}`]
            : []),
          ...(rates?.airportFromCents
            ? [`Airport transfers from ${usdShort(rates.airportFromCents)}`]
            : []),
        ]),
    `Airport pickups: up to ${AIRPORT_FREE_WAIT_MINUTES} minutes of free wait after your flight lands`,
    `Meet & greet inside baggage claim: ${MEET_AND_GREET_FREE ? "free" : "available"}`,
    `Extra stops: ${EXTRA_STOP_FEE_LABEL}`,
    "No surge pricing. Your exact price shows in the booking tool before you book.",
  ];

  const others = FLEET.filter((o) => o.slug !== v.slug);

  return (
    <>
      {/* ── Intro ── */}
      <section className={styles.intro}>
        <LayoutWrapper>
          <nav className={styles.crumbs} aria-label='Breadcrumb'>
            <Link href='/fleet'>Fleet</Link>
            <span aria-hidden='true'>/</span>
            <span aria-current='page'>{v.name}</span>
          </nav>

          <div className={styles.introGrid}>
            <div className={styles.media}>
              <Image
                src={v.image.src}
                alt={v.image.alt}
                fill
                priority
                sizes='(max-width: 1068px) 100vw, 55vw'
                className={styles.cutout}
              />
              <div className={styles.track} aria-hidden='true'>
                <span className={styles.line} />
                {STOPS.map((o) => (
                  <span
                    key={o.slug}
                    className={`${styles.stop} ${o.slug === v.slug ? styles.stopActive : ""}`}
                  >
                    <span className={styles.stopTag}>
                      {o.passengers}
                      <span className={styles.stopName}> · {o.short}</span>
                    </span>
                    <span className={styles.stopDot} />
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.side}>
              <PulseEyeBrow text={v.vehicleClass} />
              <h1 className={styles.heading}>{v.name}</h1>
              <p className={styles.copy}>{v.intro}</p>

              <dl className={styles.stats}>
                <div className={styles.stat}>
                  <dt className={styles.statLabel}>Passengers</dt>
                  <dd className={styles.statValue}>Up to {v.passengers}</dd>
                </div>
                <div className={styles.stat}>
                  <dt className={styles.statLabel}>Bags</dt>
                  <dd className={styles.statValue}>{v.luggage}</dd>
                </div>
                <div className={styles.stat}>
                  <dt className={styles.statLabel}>{v.extra.label}</dt>
                  <dd className={styles.statValue}>{v.extra.value}</dd>
                </div>
              </dl>

              <div className={styles.best}>
                <span className={styles.label}>Best for</span>
                <ul className={styles.bestList}>
                  {v.bestFor.map((b) => (
                    <li key={b} className={styles.bestItem}>
                      <span className={styles.dot} aria-hidden='true' />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.actions}>
                <ArrowButton href='/book' text={v.cta} variant='midnight' />
                <a href={`tel:${phoneTel}`} className={styles.textLink}>
                  Call {phone}
                </a>
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </section>

      {/* ── Details ── */}
      <section className={styles.details} aria-label={`${v.name} details`}>
        <LayoutWrapper>
          <div className={styles.layout}>
            <div className={styles.content}>
              <div className={styles.row}>
                <h2 className={`${styles.rowTitle} h4`}>Vehicle details</h2>
                <div className={styles.rowBody}>
                  <p className={styles.text}>{v.about}</p>
                </div>
              </div>

              <div className={styles.row}>
                <h2 className={`${styles.rowTitle} h4`}>Features</h2>
                <ul className={`${styles.rowBody} ${styles.checks}`}>
                  {v.features.map((f) => (
                    <li key={f} className={styles.checkItem}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.row}>
                <h2 className={`${styles.rowTitle} h4`}>Specs</h2>
                <dl className={`${styles.rowBody} ${styles.specs}`}>
                  {v.specs.map((sp) => (
                    <div key={sp.label} className={styles.spec}>
                      <dt className={styles.label}>{sp.label}</dt>
                      <dd className={styles.specValue}>{sp.value}</dd>
                    </div>
                  ))}
                  <div className={styles.spec}>
                    <dt className={styles.label}>Capacity</dt>
                    <dd className={styles.specValue}>
                      Up to {v.passengers} passengers, {v.luggage} bags
                    </dd>
                  </div>
                </dl>
              </div>

              <div className={styles.row}>
                <h2 className={`${styles.rowTitle} h4`}>Rates & booking</h2>
                <ul className={`${styles.rowBody} ${styles.checks}`}>
                  {rateLines.map((r) => (
                    <li key={r} className={styles.checkItem}>
                      <Check />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.row}>
                <h2 className={`${styles.rowTitle} h4`}>Policies</h2>
                <div className={styles.rowBody}>
                  <p className={styles.text}>{CANCELLATION_POLICY}</p>
                  <ul className={styles.checks}>
                    {[CANCELLATION_POLICY_DETAIL, ...(v.policyNotes ?? [])].map(
                      (p) => (
                        <li key={p} className={styles.checkItem}>
                          <Check />
                          {p}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              <div className={styles.gallery}>
                {v.gallery.map((g) => (
                  <div key={g.src} className={styles.galleryImage}>
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes='(max-width: 1068px) 50vw, 30vw'
                      className={styles.img}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky navy card */}
            <aside className={styles.aside}>
              <div className={styles.summary}>
                <div className={styles.summaryPhoto}>
                  <Image
                    src={v.gallery[0]?.src ?? v.image.src}
                    alt=''
                    fill
                    sizes='400px'
                    className={styles.img}
                  />
                </div>
                <div className={styles.summaryStat}>
                  <p className={styles.summaryValue}>{price.value}</p>
                  <span className={styles.summaryLabel}>{price.label}</span>
                </div>
                <ul className={styles.chips}>
                  {v.features.slice(0, 4).map((f) => (
                    <li key={f} className={styles.chip}>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className={styles.summaryFoot}>
                  <ArrowButton href='/book' text={v.cta} variant='white' />
                  <p className={styles.summaryCall}>
                    Or call <a href={`tel:${phoneTel}`}>{phone}</a>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </LayoutWrapper>
      </section>

      {/* ── Other vehicles ── */}
      <section className={styles.others} aria-labelledby='other-vehicles'>
        <LayoutWrapper>
          <h2 id='other-vehicles' className={`${styles.othersTitle} h4`}>
            The rest of the fleet
          </h2>
          <ul className={styles.otherList}>
            {others.map((o) => (
              <li key={o.slug} className={styles.other}>
                <span className={styles.otherImg}>
                  <Image
                    src={o.image.src}
                    alt=''
                    fill
                    sizes='(max-width: 568px) 100vw, 25vw'
                    className={styles.cutout}
                  />
                </span>
                <Link href={`/fleet/${o.slug}`} className={styles.otherName}>
                  {o.name}
                </Link>
                <span className={styles.otherMeta}>
                  Up to {o.passengers} passengers · {o.luggage} bags
                </span>
              </li>
            ))}
          </ul>
        </LayoutWrapper>
      </section>
    </>
  );
}

function Check() {
  return (
    <svg
      className={styles.check}
      viewBox='0 0 24 24'
      width='16'
      height='16'
      aria-hidden='true'
    >
      <path
        d='M5 12.5l4.5 4.5L19 7.5'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
