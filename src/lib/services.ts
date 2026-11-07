/**
 * Example services. One entry = one /services/[slug] page (plus the sitemap,
 * llms.txt, and the services hub). Replace per client.
 */
export type ServiceEntry = {
  slug: string;
  title: string;
  /** One sentence: who it's for and what it is */
  copy: string;
};

export const servicesData: readonly ServiceEntry[] = [
  { slug: "airport-transfers", title: "Airport Transfers", copy: "Private rides to and from Harry Reid International, Henderson Executive and North Las Vegas, with flight tracking and meet & greet." },
  { slug: "hourly-chauffeur", title: "Hourly Chauffeur", copy: "Keep your car and chauffeur for dinner, a show and the night out, billed by the hour with a minimum." },
  { slug: "corporate-travel", title: "Corporate Travel", copy: "Conventions, client pickups and executive travel on one monthly invoice." },
  { slug: "weddings", title: "Weddings", copy: "Chapel to reception, with time for photos on the way and shuttles for guests." },
  { slug: "nightlife-events", title: "Nightlife & Events", copy: "Door drop-off and pickup at the stadiums, arenas, Sphere and the clubs." },
  { slug: "group-transportation", title: "Group Transportation", copy: "Executive Sprinters for bachelor parties, golf trips and conference teams." },
  { slug: "point-to-point", title: "Point-to-Point Rides", copy: "One private ride, door to door, anywhere in the Las Vegas Valley." },
  { slug: "day-trips", title: "Day Trips", copy: "Hoover Dam, Grand Canyon West, Zion and Death Valley by private car." },
];
