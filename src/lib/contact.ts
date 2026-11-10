/**
 * The contact page's desks, hours and "where we meet you" details. Swap per
 * operator. The main dispatch number and email come from Admin → Company
 * Settings (falling back to src/config/site.ts); the desk numbers below
 * use 555 numbers, which are reserved for fiction, so a demo never dials a
 * real person.
 */

/** Las Vegas time (Pacific). Not SITE.timezone, which is the template's. */
export const CONTACT_TIMEZONE = "America/Los_Angeles";

/** Days are 0 = Sunday … 6 = Saturday. Times are "HH:MM", 24-hour. */
export type Hours =
  | { always: true; label: string }
  | { days: number[]; open: string; close: string; label: string };

export type Desk = {
  id: string;
  name: string;
  copy: string;
  phone: string;
  email: string;
  hours: Hours;
};

const WEEKDAYS = [1, 2, 3, 4, 5];
const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6];

export const DESKS: Desk[] = [
  {
    id: "dispatch",
    name: "Dispatch",
    copy: "Rides today, a delayed flight, a change of plan or a chauffeur you can't find.",
    phone: "(702) 555-0142",
    email: "dispatch@silverstateblackcar.com",
    hours: { always: true, label: "24 hours, every day" },
  },
  {
    id: "reservations",
    name: "Reservations",
    copy: "Rides you're booking ahead, quotes for long-distance trips and anything the booking tool can't do.",
    phone: "(702) 555-0143",
    email: "reservations@silverstateblackcar.com",
    hours: {
      days: EVERY_DAY,
      open: "07:00",
      close: "22:00",
      label: "Every day, 07:00 to 22:00",
    },
  },
  {
    id: "corporate",
    name: "Corporate accounts",
    copy: "Opening an account, monthly invoices, convention shuttles and executive travel.",
    phone: "(702) 555-0144",
    email: "corporate@silverstateblackcar.com",
    hours: {
      days: WEEKDAYS,
      open: "08:00",
      close: "17:00",
      label: "Monday to Friday, 08:00 to 17:00",
    },
  },
  {
    id: "events",
    name: "Weddings & groups",
    copy: "Wedding days, guest shuttles, Sprinters and coaches for groups of 15 or more.",
    phone: "(702) 555-0145",
    email: "events@silverstateblackcar.com",
    hours: {
      days: [1, 2, 3, 4, 5, 6],
      open: "09:00",
      close: "18:00",
      label: "Monday to Saturday, 09:00 to 18:00",
    },
  },
];

/** "Where we meet you": one tab per place, with its own map highlight. */
export const MEET_POINTS = [
  {
    id: "t1",
    tab: "Harry Reid, Terminal 1",
    pin: "Terminal 1",
    note: "Most domestic flights, including Southwest. Meet your chauffeur inside baggage claim.",
  },
  {
    id: "t3",
    tab: "Harry Reid, Terminal 3",
    pin: "Terminal 3",
    note: "International flights and several domestic airlines. Meet your chauffeur inside baggage claim.",
  },
] as const;

export const MEET_BLOCKS = [
  {
    title: "At the airport",
    copy: "We track your flight and your chauffeur waits inside baggage claim with your name on a sign. They'll take the bags and walk you to the car.",
    small:
      "Prefer the curb? Tell us when you book and we'll text you where to meet.",
  },
  {
    title: "At your hotel",
    copy: "We pick up at the main entrance or the property's limo and valet area. Your chauffeur texts when they arrive, and waits until you're down.",
    small:
      "Big resorts have more than one entrance. We'll tell you which one when we confirm.",
  },
  {
    title: "Our office",
    copy: "The office is where the cars are kept and the phones are answered. Visits are by appointment, mostly for corporate accounts and weddings.",
    small: "Call ahead and we'll have coffee on.",
  },
];
