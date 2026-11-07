"use client";

// The hero's mini booking tool: a date and a passenger count, then "Book
// now" opens the full booking tool with both filled in. It hands them over
// the same way the booking tool already reads a prefill (sessionStorage
// "booking_prefill", read once on /book).

import { useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Arrow from "@/components/shared/icons/Arrow/Arrow";
import { SITE } from "@/config/site";
import styles from "./HeroBooking.module.css";

const MAX_PASSENGERS = 14;

/** The earliest date the booking tool accepts (lead time from site config). */
function earliestDate(): string {
  const d = new Date(Date.now() + SITE.booking.leadHours * 60 * 60 * 1000);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const noopSubscribe = () => () => {};

/** "2026-11-09" → "Mon, Nov 9" */
function formatDate(value: string): string {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return "Pick a date";
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function HeroBooking() {
  const router = useRouter();
  const dateRef = useRef<HTMLInputElement>(null);
  // The earliest date is read in the browser only (the server's clock and
  // time zone can differ), so the first render matches on both sides.
  const minDate = useSyncExternalStore(noopSubscribe, earliestDate, () => "");
  const [picked, setPicked] = useState("");
  const date = picked || minDate;
  const [passengers, setPassengers] = useState(2);

  const openPicker = () => {
    const el = dateRef.current;
    if (!el) return;
    try {
      el.showPicker();
    } catch {
      el.focus();
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      sessionStorage.setItem(
        "booking_prefill",
        JSON.stringify({ pickupAtDate: date || undefined, passengers }),
      );
    } catch {
      // Private mode or storage blocked: the booking tool just opens empty.
    }
    router.push("/book");
  };

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      aria-label='Quick booking'
    >
      <div className={styles.field} onClick={openPicker}>
        <label htmlFor='hero-date' className={styles.label}>
          Date
        </label>
        <span className={styles.value}>
          {date ? formatDate(date) : "Pick a date"}
          <Chevron />
        </span>
        <input
          ref={dateRef}
          id='hero-date'
          type='date'
          className={styles.dateInput}
          value={date}
          min={minDate || undefined}
          onChange={(e) => setPicked(e.target.value)}
        />
      </div>

      <div className={styles.divider} aria-hidden='true' />

      <div className={styles.field}>
        <label htmlFor='hero-passengers' className={styles.label}>
          Passengers
        </label>
        <span className={styles.value}>
          {passengers} {passengers === 1 ? "passenger" : "passengers"}
          <Chevron />
        </span>
        <select
          id='hero-passengers'
          className={styles.select}
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
        >
          {Array.from({ length: MAX_PASSENGERS }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "passenger" : "passengers"}
            </option>
          ))}
        </select>
      </div>

      <button type='submit' className={styles.btn}>
        Book now
        <span className={styles.btnBox} aria-hidden='true'>
          <Arrow className={styles.btnArrow} />
        </span>
      </button>
    </form>
  );
}

function Chevron() {
  return (
    <svg
      className={styles.chevron}
      viewBox='0 0 24 24'
      width='14'
      height='14'
      aria-hidden='true'
    >
      <path
        d='M6 9l6 6 6-6'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
