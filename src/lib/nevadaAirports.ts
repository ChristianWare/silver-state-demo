// Nevada airports for /airports. Hub page only: none of these get their own
// page.
//
// AIRPORTS_SERVED: the airports we drive to every day, shown as cards. Add
// a logo by dropping a file in /public/airports/ and setting `logo`.
//
// NEVADA_AIRPORTS: every public-use airport in the FAA's national airport
// system (NPIAS) in Nevada, shown as tables. Source: FAA NPIAS roles and
// calendar-year 2024 enplanements (passenger boardings), via the Wikipedia
// "List of airports in Nevada". Drive times are rough, from the middle of
// the Strip without traffic: for orientation, not quotes.

export type AirportServed = {
  code: string;
  name: string;
  /** How riders say it. */
  shortName: string;
  /** Optional logo, e.g. "/airports/las.svg". Until then a code tile shows. */
  logo?: string;
  /** Two short facts under the name. */
  meta: [string, string];
  copy: string;
  /** Where "Book a pickup" goes. */
  href: string;
};

export const AIRPORTS_SERVED: AirportServed[] = [
  {
    code: "LAS",
    name: "Harry Reid International Airport",
    shortName: "Harry Reid",
    meta: ["Terminals 1 and 3", "10–20 min to the Strip"],
    copy: "Nevada's main airport and our most-driven route. Flight tracking, a name sign in baggage claim and free wait after you land.",
    href: "/book?trip=from-airport&airport=LAS",
  },
  {
    code: "HND",
    name: "Henderson Executive Airport",
    shortName: "Henderson Executive",
    meta: ["Private aviation", "About 20 min to the Strip"],
    copy: "The quiet way into Las Vegas for private and charter flights. We meet the aircraft at the FBO, not a curb.",
    href: "/book?trip=from-airport&airport=HND",
  },
  {
    code: "VGT",
    name: "North Las Vegas Airport",
    shortName: "North Las Vegas",
    meta: ["Private aviation", "About 20 min to the Strip"],
    copy: "Private, charter and scenic flights on the north side of the valley, close to Summerlin and Downtown.",
    href: "/book?trip=from-airport&airport=VGT",
  },
  {
    code: "BLD",
    name: "Boulder City Municipal Airport",
    shortName: "Boulder City",
    meta: ["Grand Canyon air tours", "About 35 min to the Strip"],
    copy: "Home of the Grand Canyon and Hoover Dam air tours. We drop you for the early departure and pick you up when you land.",
    href: "/book",
  },
];

export type DirectoryGroup = "commercial" | "reliever" | "regional";

export type NevadaAirport = {
  name: string;
  city: string;
  faa: string;
  iata?: string;
  icao?: string;
  group: DirectoryGroup;
  /** The FAA category, in words. */
  role: string;
  /** Calendar-year 2024 boardings, where the FAA records any. */
  enplanements?: number;
  /** Rough drive from the Strip. */
  drive?: string;
  /** One line: what it is, or what we do there. */
  note?: string;
};

export const DIRECTORY_GROUPS: {
  key: DirectoryGroup;
  heading: string;
  blurb: string;
}[] = [
  {
    key: "commercial",
    heading: "Commercial airports",
    blurb:
      "Four Nevada airports carry enough passengers to count as commercial service. Harry Reid carries almost all of them; Boulder City makes the list on Grand Canyon air tours alone.",
  },
  {
    key: "reliever",
    heading: "Private aviation and reliever airports",
    blurb:
      "No airline counters, but this is where private jets, charters and corporate flight departments land, around Las Vegas and Reno. We meet these flights at the FBO.",
  },
  {
    key: "regional",
    heading: "Regional and general aviation airports",
    blurb:
      "The rest of Nevada's airports in the national system: county fields, mining towns and desert strips. We drive to the ones close to Las Vegas and quote long-distance rides to the rest.",
  },
];

export const NEVADA_AIRPORTS: NevadaAirport[] = [
  /* ── Commercial ── */
  {
    name: "Harry Reid International Airport",
    city: "Las Vegas",
    faa: "LAS",
    iata: "LAS",
    icao: "KLAS",
    group: "commercial",
    role: "Commercial, large hub",
    enplanements: 28244966,
    drive: "10–20 min",
    note: "Nevada's main airport, Terminals 1 and 3. Our most-driven route.",
  },
  {
    name: "Reno/Tahoe International Airport",
    city: "Reno",
    faa: "RNO",
    iata: "RNO",
    icao: "KRNO",
    group: "commercial",
    role: "Commercial, small hub",
    enplanements: 2377780,
    drive: "About 7 hr",
    note: "Northern Nevada and Lake Tahoe. Long-distance rides by quote.",
  },
  {
    name: "Boulder City Municipal Airport",
    city: "Boulder City",
    faa: "BVU",
    iata: "BLD",
    icao: "KBVU",
    group: "commercial",
    role: "Commercial, non-hub",
    enplanements: 59617,
    drive: "About 35 min",
    note: "Grand Canyon and Hoover Dam air tours.",
  },
  {
    name: "Elko Regional Airport (J.C. Harris Field)",
    city: "Elko",
    faa: "EKO",
    iata: "EKO",
    icao: "KEKO",
    group: "commercial",
    role: "Commercial, non-hub",
    enplanements: 12881,
    drive: "About 7 hr",
  },

  /* ── Reliever ── */
  {
    name: "Henderson Executive Airport",
    city: "Henderson",
    faa: "HND",
    iata: "HSH",
    icao: "KHND",
    group: "reliever",
    role: "Reliever",
    enplanements: 558,
    drive: "About 20 min",
    note: "Private and charter flights. We meet you at the FBO.",
  },
  {
    name: "North Las Vegas Airport",
    city: "North Las Vegas",
    faa: "VGT",
    iata: "VGT",
    icao: "KVGT",
    group: "reliever",
    role: "Reliever",
    enplanements: 1986,
    drive: "About 20 min",
    note: "Private, charter and scenic flights.",
  },
  {
    name: "Carson City Airport",
    city: "Carson City",
    faa: "CXP",
    iata: "CSN",
    icao: "KCXP",
    group: "reliever",
    role: "Reliever",
    enplanements: 16,
    drive: "About 7 hr",
  },
  {
    name: "Reno/Stead Airport",
    city: "Reno",
    faa: "RTS",
    icao: "KRTS",
    group: "reliever",
    role: "Reliever",
    enplanements: 0,
    drive: "About 7 hr",
  },

  /* ── Regional and general aviation ── */
  {
    name: "Jean Airport",
    city: "Jean",
    faa: "0L7",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 30 min",
    note: "Skydiving and glider flights south of the city.",
  },
  {
    name: "Overton Municipal Airport (Perkins Field)",
    city: "Overton",
    faa: "U08",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 1 hr",
    note: "Near Valley of Fire and Lake Mead.",
  },
  {
    name: "Mesquite Airport",
    city: "Mesquite",
    faa: "67L",
    iata: "MFH",
    group: "regional",
    role: "General aviation",
    enplanements: 114,
    drive: "About 1 hr 20 min",
  },
  {
    name: "Alamo Landing Field",
    city: "Alamo",
    faa: "L92",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 1 hr 30 min",
  },
  {
    name: "Beatty Airport",
    city: "Beatty",
    faa: "BTY",
    iata: "BTY",
    icao: "KBTY",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 2 hr",
    note: "The Nevada gateway to Death Valley.",
  },
  {
    name: "Lincoln County Airport",
    city: "Panaca",
    faa: "1L1",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 2 hr 45 min",
  },
  {
    name: "Tonopah Airport",
    city: "Tonopah",
    faa: "TPH",
    iata: "TPH",
    icao: "KTPH",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 3 hr 30 min",
  },
  {
    name: "Ely Airport (Yelland Field)",
    city: "Ely",
    faa: "ELY",
    iata: "ELY",
    icao: "KELY",
    group: "regional",
    role: "General aviation",
    enplanements: 1,
    drive: "About 4 hr",
  },
  {
    name: "Hawthorne Industrial Airport",
    city: "Hawthorne",
    faa: "HTH",
    iata: "HTH",
    icao: "KHTH",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 5 hr",
  },
  {
    name: "Gabbs Airport",
    city: "Gabbs",
    faa: "GAB",
    iata: "GAB",
    icao: "KGAB",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 5 hr",
  },
  {
    name: "Eureka Airport",
    city: "Eureka",
    faa: "05U",
    iata: "EUE",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 5 hr",
  },
  {
    name: "Austin Airport",
    city: "Austin",
    faa: "TMT",
    iata: "ASQ",
    icao: "KTMT",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 5 hr 30 min",
  },
  {
    name: "Yerington Municipal Airport",
    city: "Yerington",
    faa: "O43",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 6 hr",
  },
  {
    name: "Fallon Municipal Airport",
    city: "Fallon",
    faa: "FLX",
    iata: "FLX",
    icao: "KFLX",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 6 hr",
  },
  {
    name: "Wells Municipal Airport (Harriet Field)",
    city: "Wells",
    faa: "LWL",
    iata: "LWL",
    icao: "KLWL",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 6 hr",
  },
  {
    name: "Silver Springs Airport",
    city: "Silver Springs",
    faa: "SPZ",
    icao: "KSPZ",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 6 hr 30 min",
  },
  {
    name: "Battle Mountain Airport",
    city: "Battle Mountain",
    faa: "BAM",
    iata: "BAM",
    icao: "KBAM",
    group: "regional",
    role: "General aviation",
    enplanements: 56,
    drive: "About 6 hr 30 min",
  },
  {
    name: "Jackpot Airport (Hayden Field)",
    city: "Jackpot",
    faa: "06U",
    iata: "KPT",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 6 hr 45 min",
  },
  {
    name: "Minden–Tahoe Airport",
    city: "Minden",
    faa: "MEV",
    iata: "MEV",
    icao: "KMEV",
    group: "regional",
    role: "General aviation",
    enplanements: 85,
    drive: "About 6 hr 45 min",
  },
  {
    name: "Derby Field",
    city: "Lovelock",
    faa: "LOL",
    iata: "LOL",
    icao: "KLOL",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 7 hr",
  },
  {
    name: "Winnemucca Municipal Airport (Franklin Field)",
    city: "Winnemucca",
    faa: "WMC",
    iata: "WMC",
    icao: "KWMC",
    group: "regional",
    role: "General aviation",
    enplanements: 3,
    drive: "About 7 hr 15 min",
  },
  {
    name: "Owyhee Airport",
    city: "Owyhee",
    faa: "10U",
    group: "regional",
    role: "General aviation",
    enplanements: 0,
    drive: "About 8 hr",
  },
];

export const NPIAS_AIRPORT_COUNT = NEVADA_AIRPORTS.length;

const count = (g: DirectoryGroup) =>
  NEVADA_AIRPORTS.filter((a) => a.group === g).length;

export const AIRPORT_COUNTS = {
  commercial: count("commercial"),
  reliever: count("reliever"),
  regional: count("regional"),
};

export const AIRPORT_FAQS: {
  topic: string;
  question: string;
  answer: string;
}[] = [
  {
    topic: "Nevada",
    question: "How many airports are in Nevada?",
    answer: `Nevada has ${NPIAS_AIRPORT_COUNT} public-use airports in the FAA's national airport system: ${AIRPORT_COUNTS.commercial} commercial service airports, ${AIRPORT_COUNTS.reliever} reliever airports for private aviation around Las Vegas and Reno, and ${AIRPORT_COUNTS.regional} regional fields. There are also smaller public airstrips outside that system and several military airfields.`,
  },
  {
    topic: "Nevada",
    question: "Which Nevada airports have commercial flights?",
    answer:
      "Harry Reid International (LAS) in Las Vegas and Reno/Tahoe International (RNO) carry almost all of Nevada's airline passengers. Elko Regional (EKO) has a small amount of airline service, and Boulder City (BLD) counts as commercial because of its Grand Canyon air tours.",
  },
  {
    topic: "Las Vegas",
    question: "What airports are near Las Vegas?",
    answer:
      "Harry Reid International is the main airport, about 10 minutes from the Strip. For private and charter flights, Henderson Executive (HND) and North Las Vegas (VGT) are both about 20 minutes away. Boulder City, about 35 minutes away, is where most Grand Canyon air tours leave from.",
  },
  {
    topic: "Private aviation",
    question: "Can I fly private into Las Vegas?",
    answer:
      "Yes. Private jets use the FBOs at Harry Reid, Henderson Executive and North Las Vegas. Give us your tail number when you book and we'll meet the aircraft at the FBO.",
  },
  {
    topic: "Rides",
    question: "Do you drive to every airport on this list?",
    answer:
      "We drive Harry Reid, Henderson Executive, North Las Vegas and Boulder City every day. Long-distance rides to Reno, Elko and the rest of Nevada are available by quote: call us with the route and the date.",
  },
];
