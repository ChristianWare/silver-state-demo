/**
 * Example content data. Replace per client.
 * fleetData drives /fleet/[slug] (and the sitemap); homeQuestions is the
 * FAQ list used on the home page and the booking success page.
 */

export type FleetEntry = {
  slug: string;
  name: string;
  passengers: number;
  luggage: number;
  bestFor: string;
};

export const fleetData: readonly FleetEntry[] = [
  {
    slug: "executive-sedan",
    name: "Executive Sedan",
    passengers: 3,
    luggage: 3,
    bestFor: "Airport transfers, client meetings, dinner for two",
  },
  {
    slug: "luxury-suv",
    name: "Luxury SUV",
    passengers: 6,
    luggage: 6,
    bestFor: "Families, golf trips, desert day trips",
  },
  {
    slug: "executive-sprinter",
    name: "Executive Sprinter",
    passengers: 14,
    luggage: 12,
    bestFor: "Bachelor parties, conference teams, wedding guests, golf groups",
  },
  {
    slug: "stretch-limousine",
    name: "Stretch Limousine",
    passengers: 10,
    luggage: 4,
    bestFor: "Weddings, milestone birthdays, prom, a night on the Strip",
  },
  {
    slug: "motor-coach-bus",
    name: "Motor Coach",
    passengers: 56,
    luggage: 56,
    bestFor: "Conventions, wedding blocks, team travel, large group day trips",
  },
];

export const homeQuestions = [
  {
    id: 1,
    question: "How do you handle flight delays or early arrivals?",
    answer:
      "We monitor your flight in real time and automatically adjust your pickup window at no extra charge. If your flight arrives early, your chauffeur will be standing by; if it’s delayed, we’ll wait up to 60 minutes after landing before any fees apply.",
  },
  {
    id: 1.1,
    question: "What is your cancellation policy?",
    answer:
      "You can cancel or modify your reservation free of charge up to 24 hours before your scheduled pickup. Cancellations made within 24 hours may incur a fee equal to one hour of service or 50% of the trip fare, whichever is less.",
  },
  {
    id: 1.2,
    question: "Can I bring pets or special equipment?",
    answer:
      "Yes—small pets are welcome in our vehicles at no extra cost (please use a carrier). For larger animals or special equipment (golf clubs, skis, wheelchairs), select the appropriate add-on during booking and we’ll provide secure storage and handling.",
  },
  {
    id: 1.3,
    question: "Are gratuities included in the fare?",
    answer:
      "Our fares represent the total cost of your transportation.  However, if you feel inclined, tips are always welcomed and appreciated.",
  },
  {
    id: 1.4,
    question: "What safety measures do you have in place?",
    answer:
      "Every vehicle is cleaned and sanitized before each trip, and all chauffeurs undergo annual defensive-driving recertification and background checks. We also maintain 256-bit SSL encryption on our booking and payment systems to protect your data.",
  },
  {
    id: 1.5,
    question: "How can I add extra stops or change my route?",
    answer:
      "You can add up to three additional stops or modify your itinerary at any time via our mobile app, website, or by calling your chauffeur directly. All changes are confirmed instantly and reflected in your final fare.",
  },
  {
    id: 1.6,
    question: "Do you offer group or corporate discounts?",
    answer:
      "Yes—teams of five or more traveling together, or accounts with recurring ride volume, qualify for custom corporate pricing and priority booking. Contact our sales team for a tailored rate sheet and service agreement.",
  },
] as const;
