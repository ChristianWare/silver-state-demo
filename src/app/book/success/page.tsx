// /book/success: after a ride request goes in. The heading, the request ID
// and the link to track it on the left; what happens next on the right, the
// same panel as the booking page's "How booking works". Under them, the
// estimate PDF and (for guests) an account to keep the ride in. Then the FAQ.

import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/shared/SiteNav/SiteNav";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import WhatHappensNext from "@/components/shared/WhatHappensNext";
import FaqSection from "@/components/HomePage/FaqSection/FaqSection";
import { SITE } from "@/config/site";
import { getCompanySettings } from "../../../../actions/admin/companySettings";
import SuccessClient from "./SuccessClient";
import EstimateDownload from "./EstimateDownload";
import styles from "./BookSuccess.module.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Request received | ${SITE.name}`,
  robots: { index: false, follow: false },
};

export default async function BookSuccessPage(props: {
  searchParams?: Promise<{ id?: string; t?: string }>;
}) {
  const sp = (await props.searchParams) ?? {};
  const id = sp.id ?? null;
  const t = sp.t ?? null;

  const trackHref = t ? `/book/track?t=${encodeURIComponent(t)}` : null;
  const nextTrack = trackHref ? `?next=${encodeURIComponent(trackHref)}` : "";

  // A tracking token means the rider booked as a guest.
  const isGuestCheckout = Boolean(t);

  const companySettings = await getCompanySettings();
  const phone = companySettings.dispatchPhone || SITE.phone.display;
  const phoneTel = companySettings.dispatchPhoneRaw
    ? `+1${companySettings.dispatchPhoneRaw}`
    : SITE.phone.tel;

  return (
    <main>
      <SiteNav variant='solid' />
      <SuccessClient />

      <section className={styles.section}>
        <LayoutWrapper>
          <div className={styles.grid}>
            <div className={styles.content}>
              <PulseEyeBrow text='Request received' />
              {/* Two lines, set by the break; they never wrap. */}
              <h1 className={styles.heading}>
                Request
                <br />
                received
              </h1>
              <p className={styles.intro}>
                Dispatch will check your trip and email you a payment link once
                it&apos;s approved, usually within 24 hours. Nothing is charged
                before then.
              </p>

              {id ? (
                <dl className={styles.details}>
                  <div className={styles.detail}>
                    <dt className={styles.detailLabel}>Request ID</dt>
                    <dd className={styles.detailValue}>{id.toUpperCase()}</dd>
                  </div>
                  <div className={styles.detail}>
                    <dt className={styles.detailLabel}>Status</dt>
                    <dd className={styles.detailValue}>
                      <span className={styles.statusDot} aria-hidden='true' />
                      Waiting for review
                    </dd>
                  </div>
                </dl>
              ) : null}

              {trackHref ? (
                <ArrowButton
                  href={trackHref}
                  text='Track your request'
                  variant='midnight'
                />
              ) : null}

              <p className={styles.note}>
                A confirmation with your trip details is on its way to your
                inbox. Don&apos;t see it? Check spam, or call dispatch on{" "}
                <a href={`tel:${phoneTel}`} className={styles.noteLink}>
                  {phone}
                </a>
                .
              </p>
            </div>

            <WhatHappensNext />
          </div>

          {id || isGuestCheckout ? (
            <div className={styles.extras}>
              {id ? <EstimateDownload bookingId={id} /> : null}

              {isGuestCheckout && trackHref ? (
                <div className={styles.card}>
                  <p className={styles.cardTitle}>
                    Keep your rides in one place
                  </p>
                  <p className={styles.cardCopy}>
                    Create an account to follow your requests and updates, and
                    book faster next time.
                  </p>
                  <div className={styles.cardActions}>
                    <ArrowButton
                      href={`/register${nextTrack}`}
                      text='Create account'
                      variant='midnight'
                    />
                    <Link
                      href={`/login${nextTrack}`}
                      className={styles.outline}
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </LayoutWrapper>
      </section>

      <FaqSection />
    </main>
  );
}
