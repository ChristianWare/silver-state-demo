// The services page cards: each service's photo, short line, extra
// sentence, "best for" and key number, by slug. Numbers come from the
// booking rules and the fleet. A service only has a card if it's in
// servicesData, so the cards, the sitemap and /services/[slug] agree.

import { servicesData, type ServiceEntry } from "@/lib/services";
import { fleetData } from "@/lib/data";
import {
  AIRPORT_FREE_WAIT_MINUTES,
  HOURLY_MIN_HOURS,
} from "@/lib/booking/rules";

const LARGEST = Math.max(...fleetData.map((v) => v.passengers));

export type Details = {
  /** Short line under the name. */
  sub: string;
  /** Added after the one-line summary. */
  more: string;
  bestFor: string;
  stat: { label: string; value: string };
  img: string;
  alt: string;
};

const DETAILS: Record<string, Details> = {
  "airport-transfers": {
    sub: "LAS, Henderson Executive and North Las Vegas",
    more: "We track your flight and meet you inside baggage claim with a name sign.",
    bestFor: "Arrivals, departures, private jets",
    stat: { label: "Free wait", value: `${AIRPORT_FREE_WAIT_MINUTES} min` },
    img: "/img7.jpg",
    alt: "Traveler stepping out of a black car at the airport terminal",
  },
  "hourly-chauffeur": {
    sub: `${HOURLY_MIN_HOURS}-hour minimum`,
    more: "Your chauffeur waits nearby and pulls up when you text, for as many stops as you like.",
    bestFor: "Date nights, client dinners, shopping days",
    stat: { label: "Minimum", value: `${HOURLY_MIN_HOURS} hrs` },
    img: "/img4.jpg",
    alt: "Chauffeur in a suit waiting beside a black car",
  },
  "corporate-travel": {
    sub: "One monthly invoice",
    more: "Employees book their own rides, or a travel manager books for them, with a receipt for each.",
    bestFor: "Conventions, client pickups, roadshows",
    stat: { label: "Billing", value: "Monthly" },
    img: "/img8.jpg",
    alt: "Executive with a coffee in the back of a car",
  },
  weddings: {
    sub: "Chapel to reception",
    more: "A stretch limousine, luxury SUV or Sprinter, plus shuttles between the hotel, the ceremony and the reception.",
    bestFor: "Couples, wedding parties, guests",
    stat: { label: "Typical", value: "3–5 hrs" },
    img: "/img10.jpg",
    alt: "Bride holding flowers in the back of a car",
  },
  "nightlife-events": {
    sub: "Door drop-off and pickup",
    more: "We text you the pickup spot before the show lets out, and there's no surge afterward.",
    bestFor: "Concerts, fights, games, the clubs",
    stat: { label: "Surge", value: "None" },
    img: "/img11.jpg",
    alt: "Rider laughing out of a car window on a night out",
  },
  "group-transportation": {
    sub: "Sprinters and motor coaches",
    more: "Bigger groups ride in several vehicles on one booking, with one invoice.",
    bestFor: "Bachelor parties, golf trips, conference teams",
    stat: { label: "Seats", value: `Up to ${LARGEST}` },
    img: "/vehicles/sprinteriii.jpg",
    alt: "Executive Sprinter waiting beside a private jet",
  },
  "point-to-point": {
    sub: "One ride, door to door",
    more: "Hotel to restaurant, home to the Strip, or across the valley to Henderson or Summerlin.",
    bestFor: "Dinners, meetings, a ride home",
    stat: { label: "Price", value: "Upfront" },
    img: "/images/other/herov.jpg",
    alt: "The Las Vegas Valley lit up at night",
  },
  "day-trips": {
    sub: "Hoover Dam to Zion",
    more: "Book by the hour, stop wherever the view tells you to, and be back for dinner.",
    bestFor: "Sightseeing, photos, a day out of the city",
    stat: { label: "Hoover Dam", value: "45 min" },
    img: "/img2.png",
    alt: "Black SUV on the open desert road",
  },
};

export const SERVICE_CARDS = servicesData.flatMap((s) => {
  const d = DETAILS[s.slug];
  return d ? [{ ...s, ...d }] : [];
});

export type ServiceCardData = ServiceEntry & Details;

/** Turns a string into a repeatable number (same string, same number). */
function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * `count` other services in a shuffled order, picked from the current
 * slug. Each page gets its own mix, but the same page always gets the same
 * one, so the page can be built ahead of time and never flickers.
 */
export function otherServiceCards(slug: string, count = 3) {
  let seed = hash(slug) || 1;
  const rand = () => {
    // xorshift32
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };
  const pool = SERVICE_CARDS.filter((s) => s.slug !== slug);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}
