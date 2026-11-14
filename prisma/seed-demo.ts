/**
 * Demo data, so the admin, the dashboards and the reports have something to
 * show. Fictional customers, drivers, two corporate accounts, demo vehicles
 * and about three months of rides around Las Vegas: past rides (mostly
 * completed and paid, a few cancelled, refunded or no-shows), today's rides,
 * and the next two weeks (requests to review, payments due, confirmed and
 * assigned rides). Dates are worked out from the day you run it, so it
 * always looks current.
 *
 *   npm run db:demo          add the demo data (replaces any earlier demo data)
 *   npm run db:demo:clear    remove the demo data only
 *
 * Needs the main seed first (npm run db:seed) for the services, vehicles and
 * admin user. Everything it adds is tagged so it can be removed cleanly:
 * emails end in @demo.example.com and demo vehicle plates start with DEMO-.
 * Your own users, bookings and settings are never touched.
 *
 * The demo people can't log in (no passwords), and no real payments,
 * emails or texts are sent.
 */
import "dotenv/config";
import { Prisma, PrismaClient, type BookingStatus } from "@prisma/client";
import { SITE } from "../src/config/site";

const db = new PrismaClient();

const DEMO_DOMAIN = "demo.example.com";
const DEMO_PLATE = "DEMO-";

// ─── Repeatable randomness ────────────────────────────────────────────────

/** A seeded random generator, so each run has the same shape of data. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20261113);
const between = (min: number, max: number) =>
  Math.floor(rand() * (max - min + 1)) + min;
const pick = <T>(list: readonly T[]): T =>
  list[Math.floor(rand() * list.length)];
const chance = (p: number) => rand() < p;

// ─── Dates in the company's time zone ─────────────────────────────────────

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Minutes the zone is ahead of UTC at that moment (negative for the US). */
function zoneOffsetMinutes(timeZone: string, at: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(at);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );
  return Math.round((asUtc - at.getTime()) / MINUTE);
}

/** Today's date in the zone, as y/m/d numbers. */
function todayIn(timeZone: string) {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .split("-")
    .map(Number);
  return { y, m, d };
}

/** A local time in the zone, `dayOffset` days from today. */
function localTime(
  timeZone: string,
  dayOffset: number,
  hour: number,
  minute: number,
) {
  const { y, m, d } = todayIn(timeZone);
  const guess = new Date(Date.UTC(y, m - 1, d + dayOffset, hour, minute));
  return new Date(
    guess.getTime() - zoneOffsetMinutes(timeZone, guess) * MINUTE,
  );
}

const roundTo15 = (date: Date) =>
  new Date(Math.round(date.getTime() / (15 * MINUTE)) * 15 * MINUTE);

// ─── Places around Las Vegas ──────────────────────────────────────────────

type Place = { name: string; address: string; lat: number; lng: number };

const AIRPORTS: Place[] = [
  {
    name: "Harry Reid International Airport, Terminal 1",
    address:
      "Harry Reid International Airport, Terminal 1, 5757 Wayne Newton Blvd, Las Vegas, NV 89119",
    lat: 36.0801,
    lng: -115.1522,
  },
  {
    name: "Harry Reid International Airport, Terminal 3",
    address:
      "Harry Reid International Airport, Terminal 3, 5757 Wayne Newton Blvd, Las Vegas, NV 89119",
    lat: 36.0851,
    lng: -115.1615,
  },
  {
    name: "Henderson Executive Airport",
    address:
      "Henderson Executive Airport, 3500 Executive Terminal Dr, Henderson, NV 89052",
    lat: 35.9729,
    lng: -115.1344,
  },
];

const PLACES: Place[] = [
  {
    name: "Bellagio",
    address: "Bellagio, 3600 S Las Vegas Blvd, Las Vegas, NV 89109",
    lat: 36.1129,
    lng: -115.1765,
  },
  {
    name: "Wynn Las Vegas",
    address: "Wynn Las Vegas, 3131 S Las Vegas Blvd, Las Vegas, NV 89109",
    lat: 36.1265,
    lng: -115.1657,
  },
  {
    name: "Caesars Palace",
    address: "Caesars Palace, 3570 S Las Vegas Blvd, Las Vegas, NV 89109",
    lat: 36.1162,
    lng: -115.1745,
  },
  {
    name: "The Venetian",
    address: "The Venetian Resort, 3355 S Las Vegas Blvd, Las Vegas, NV 89109",
    lat: 36.1212,
    lng: -115.1697,
  },
  {
    name: "ARIA",
    address: "ARIA Resort & Casino, 3730 S Las Vegas Blvd, Las Vegas, NV 89158",
    lat: 36.1072,
    lng: -115.1767,
  },
  {
    name: "The Cosmopolitan",
    address:
      "The Cosmopolitan of Las Vegas, 3708 S Las Vegas Blvd, Las Vegas, NV 89109",
    lat: 36.1097,
    lng: -115.1741,
  },
  {
    name: "Fontainebleau",
    address:
      "Fontainebleau Las Vegas, 2777 S Las Vegas Blvd, Las Vegas, NV 89109",
    lat: 36.1366,
    lng: -115.1593,
  },
  {
    name: "Resorts World",
    address:
      "Resorts World Las Vegas, 3000 S Las Vegas Blvd, Las Vegas, NV 89109",
    lat: 36.1336,
    lng: -115.1655,
  },
  {
    name: "MGM Grand",
    address: "MGM Grand, 3799 S Las Vegas Blvd, Las Vegas, NV 89109",
    lat: 36.1024,
    lng: -115.1695,
  },
  {
    name: "Mandalay Bay",
    address: "Mandalay Bay, 3950 S Las Vegas Blvd, Las Vegas, NV 89119",
    lat: 36.0909,
    lng: -115.1761,
  },
  {
    name: "Las Vegas Convention Center",
    address:
      "Las Vegas Convention Center, 3150 Paradise Rd, Las Vegas, NV 89109",
    lat: 36.1314,
    lng: -115.1522,
  },
  {
    name: "Allegiant Stadium",
    address: "Allegiant Stadium, 3333 Al Davis Way, Las Vegas, NV 89118",
    lat: 36.0909,
    lng: -115.1833,
  },
  {
    name: "Sphere",
    address: "Sphere, 255 Sands Ave, Las Vegas, NV 89169",
    lat: 36.1208,
    lng: -115.1621,
  },
  {
    name: "T-Mobile Arena",
    address: "T-Mobile Arena, 3780 S Las Vegas Blvd, Las Vegas, NV 89158",
    lat: 36.1028,
    lng: -115.1783,
  },
  {
    name: "Red Rock Casino",
    address:
      "Red Rock Casino Resort & Spa, 11011 W Charleston Blvd, Las Vegas, NV 89135",
    lat: 36.1576,
    lng: -115.3105,
  },
  {
    name: "Green Valley Ranch",
    address:
      "Green Valley Ranch Resort, 2300 Paseo Verde Pkwy, Henderson, NV 89052",
    lat: 36.0129,
    lng: -115.0858,
  },
  {
    name: "Fremont Street",
    address: "Fremont Street Experience, 425 Fremont St, Las Vegas, NV 89101",
    lat: 36.1707,
    lng: -115.1438,
  },
  {
    name: "Summerlin home",
    address: "1850 Festival Plaza Dr, Las Vegas, NV 89135",
    lat: 36.1515,
    lng: -115.3326,
  },
  {
    name: "Henderson home",
    address: "2275 Village Walk Dr, Henderson, NV 89052",
    lat: 36.0058,
    lng: -115.1059,
  },
];

const HOURLY_PLANS = [
  "Red Rock Canyon scenic drive",
  "Hoover Dam tour",
  "Dinner and a show on the Strip",
  "Bachelorette night out",
  "Client meetings across town",
  "Golf day in Summerlin",
];

const AIRLINES = [
  ["Southwest", "WN"],
  ["Delta", "DL"],
  ["American", "AA"],
  ["United", "UA"],
  ["Alaska", "AS"],
] as const;

// ─── People (all fictional) ───────────────────────────────────────────────

const CUSTOMERS = [
  "Jordan Ellis",
  "Priya Raman",
  "Marcus Bell",
  "Elena Ruiz",
  "Tom Becker",
  "Aisha Grant",
  "Kevin Tran",
  "Sofia Marino",
  "Daniel Okafor",
  "Rachel Kim",
];

const GUESTS = [
  "Brian Foster",
  "Megan Lowe",
  "Chris Patel",
  "Laura Chen",
  "Victor Hale",
  "Nina Brooks",
  "Sam Ortiz",
  "Holly Reed",
];

const DRIVERS = [
  { name: "Luis Moreno", payPercent: 35 },
  { name: "Dana Whitfield", payPercent: 30 },
  { name: "Andre Collins", payPercent: 30 },
  { name: "Grace Holt", payPercent: 32 },
];

const CORPORATE = [
  {
    name: "Mojave Events Group",
    contact: "Olivia Hart",
    title: "Event Producer",
    passengers: [
      ["Ben Carter", "Production"],
      ["Mia Lopez", "Talent"],
      ["Ethan Wu", "Production"],
    ],
  },
  {
    name: "Summit Tech Partners",
    contact: "Ryan Douglas",
    title: "Executive Assistant",
    passengers: [
      ["Hannah Price", "Executive"],
      ["Noah Shah", "Sales"],
      ["Zoe Turner", "Sales"],
    ],
  },
];

const emailFor = (name: string) =>
  `${name.toLowerCase().replace(/[^a-z]+/g, ".")}@${DEMO_DOMAIN}`;
const phone = () => `(702) 555-${String(between(100, 199)).padStart(4, "0")}`;

// ─── Clearing ─────────────────────────────────────────────────────────────

async function clearDemo() {
  const bookings = await db.booking.deleteMany({
    where: {
      OR: [
        { guestEmail: { endsWith: `@${DEMO_DOMAIN}` } },
        { user: { email: { endsWith: `@${DEMO_DOMAIN}` } } },
        {
          corporateAccount: {
            billingEmail: { endsWith: `@${DEMO_DOMAIN}` },
          },
        },
      ],
    },
  });
  const accounts = await db.corporateAccount.deleteMany({
    where: { billingEmail: { endsWith: `@${DEMO_DOMAIN}` } },
  });
  const users = await db.user.deleteMany({
    where: { email: { endsWith: `@${DEMO_DOMAIN}` } },
  });
  const units = await db.vehicleUnit.deleteMany({
    where: { plate: { startsWith: DEMO_PLATE } },
  });
  console.log(
    `✓ removed demo data: ${bookings.count} bookings, ${users.count} people, ` +
      `${accounts.count} corporate accounts, ${units.count} vehicles`,
  );
}

// ─── Building ─────────────────────────────────────────────────────────────

type Ctx = {
  timeZone: string;
  now: Date;
  adminId: string | null;
  services: Record<
    "airport-pickup" | "airport-dropoff" | "point-to-point" | "hourly",
    { id: string }
  >;
  vehicles: { id: string; name: string; kind: "sedan" | "suv" | "van" }[];
  units: { id: string; kind: "sedan" | "suv" | "van" }[];
  customers: { id: string; name: string; email: string; phone: string }[];
  drivers: { id: string; payPercent: number }[];
  corporate: {
    id: string;
    contactUserId: string;
    passengers: { id: string; name: string }[];
  }[];
};

// Pricing in cents, by vehicle: base fare, per mile, per hour.
const RATES = {
  sedan: { base: 6500, mile: 325, hour: 9500 },
  suv: { base: 8500, mile: 425, hour: 12500 },
  van: { base: 14000, mile: 600, hour: 17500 },
};

/** The statuses a ride passes through on the way to `final`. */
function pathTo(final: BookingStatus): BookingStatus[] {
  const happy: BookingStatus[] = [
    "PENDING_REVIEW",
    "PENDING_PAYMENT",
    "CONFIRMED",
    "ASSIGNED",
    "EN_ROUTE",
    "ARRIVED",
    "IN_PROGRESS",
    "COMPLETED",
  ];
  if (final === "DECLINED") return ["PENDING_REVIEW", "DECLINED"];
  if (final === "NO_SHOW")
    return [
      "PENDING_REVIEW",
      "PENDING_PAYMENT",
      "CONFIRMED",
      "ASSIGNED",
      "EN_ROUTE",
      "ARRIVED",
      "NO_SHOW",
    ];
  if (
    final === "CANCELLED" ||
    final === "REFUNDED" ||
    final === "PARTIALLY_REFUNDED"
  )
    return ["PENDING_REVIEW", "PENDING_PAYMENT", "CONFIRMED", final];
  return happy.slice(0, happy.indexOf(final) + 1);
}

const ASSIGNED_LIKE: BookingStatus[] = [
  "ASSIGNED",
  "EN_ROUTE",
  "ARRIVED",
  "IN_PROGRESS",
  "COMPLETED",
  "NO_SHOW",
];

let tokenCounter = 0;

async function createRide(
  ctx: Ctx,
  pickupAt: Date,
  status: BookingStatus,
  opts: {
    assign?: boolean;
    createdAt?: Date;
    who?: "user" | "guest" | "corporate";
  } = {},
) {
  // What kind of ride.
  const serviceRoll = rand();
  const slug: keyof Ctx["services"] =
    serviceRoll < 0.28
      ? "airport-pickup"
      : serviceRoll < 0.5
        ? "airport-dropoff"
        : serviceRoll < 0.8
          ? "point-to-point"
          : "hourly";
  const vehicleRoll = rand();
  const kind: "sedan" | "suv" | "van" =
    vehicleRoll < 0.45 ? "sedan" : vehicleRoll < 0.88 ? "suv" : "van";
  const vehicle = ctx.vehicles.find((v) => v.kind === kind) ?? ctx.vehicles[0];

  // Where.
  const airport = chance(0.85) ? AIRPORTS[between(0, 1)] : AIRPORTS[2];
  let from = pick(PLACES);
  let to = pick(PLACES.filter((p) => p !== from));
  if (slug === "airport-pickup") from = airport;
  if (slug === "airport-dropoff") to = airport;
  if (slug === "hourly") to = from;

  // How far and how much.
  const rate = RATES[kind];
  const miles = slug === "hourly" ? between(30, 90) : between(4, 26) + rand();
  const minutes =
    slug === "hourly" ? 0 : Math.round(miles * 2.1 + between(6, 14));
  const hours = slug === "hourly" ? between(3, 6) : null;
  const subtotalCents =
    slug === "hourly"
      ? (hours ?? 3) * rate.hour
      : Math.round((rate.base + miles * rate.mile) / 100) * 100;
  const feesCents = Math.round(subtotalCents * 0.05);
  const totalCents = subtotalCents + feesCents;
  const passengers =
    kind === "van"
      ? between(6, 12)
      : kind === "suv"
        ? between(1, 5)
        : between(1, 3);

  // Who.
  const whoRoll = rand();
  const who =
    opts.who ??
    (whoRoll < 0.55 ? "user" : whoRoll < 0.85 ? "guest" : "corporate");
  const customer = pick(ctx.customers);
  const guest = pick(GUESTS);
  const corp = pick(ctx.corporate);
  const passenger = pick(corp.passengers);

  // When it was booked: 1–12 days before pickup, and never in the future.
  const createdAt =
    opts.createdAt ??
    new Date(
      Math.min(
        pickupAt.getTime() - between(1, 12) * DAY - between(0, 8) * HOUR,
        ctx.now.getTime() - between(30, 240) * MINUTE,
      ),
    );

  // Payment.
  const paidStatuses: BookingStatus[] = [
    "CONFIRMED",
    "ASSIGNED",
    "EN_ROUTE",
    "ARRIVED",
    "IN_PROGRESS",
    "COMPLETED",
    "NO_SHOW",
    "REFUNDED",
    "PARTIALLY_REFUNDED",
  ];
  const isPaid =
    paidStatuses.includes(status) || (status === "CANCELLED" && chance(0.5));
  const paidAt = isPaid
    ? new Date(
        Math.min(
          createdAt.getTime() + between(2, 20) * HOUR,
          pickupAt.getTime() - 2 * HOUR,
          ctx.now.getTime() - 10 * MINUTE,
        ),
      )
    : null;
  const tipCents =
    isPaid && status === "COMPLETED" && chance(0.7)
      ? Math.round((subtotalCents * pick([0.15, 0.18, 0.2])) / 100) * 100
      : 0;
  const refundedCents =
    status === "REFUNDED" || (status === "CANCELLED" && isPaid)
      ? totalCents
      : status === "PARTIALLY_REFUNDED"
        ? Math.round(totalCents / 2)
        : 0;
  const refundedAt = refundedCents
    ? new Date(
        Math.min(
          pickupAt.getTime() - between(6, 30) * HOUR,
          ctx.now.getTime() - 5 * MINUTE,
        ),
      )
    : null;

  let payment: Prisma.PaymentUncheckedCreateWithoutBookingInput | undefined;
  if (isPaid && paidAt) {
    payment = {
      status:
        refundedCents === 0
          ? "PAID"
          : refundedCents >= totalCents
            ? "REFUNDED"
            : "PARTIALLY_REFUNDED",
      amountSubtotalCents: subtotalCents,
      amountTotalCents: totalCents,
      amountPaidCents: totalCents + tipCents,
      amountRefundedCents: refundedCents,
      tipCents,
      paidAt,
      refundedAt,
      createdAt: new Date(paidAt.getTime() - 30 * MINUTE),
    };
  } else if (status === "PENDING_PAYMENT") {
    payment = {
      status: "PENDING",
      amountSubtotalCents: subtotalCents,
      amountTotalCents: totalCents,
      createdAt: new Date(createdAt.getTime() + between(1, 6) * HOUR),
    };
  }

  // Driver and vehicle.
  const shouldAssign = opts.assign ?? ASSIGNED_LIKE.includes(status);
  const driver = pick(ctx.drivers);
  const unit = ctx.units.find((u) => u.kind === kind) ?? ctx.units[0];
  const assignment:
    Prisma.AssignmentUncheckedCreateWithoutBookingInput | undefined =
    shouldAssign && unit
      ? {
          driverId: driver.id,
          vehicleUnitId: unit.id,
          assignedById: ctx.adminId,
          assignedAt: new Date(
            Math.min(
              (paidAt ?? createdAt).getTime() + between(1, 12) * HOUR,
              pickupAt.getTime() - HOUR,
              ctx.now.getTime() - 5 * MINUTE,
            ),
          ),
          driverPaymentCents:
            status === "COMPLETED"
              ? Math.round((totalCents * driver.payPercent) / 100)
              : null,
          driverTipCents: status === "COMPLETED" ? tipCents : null,
        }
      : undefined;

  // The status history, spread between booking and the last change.
  const path = pathTo(status);
  const lastAt = new Date(
    Math.min(
      ["COMPLETED", "NO_SHOW", "IN_PROGRESS", "ARRIVED", "EN_ROUTE"].includes(
        status,
      )
        ? pickupAt.getTime() +
            (status === "COMPLETED"
              ? (minutes || (hours ?? 3) * 60) * MINUTE
              : 0)
        : (refundedAt ?? paidAt ?? createdAt).getTime() + HOUR,
      ctx.now.getTime() - MINUTE,
    ),
  );
  const span = Math.max(
    lastAt.getTime() - createdAt.getTime(),
    path.length * MINUTE,
  );
  const statusEvents = path.map((s, i) => ({
    status: s,
    createdById: i === 0 ? null : ctx.adminId,
    createdAt: new Date(
      createdAt.getTime() + (span * i) / Math.max(path.length - 1, 1),
    ),
  }));

  const flight =
    slug === "airport-pickup" && from !== AIRPORTS[2]
      ? (() => {
          const [airline, code] = pick(AIRLINES);
          return {
            flightAirline: airline,
            flightNumber: `${code} ${between(120, 2899)}`,
            flightScheduledAt: new Date(pickupAt.getTime() - 15 * MINUTE),
            flightTerminal: from === AIRPORTS[0] ? "1" : "3",
          };
        })()
      : {};

  await db.booking.create({
    data: {
      serviceTypeId: ctx.services[slug].id,
      vehicleId: vehicle?.id ?? null,
      status,
      declineReason:
        status === "DECLINED"
          ? "No vehicle available at that time. We offered another time."
          : null,
      pickupAt,
      passengers,
      luggage:
        slug === "airport-pickup" || slug === "airport-dropoff"
          ? between(1, passengers + 1)
          : between(0, 1),
      hoursRequested: hours,
      hoursBilled: status === "COMPLETED" ? hours : null,
      pickupAddress: from.address,
      pickupLat: from.lat,
      pickupLng: from.lng,
      dropoffAddress: to.address,
      dropoffLat: to.lat,
      dropoffLng: to.lng,
      distanceMiles: Number(miles.toFixed(2)),
      durationMinutes: slug === "hourly" ? (hours ?? 3) * 60 : minutes,
      specialRequests:
        slug === "hourly"
          ? pick(HOURLY_PLANS)
          : chance(0.15)
            ? pick([
                "Child seat, please.",
                "Bottled water for the group.",
                "Please call on arrival.",
              ])
            : null,
      ...flight,
      subtotalCents,
      feesCents,
      totalCents,
      createdAt,
      ...(who === "user"
        ? { userId: customer.id }
        : who === "guest"
          ? {
              guestName: guest,
              guestEmail: emailFor(guest),
              guestPhone: phone(),
              guestEmailVerifiedAt: createdAt,
              guestClaimToken: `demo-${Date.now().toString(36)}-${(tokenCounter++).toString(36)}`,
            }
          : {
              userId: corp.contactUserId,
              corporateAccountId: corp.id,
              corporatePassengerId: passenger.id,
              costCenter: pick(["EVT-200", "OPS-110", "SLS-310"]),
            }),
      ...(payment ? { payment: { create: payment } } : {}),
      ...(assignment ? { assignment: { create: assignment } } : {}),
      statusEvents: { create: statusEvents },
    },
  });
  return status;
}

async function main() {
  const clearOnly = process.argv.includes("--clear");

  await clearDemo();
  if (clearOnly) return;

  // What the main seed made.
  const settings = await db.companySettings.findFirst({
    select: { timezone: true },
  });
  const timeZone = settings?.timezone || SITE.timezone || "America/Los_Angeles";

  const serviceRows = await db.serviceType.findMany({
    where: {
      slug: {
        in: ["airport-pickup", "airport-dropoff", "point-to-point", "hourly"],
      },
    },
    select: { id: true, slug: true },
  });
  const bySlug = Object.fromEntries(
    serviceRows.map((s) => [s.slug, { id: s.id }]),
  );
  const vehicleRows = await db.vehicle.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true },
  });
  if (serviceRows.length < 4 || vehicleRows.length === 0) {
    throw new Error(
      "The services and vehicles from the main seed are missing. Run `npm run db:seed` first.",
    );
  }
  const kindOf = (name: string): "sedan" | "suv" | "van" =>
    /sprinter|van|bus/i.test(name)
      ? "van"
      : /suv|escalade|suburban/i.test(name)
        ? "suv"
        : "sedan";
  const vehicles = vehicleRows.map((v) => ({ ...v, kind: kindOf(v.name) }));

  const admin = await db.user.findFirst({
    where: { roles: { has: "ADMIN" }, NOT: { email: "" } },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });

  // Demo vehicles (units), one or two per category.
  const units: Ctx["units"] = [];
  let plateNo = 101;
  for (const v of vehicles) {
    const count = v.kind === "suv" ? 2 : 1;
    for (let i = 1; i <= count; i++) {
      const unit = await db.vehicleUnit.create({
        data: {
          name: `${v.name} ${i}`,
          plate: `${DEMO_PLATE}${plateNo++}`,
          categoryId: v.id,
        },
        select: { id: true },
      });
      units.push({ id: unit.id, kind: v.kind });
    }
  }

  // Customers.
  const customers: Ctx["customers"] = [];
  for (const name of CUSTOMERS) {
    const email = emailFor(name);
    const p = phone();
    const u = await db.user.create({
      data: {
        name,
        email,
        phone: p,
        emailVerified: new Date(Date.now() - between(20, 200) * DAY),
        roles: ["USER"],
        createdAt: new Date(Date.now() - between(20, 200) * DAY),
      },
      select: { id: true },
    });
    customers.push({ id: u.id, name, email, phone: p });
  }

  // Drivers, with their profiles. Grace's license runs out soon, so the
  // admin has a document reminder to show.
  const drivers: Ctx["drivers"] = [];
  for (const [i, d] of DRIVERS.entries()) {
    const u = await db.user.create({
      data: {
        name: d.name,
        email: emailFor(d.name),
        phone: phone(),
        emailVerified: new Date(Date.now() - 300 * DAY),
        roles: ["DRIVER"],
        createdAt: new Date(Date.now() - between(200, 400) * DAY),
        driverProfile: {
          create: {
            payPercent: d.payPercent,
            legalName: d.name,
            mailingAddress: "Las Vegas, NV",
            w9ReceivedAt: new Date(Date.now() - between(100, 300) * DAY),
            licenseNumber: `NV${between(1000000, 9999999)}`,
            licenseExpiresAt: new Date(
              Date.now() + (i === 3 ? 20 : between(200, 900)) * DAY,
            ),
            permitExpiresAt: new Date(Date.now() + between(90, 400) * DAY),
            insuranceExpiresAt: new Date(Date.now() + between(60, 300) * DAY),
            backgroundCheckAt: new Date(Date.now() - between(30, 300) * DAY),
          },
        },
      },
      select: { id: true },
    });
    drivers.push({ id: u.id, payPercent: d.payPercent });
  }

  // Corporate accounts, each with a booking contact and a few passengers.
  const corporate: Ctx["corporate"] = [];
  for (const c of CORPORATE) {
    const slug = c.name.toLowerCase().replace(/[^a-z]+/g, "-");
    const contact = await db.user.create({
      data: {
        name: c.contact,
        email: emailFor(c.contact),
        phone: phone(),
        emailVerified: new Date(Date.now() - 120 * DAY),
        roles: ["CORPORATE"],
      },
      select: { id: true },
    });
    const account = await db.corporateAccount.create({
      data: {
        name: c.name,
        billingEmail: `billing.${slug}@${DEMO_DOMAIN}`,
        billingCity: "Las Vegas",
        billingState: "NV",
        billingCycle: "MONTHLY",
        paymentTerms: "NET_30",
        contacts: {
          create: { userId: contact.id, role: "PRIMARY", title: c.title },
        },
        passengers: {
          create: c.passengers.map(([name, department]) => ({
            name,
            department,
            email: emailFor(name),
          })),
        },
      },
      select: { id: true, passengers: { select: { id: true, name: true } } },
    });
    corporate.push({
      id: account.id,
      contactUserId: contact.id,
      passengers: account.passengers,
    });
  }

  const now = new Date();
  const ctx: Ctx = {
    timeZone,
    now,
    adminId: admin?.id ?? null,
    services: bySlug as Ctx["services"],
    vehicles,
    units,
    customers,
    drivers,
    corporate,
  };

  const counts: Record<string, number> = {};
  const add = async (
    pickupAt: Date,
    status: BookingStatus,
    opts?: Parameters<typeof createRide>[3],
  ) => {
    const s = await createRide(ctx, pickupAt, status, opts);
    counts[s] = (counts[s] ?? 0) + 1;
  };
  const pickupOn = (dayOffset: number) =>
    localTime(timeZone, dayOffset, between(5, 21), pick([0, 15, 30, 45]));

  // The last 75 days: mostly completed and paid.
  for (let day = -75; day <= -1; day++) {
    const rides = day > -30 ? between(1, 3) : between(0, 2);
    for (let r = 0; r < rides; r++) {
      const roll = rand();
      const status: BookingStatus =
        roll < 0.86
          ? "COMPLETED"
          : roll < 0.91
            ? "CANCELLED"
            : roll < 0.94
              ? "REFUNDED"
              : roll < 0.96
                ? "PARTIALLY_REFUNDED"
                : "NO_SHOW";
      await add(pickupOn(day), status);
    }
  }

  // Two rides from the last few days that were never closed out, so
  // "Incomplete rides" has something in it.
  await add(pickupOn(-2), "ASSIGNED");
  await add(pickupOn(-1), "EN_ROUTE");

  // Today, around now.
  await add(roundTo15(new Date(now.getTime() - 5 * HOUR)), "COMPLETED");
  await add(roundTo15(new Date(now.getTime() - 20 * MINUTE)), "IN_PROGRESS");
  await add(roundTo15(new Date(now.getTime() + 90 * MINUTE)), "ASSIGNED");
  // Coming up and still unassigned / unpaid: the dashboard's alerts.
  await add(roundTo15(new Date(now.getTime() + 5 * HOUR)), "CONFIRMED", {
    assign: false,
  });
  await add(roundTo15(new Date(now.getTime() + 8 * HOUR)), "PENDING_PAYMENT");

  // The next two weeks.
  for (let day = 1; day <= 14; day++) {
    const rides = between(1, 3);
    for (let r = 0; r < rides; r++) {
      const roll = rand();
      const status: BookingStatus =
        day <= 2
          ? roll < 0.5
            ? "ASSIGNED"
            : roll < 0.75
              ? "CONFIRMED"
              : "PENDING_PAYMENT"
          : roll < 0.35
            ? "ASSIGNED"
            : roll < 0.6
              ? "CONFIRMED"
              : roll < 0.8
                ? "PENDING_PAYMENT"
                : roll < 0.95
                  ? "PENDING_REVIEW"
                  : "DECLINED";
      await add(pickupOn(day), status);
    }
  }

  // New requests waiting for review: one just in, two waiting a while.
  await add(pickupOn(3), "PENDING_REVIEW", {
    createdAt: new Date(now.getTime() - 25 * MINUTE),
    who: "guest",
  });
  await add(pickupOn(5), "PENDING_REVIEW", {
    createdAt: new Date(now.getTime() - 5 * HOUR),
  });
  await add(pickupOn(9), "PENDING_REVIEW", {
    createdAt: new Date(now.getTime() - 26 * HOUR),
    who: "corporate",
  });
  // And one request that was turned down.
  await add(pickupOn(4), "DECLINED", {
    createdAt: new Date(now.getTime() - 30 * HOUR),
    who: "guest",
  });

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log(
    `✓ ${customers.length} customers, ${drivers.length} drivers, ` +
      `${corporate.length} corporate accounts, ${units.length} vehicles`,
  );
  console.log(`✓ ${total} bookings:`);
  for (const [s, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${s.toLowerCase().replace(/_/g, " ")}: ${n}`);
  }
  console.log(`  Times are in ${timeZone}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
