"use client";

// The time in Las Vegas, refreshed every 30 seconds, plus whether a desk is
// open now. Read in the browser only: the server renders without it, so the
// first paint matches on both sides and the status fills in after.

import { useSyncExternalStore } from "react";
import { CONTACT_TIMEZONE, type Hours } from "@/lib/contact";

type VegasNow = { day: number; minutes: number; label: string };

const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 30_000);
  return () => window.clearInterval(id);
};

// Rounded to the minute, so the snapshot only changes when the clock does.
let cache: { key: number; value: VegasNow } | null = null;

function read(): VegasNow {
  const now = new Date();
  const key = Math.floor(now.getTime() / 60_000);
  if (cache && cache.key === key) return cache.value;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CONTACT_TIMEZONE,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const weekday = get("weekday");
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const value = {
    day: days.indexOf(weekday),
    minutes: hour * 60 + minute,
    label: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} on ${weekday}`,
  };
  cache = { key, value };
  return value;
}

export function useVegasTime(): VegasNow | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "Open now", or "Closed, opens at 08:00" (today, or the next open day). */
export function deskStatus(
  hours: Hours,
  now: VegasNow,
): { open: boolean; text: string } {
  if ("always" in hours) return { open: true, text: "Open now, any hour" };
  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);
  const today = hours.days.includes(now.day);
  if (today && now.minutes >= open && now.minutes < close) {
    return { open: true, text: `Open now, until ${hours.close}` };
  }
  if (today && now.minutes < open) {
    return { open: false, text: `Closed, opens at ${hours.open}` };
  }
  const names = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  for (let i = 1; i <= 7; i++) {
    const d = (now.day + i) % 7;
    if (hours.days.includes(d)) {
      return {
        open: false,
        text:
          i === 1
            ? `Closed, opens tomorrow at ${hours.open}`
            : `Closed, opens ${names[d]} at ${hours.open}`,
      };
    }
  }
  return { open: false, text: "Closed" };
}
