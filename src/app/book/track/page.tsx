// /book/track: where a ride request stands, from the link in the success
// page and the confirmation email. Same layout as /book/success: the status
// on the left, the progress panel on the right, then the trip details and
// (for guests) an account card. A finished, cancelled or declined trip has
// no progress, so its trip details take the right column instead.

import type { Metadata } from "next";
import Link from "next/link";
import { BookingStatus } from "@prisma/client";
import SiteNav from "@/components/shared/SiteNav/SiteNav";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import WhatHappensNext, {
  type WhatHappensStep,
} from "@/components/shared/WhatHappensNext/WhatHappensNext";
import { db } from "@/lib/db";
import { SITE } from "@/config/site";
import { auth } from "../../../../auth";
import { getCompanySettings } from "../../../../actions/admin/companySettings";
import styles from "./Track.module.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Track your ride | ${SITE.name}`,
  robots: { index: false, follow: false },
};

const PAID_OR_BEYOND: BookingStatus[] = [
  "CONFIRMED",
  "ASSIGNED",
  "EN_ROUTE",
  "ARRIVED",
  "IN_PROGRESS",
  "COMPLETED",
];

const TERMINAL: BookingStatus[] = [
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
  "DECLINED",
  "REFUNDED",
  "PARTIALLY_REFUNDED",
];

function getProgressSteps(status: BookingStatus): WhatHappensStep[] {
  const isPendingReview = status === "PENDING_REVIEW";
  const isPendingPayment = status === "PENDING_PAYMENT";
  const isPaid = PAID_OR_BEYOND.includes(status);

  return [
    {
      title: "Request received",
      description:
        "Your trip is in. You'll find it in your confirmation email.",
      status: "complete",
    },
    {
      title: "Dispatch reviews",
      description: isPendingReview
        ? "We're checking the route, the timing and the car."
        : "Dispatch checked your trip and approved it.",
      status: isPendingReview ? "current" : "complete",
    },
    {
      title: "Payment",
      description: isPendingPayment
        ? "Pay by the link to confirm your ride."
        : isPaid
          ? "Payment received. Thank you."
          : "Once it's approved, we email you a secure link to pay.",
      status: isPendingPayment ? "current" : isPaid ? "complete" : "upcoming",
    },
    {
      title: "Ride confirmed",
      description: isPaid
        ? "Your chauffeur and car are booked."
        : "After payment, your chauffeur and car are booked.",
      status: isPaid ? "complete" : "upcoming",
    },
  ];
}

type Tone = "pending" | "good" | "bad" | "done";

function getStatusDisplay(status: BookingStatus): {
  label: string;
  tone: Tone;
  message: string;
} {
  switch (status) {
    case "PENDING_REVIEW":
      return {
        label: "Waiting for review",
        tone: "pending",
        message:
          "Dispatch is checking your trip. We'll email you a payment link once it's approved, usually within 24 hours.",
      };
    case "PENDING_PAYMENT":
      return {
        label: "Approved, waiting for payment",
        tone: "pending",
        message:
          "Your trip is approved. Pay by the link in your email, or the button below, to confirm your ride.",
      };
    case "CONFIRMED":
      return {
        label: "Confirmed",
        tone: "good",
        message:
          "Your ride is confirmed. We'll assign your chauffeur before the pickup.",
      };
    case "ASSIGNED":
      return {
        label: "Chauffeur assigned",
        tone: "good",
        message: "Your chauffeur is assigned to your trip.",
      };
    case "EN_ROUTE":
      return {
        label: "On the way",
        tone: "good",
        message: "Your chauffeur is on the way to your pickup.",
      };
    case "ARRIVED":
      return {
        label: "Arrived",
        tone: "good",
        message: "Your chauffeur has arrived at the pickup.",
      };
    case "IN_PROGRESS":
      return {
        label: "In progress",
        tone: "good",
        message: "Your trip is under way. Enjoy the ride.",
      };
    case "COMPLETED":
      return {
        label: "Completed",
        tone: "done",
        message: "This trip is complete. Thank you for riding with us.",
      };
    case "DECLINED":
      return {
        label: "Declined",
        tone: "bad",
        message:
          "We couldn't take this trip. Call dispatch and we'll help you find another time or option.",
      };
    case "CANCELLED":
      return {
        label: "Cancelled",
        tone: "done",
        message: "This booking has been cancelled.",
      };
    case "REFUNDED":
    case "PARTIALLY_REFUNDED":
      return {
        label: status === "REFUNDED" ? "Refunded" : "Partly refunded",
        tone: "done",
        message:
          "This booking has been refunded. Your bank may take a few days to show it.",
      };
    case "NO_SHOW":
      return {
        label: "No-show",
        tone: "bad",
        message: "This booking was marked as a no-show.",
      };
    default:
      return {
        label: String(status).replace(/_/g, " ").toLowerCase(),
        tone: "done",
        message: "",
      };
  }
}

function getNotice(status: BookingStatus) {
  if (status === "PENDING_REVIEW") {
    return (
      <>
        <strong>No payment yet.</strong> Nothing is charged until dispatch
        approves your trip and you pay by the link.
      </>
    );
  }
  if (status === "PENDING_PAYMENT") {
    return (
      <>
        <strong>One step left.</strong> Your ride is confirmed as soon as the
        payment goes through.
      </>
    );
  }
  return null;
}

function formatDateTime(d: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone,
  }).format(d);
}

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

export default async function TrackPage({
  searchParams,
}: {
  searchParams?: Promise<{ t?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const t = (sp.t ?? "").trim();

  const companySettings = await getCompanySettings();
  const companyTz = companySettings.timezone;
  const phone = companySettings.dispatchPhone || SITE.phone.display;
  const phoneTel = companySettings.dispatchPhoneRaw
    ? `+1${companySettings.dispatchPhoneRaw}`
    : SITE.phone.tel;

  const callLine = (
    <p className={styles.note}>
      Questions? Reply to your confirmation email or call dispatch on{" "}
      <a href={`tel:${phoneTel}`} className={styles.noteLink}>
        {phone}
      </a>
      .
    </p>
  );

  const booking = t
    ? await db.booking.findFirst({
        where: { guestClaimToken: t },
        select: {
          id: true,
          status: true,
          pickupAt: true,
          pickupAddress: true,
          dropoffAddress: true,
          passengers: true,
          luggage: true,
          serviceType: { select: { name: true } },
          vehicle: { select: { name: true } },
          payment: { select: { checkoutUrl: true } },
        },
      })
    : null;

  // No token, or a token that doesn't match a booking.
  if (!booking) {
    return (
      <main>
        <SiteNav variant='solid' />
        <section className={styles.section}>
          <LayoutWrapper>
            <div className={styles.grid}>
              <div className={styles.content}>
                <PulseEyeBrow text='Ride status' />
                <h1 className={styles.heading}>
                  {t ? (
                    <>
                      Link not
                      <br />
                      found
                    </>
                  ) : (
                    <>
                      Track your
                      <br />
                      ride
                    </>
                  )}
                </h1>
                <p className={styles.intro}>
                  {t
                    ? "This tracking link is invalid or has expired. Use the link in your confirmation email, or book a new ride."
                    : "Open the tracking link in your confirmation email to see where your request stands."}
                </p>
                <ArrowButton
                  href='/book'
                  text='Back to booking'
                  variant='midnight'
                />
                {callLine}
              </div>
            </div>
          </LayoutWrapper>
        </section>
      </main>
    );
  }

  const session = await auth();
  const isAuthed = Boolean(session?.user);

  const status = booking.status as BookingStatus;
  const statusDisplay = getStatusDisplay(status);
  const isTerminal = TERMINAL.includes(status);
  const confirmationCode = booking.id.slice(0, 8).toUpperCase();
  const checkoutUrl =
    status === "PENDING_PAYMENT" ? booking.payment?.checkoutUrl : null;
  const nextTrack = `?next=${encodeURIComponent(`/book/track?t=${t}`)}`;

  const tripDetails = (
    <div className={styles.card}>
      <p className={styles.cardTitle}>Trip details</p>
      <dl className={styles.trip}>
        <div className={styles.tripRow}>
          <dt className={styles.tripLabel}>Pickup</dt>
          <dd className={styles.tripValue}>
            {formatDateTime(booking.pickupAt, companyTz)}
          </dd>
        </div>
        <div className={styles.tripRow}>
          <dt className={styles.tripLabel}>Service</dt>
          <dd className={styles.tripValue}>
            {booking.serviceType?.name ?? "—"}
            {booking.vehicle?.name ? `, ${booking.vehicle.name}` : ""}
          </dd>
        </div>
        <div className={styles.tripRow}>
          <dt className={styles.tripLabel}>Travelers</dt>
          <dd className={styles.tripValue}>
            {plural(booking.passengers, "passenger")},{" "}
            {plural(booking.luggage, "bag")}
          </dd>
        </div>
        <div className={styles.tripRow}>
          <dt className={styles.tripLabel}>From</dt>
          <dd className={styles.tripValue}>{booking.pickupAddress}</dd>
        </div>
        <div className={styles.tripRow}>
          <dt className={styles.tripLabel}>To</dt>
          <dd className={styles.tripValue}>{booking.dropoffAddress}</dd>
        </div>
      </dl>
    </div>
  );

  const accountCard = isAuthed ? (
    <div className={styles.card}>
      <p className={styles.cardTitle}>All your rides</p>
      <p className={styles.cardCopy}>
        See this trip with the rest of your bookings, payments and receipts.
      </p>
      <div className={styles.cardActions}>
        <ArrowButton
          href='/dashboard/trips'
          text='View all trips'
          variant='midnight'
        />
      </div>
    </div>
  ) : (
    <div className={styles.card}>
      <p className={styles.cardTitle}>Keep your rides in one place</p>
      <p className={styles.cardCopy}>
        Create an account to follow your requests and updates, and book faster
        next time.
      </p>
      <div className={styles.cardActions}>
        <ArrowButton
          href={`/register${nextTrack}`}
          text='Create account'
          variant='midnight'
        />
        <Link href={`/login${nextTrack}`} className={styles.outline}>
          Sign in
        </Link>
      </div>
    </div>
  );

  return (
    <main>
      <SiteNav variant='solid' />
      <section className={styles.section}>
        <LayoutWrapper>
          <div className={styles.grid}>
            <div className={styles.content}>
              <PulseEyeBrow text='Track your ride' />
              {/* Two lines, set by the break; they never wrap. */}
              <h1 className={styles.heading}>
                Request
                <br />
                status
              </h1>
              {statusDisplay.message ? (
                <p className={styles.intro}>{statusDisplay.message}</p>
              ) : null}

              <dl className={styles.details}>
                <div className={styles.detail}>
                  <dt className={styles.detailLabel}>Confirmation</dt>
                  <dd className={styles.detailValue}>{confirmationCode}</dd>
                </div>
                <div className={styles.detail}>
                  <dt className={styles.detailLabel}>Status</dt>
                  <dd className={styles.detailValue}>
                    <span
                      className={`${styles.statusDot} ${styles[statusDisplay.tone]}`}
                      aria-hidden='true'
                    />
                    {statusDisplay.label}
                  </dd>
                </div>
              </dl>

              {checkoutUrl ? (
                <ArrowButton href={checkoutUrl} text='Pay and confirm' />
              ) : null}

              {callLine}
            </div>

            {isTerminal ? (
              tripDetails
            ) : (
              <WhatHappensNext
                title='Progress'
                steps={getProgressSteps(status)}
                notice={getNotice(status)}
              />
            )}
          </div>

          <div className={styles.extras}>
            {isTerminal ? null : tripDetails}
            {accountCard}
          </div>
        </LayoutWrapper>
      </section>
    </main>
  );
}
