/**
 * Content for /fleet and each /fleet/[slug] page, by slug. Slugs, names,
 * passengers and bags come from fleetData (src/lib/data.ts), so the fleet
 * pages, the home page and the booking tool agree.
 *
 * Written from the website copy doc (the Fleet tab and its sub-tabs).
 * Vehicle names are classes, not models, so each operator's real cars fit
 * without rewriting. Prices are never written here: they come from Admin →
 * Vehicle Categories (src/lib/booking/publicRates.ts).
 */
import { fleetData, type FleetEntry } from "@/lib/data";

export type FleetFaq = { q: string; a: string };

export type FleetDetail = {
  slug: string;
  /** Short name for buttons and the capacity track: "sedan", "SUV". */
  short: string;
  /** Class, for schema and the eyebrow. */
  vehicleClass: string;
  intro: string;
  /** A longer paragraph for "Vehicle details". */
  about: string;
  features: string[];
  bestFor: string[];
  specs: { label: string; value: string }[];
  /** Third stat box beside passengers and bags. */
  extra: { label: string; value: string };
  /** Vehicle-specific policy lines, added after the shared ones. */
  policyNotes?: string[];
  /** Cut-out shot on a plain background. */
  image: { src: string; alt: string };
  /** Two photos for the gallery. */
  gallery: { src: string; alt: string }[];
  faqs: FleetFaq[];
  cta: string;
  meta: { title: string; description: string };
};

const DETAILS: FleetDetail[] = [
  {
    slug: "executive-sedan",
    short: "sedan",
    vehicleClass: "Executive sedan",
    intro:
      "The quiet, professional choice for one to three passengers. Leather seats, a smooth ride and room for three suitcases.",
    about:
      "The executive sedan is the car we send for a client meeting, an early flight or a dinner where the ride should be as calm as the restaurant. It's late-model, black, spotless inside and out, and cooled before you get in. The rear seat is the best seat: leather, quiet, with its own climate control and a charger within reach.",
    features: [
      "Leather seating",
      "Rear climate control",
      "Phone chargers",
      "Bottled water",
      "Wi-Fi on request",
    ],
    bestFor: ["Airport transfers", "Client meetings", "Dinner for two"],
    specs: [
      { label: "Class", value: "Full-size luxury sedan" },
      { label: "Ride", value: "Quiet, smooth and low" },
      { label: "Cabin", value: "Leather, rear climate control" },
      { label: "Luggage", value: "Three suitcases in the trunk" },
    ],
    extra: { label: "Seats", value: "Leather" },
    image: {
      src: "/vehicles/mercedesSedanii.png",
      alt: "Black Mercedes-Benz executive sedan",
    },
    gallery: [
      { src: "/img4.jpg", alt: "Chauffeur in a suit beside a black car" },
      { src: "/img8.jpg", alt: "Executive with a coffee in the back seat" },
    ],
    faqs: [
      {
        q: "How many bags fit in the sedan?",
        a: "Three suitcases in the trunk, plus carry-ons in the cabin. More than that, book the SUV.",
      },
      {
        q: "Can I work in the back?",
        a: "Yes. It's quiet, there's a charger at every seat, and Wi-Fi is available on request.",
      },
      {
        q: "Is the sedan good for airport runs?",
        a: "It's the one most of our airport riders book: one to three people with normal luggage.",
      },
    ],
    cta: "Book the sedan",
    meta: {
      title: "Executive Sedan Car Service in Las Vegas | Up to 3 Passengers",
      description:
        "A quiet, late-model executive sedan for one to three passengers in Las Vegas. Leather seats, rear climate control and room for three suitcases.",
    },
  },
  {
    slug: "luxury-suv",
    short: "SUV",
    vehicleClass: "Luxury SUV",
    intro:
      "Room for six and their luggage, with a higher seat and a calmer ride on long desert drives.",
    about:
      "The luxury SUV is the most-booked vehicle in Las Vegas for a reason. It fits a family and their bags, a foursome and their golf clubs, or a team heading to the Convention Center. Three rows of leather, tri-zone climate for the July heat, and enough room behind the third row that nobody rides with a suitcase on their lap.",
    features: [
      "Three rows of leather seating",
      "Space for golf bags and strollers",
      "Tri-zone climate",
      "Phone chargers",
      "Bottled water",
    ],
    bestFor: ["Families", "Golf trips", "Day trips to Hoover Dam and Red Rock"],
    specs: [
      { label: "Class", value: "Full-size luxury SUV" },
      { label: "Ride", value: "High seat, calm on the highway" },
      { label: "Cabin", value: "Three rows, tri-zone climate" },
      { label: "Luggage", value: "Six suitcases, or four sets of golf clubs" },
    ],
    extra: { label: "Rows", value: "3" },
    image: {
      src: "/vehicles/escalade.png",
      alt: "Black Cadillac Escalade luxury SUV",
    },
    gallery: [
      { src: "/vehicles/sub.jpg", alt: "Black SUV parked on a city street" },
      {
        src: "/vehicles/subFlowers.png",
        alt: "Black SUV in a desert field of wildflowers",
      },
    ],
    faqs: [
      {
        q: "Do golf bags fit?",
        a: "Usually four sets with the third row folded, or two with all six seats in use. Tell us how many when you book.",
      },
      {
        q: "Can you add a car seat?",
        a: "Yes. Tell us the child's age when you book and we'll bring the right seat.",
      },
      {
        q: "Is the SUV good for day trips?",
        a: "It's the one we recommend for Hoover Dam, Red Rock and Valley of Fire: comfortable for hours, cool in the heat.",
      },
    ],
    cta: "Book the SUV",
    meta: {
      title: "Luxury SUV Car Service in Las Vegas | Up to 6 Passengers",
      description:
        "A late-model luxury SUV for up to six passengers and their luggage in Las Vegas. Three rows of leather, tri-zone climate and room for golf bags.",
    },
  },
  {
    slug: "executive-sprinter",
    short: "Sprinter",
    vehicleClass: "Executive Sprinter van",
    intro:
      "Keep up to 14 people together, with stand-up headroom, captain's chairs and room for everyone's bags.",
    about:
      "The Executive Sprinter keeps the whole group in one place, from the airport to the hotel to the last stop of the night. You can stand up inside, walk to your seat and talk to the person across from you. There's room in the back for everyone's luggage, and the lights and sound are yours to set.",
    features: [
      "Up to 14 seats",
      "Stand-up cabin",
      "Rear luggage space",
      "Overhead lighting and sound",
      "Phone chargers",
    ],
    bestFor: [
      "Bachelor and bachelorette parties",
      "Conference teams",
      "Wedding guests",
      "Golf groups",
    ],
    specs: [
      { label: "Class", value: "Executive Mercedes-Benz Sprinter" },
      { label: "Ride", value: "Smooth, with room to move" },
      { label: "Cabin", value: "Stand-up headroom, captain's chairs" },
      { label: "Luggage", value: "Twelve suitcases in the rear" },
    ],
    extra: { label: "Headroom", value: "Stand-up" },
    image: {
      src: "/vehicles/sprint.png",
      alt: "Black Mercedes-Benz Sprinter executive van",
    },
    gallery: [
      {
        src: "/vehicles/sprinteriii.jpg",
        alt: "Executive Sprinter waiting beside a private jet",
      },
      {
        src: "/vehicles/sprinterii.png",
        alt: "Black Sprinter on a desert road",
      },
    ],
    faqs: [
      {
        q: "How many people fit?",
        a: "Up to 14 in the Sprinter. For bigger groups, add a second vehicle or book a motor coach on the same booking.",
      },
      {
        q: "Is there room for luggage?",
        a: "Yes, about twelve suitcases in the rear. Tell us about golf bags or extra cases when you book.",
      },
      {
        q: "Can we make stops on a night out?",
        a: "Yes. Book it by the hour and stop as often as you like.",
      },
    ],
    cta: "Book the Sprinter",
    meta: {
      title: "Executive Sprinter Van in Las Vegas | Up to 14 Passengers",
      description:
        "An Executive Sprinter for up to 14 passengers in Las Vegas, with stand-up headroom, captain's chairs and room for everyone's luggage.",
    },
  },
  {
    slug: "stretch-limousine",
    short: "limo",
    vehicleClass: "Stretch limousine",
    intro:
      "The classic Las Vegas arrival. Wraparound seating for up to 10, mood lighting and a partition for privacy.",
    about:
      "Some nights call for the stretch. Wraparound seating so everyone faces each other, lighting you can set to the mood, a sound system and glassware, and a partition when you want the back to yourselves. It's the car for the wedding photos, the milestone birthday and the slow drive down the Strip after dark.",
    features: [
      "Up to 10 seats",
      "Privacy partition",
      "LED mood lighting",
      "Sound system",
      "Glassware",
    ],
    bestFor: [
      "Weddings",
      "Milestone birthdays",
      "Prom",
      "A night on the Strip",
    ],
    specs: [
      { label: "Class", value: "Stretch limousine" },
      { label: "Ride", value: "Long, low and smooth" },
      { label: "Cabin", value: "Wraparound seating, partition" },
      { label: "Luggage", value: "Four suitcases in the trunk" },
    ],
    extra: { label: "Privacy", value: "Partition" },
    policyNotes: [
      "Ask when you book about drinks in the vehicle; we'll explain what's allowed.",
    ],
    image: { src: "/vehicles/limoii.png", alt: "Black stretch limousine" },
    gallery: [
      { src: "/img10.jpg", alt: "Bride holding flowers in the back of a car" },
      { src: "/img11.jpg", alt: "Rider laughing out of a car window at night" },
    ],
    faqs: [
      {
        q: "Can we decorate the limo for a wedding?",
        a: "Ask when you book. Simple ribbons are usually fine.",
      },
      {
        q: "Is it good for airport pickups?",
        a: "It works for a special arrival, but luggage space is small: about four suitcases. For lots of bags, pair it with an SUV.",
      },
      {
        q: "How long should we book it for?",
        a: "Most limo bookings are 3 to 5 hours: enough for photos, dinner and a drive down the Strip.",
      },
    ],
    cta: "Book the limousine",
    meta: {
      title: "Stretch Limousine in Las Vegas | Up to 10 Passengers",
      description:
        "A stretch limousine for up to 10 passengers in Las Vegas, with wraparound seating, mood lighting and a privacy partition. Weddings, birthdays and the Strip.",
    },
  },
  {
    slug: "motor-coach-bus",
    short: "coach",
    vehicleClass: "Motor coach",
    intro:
      "Move the whole group at once. Reclining seats, an onboard restroom and a full luggage bay underneath.",
    about:
      "When the group is too big for one Sprinter, the motor coach takes everyone together. Reclining seats for the long drives, a restroom on board, and a luggage bay underneath that holds a suitcase for every seat. It's the vehicle for convention shuttles, wedding guest blocks and team trips out to the desert.",
    features: [
      "Up to 56 seats",
      "Reclining seats",
      "Onboard restroom",
      "Luggage bay underneath",
      "Climate control for the desert",
    ],
    bestFor: [
      "Conventions",
      "Wedding guest blocks",
      "Team travel",
      "Large group day trips",
    ],
    specs: [
      { label: "Class", value: "Full-size motor coach" },
      { label: "Ride", value: "Smooth on long highway drives" },
      { label: "Cabin", value: "Reclining seats, onboard restroom" },
      { label: "Luggage", value: "A suitcase for every seat, underneath" },
    ],
    extra: { label: "Restroom", value: "Onboard" },
    policyNotes: [
      "Motor coaches are booked by the hour and may need more notice. Call to confirm availability for big weekends.",
    ],
    image: { src: "/vehicles/bus.png", alt: "Black full-size motor coach" },
    gallery: [
      {
        src: "/vehicles/charter.jpg",
        alt: "Motor coach waiting under a covered pickup area",
      },
      { src: "/vehicles/coach.jpeg", alt: "Black motor coach" },
    ],
    faqs: [
      {
        q: "How many people does the coach seat?",
        a: "Up to 56. For bigger groups, add a second coach or a Sprinter on the same booking.",
      },
      {
        q: "Can it shuttle between hotels and the convention center?",
        a: "Yes. We plan the loop around your show schedule and keep it running all day.",
      },
      {
        q: "How far ahead should we book?",
        a: "As early as you can, especially for convention weeks and big weekends.",
      },
    ],
    cta: "Book the coach",
    meta: {
      title: "Motor Coach Charter in Las Vegas | Up to 56 Passengers",
      description:
        "A full-size motor coach for up to 56 passengers in Las Vegas, with reclining seats, an onboard restroom and a luggage bay. Conventions and big groups.",
    },
  },
];

/** fleetData's entry with its details; "best for" is the details' list. */
export type FleetVehicle = Omit<FleetEntry, "bestFor"> & FleetDetail;

/** Every vehicle in fleetData that has details, in fleetData's order. */
export const FLEET: FleetVehicle[] = fleetData.flatMap((e) => {
  const d = DETAILS.find((x) => x.slug === e.slug);
  return d ? [{ ...e, ...d }] : [];
});

export const fleetVehicleBySlug = (slug: string) =>
  FLEET.find((v) => v.slug === slug);

/** Questions for the /fleet page. */
export const FLEET_QUESTIONS: {
  topic: string;
  question: string;
  answer: string;
}[] = [
  {
    topic: "Choosing",
    question: "Which vehicle should I book?",
    answer:
      "Go by people and bags. Up to 3 with normal luggage: the sedan. Up to 6, or golf clubs: the SUV. Up to 14: the Sprinter. Bigger groups: the motor coach, or several vehicles on one booking.",
  },
  {
    topic: "Choosing",
    question: "Will I get the exact car in the photos?",
    answer:
      "You'll get that class of vehicle: late-model, black and spotless. The make and model can vary with what's available on the day.",
  },
  {
    topic: "Families",
    question: "Do you have car seats?",
    answer:
      "Yes, on request. Tell us the child's age when you book and we'll bring the right seat.",
  },
  {
    topic: "Pricing",
    question: "How much does each vehicle cost?",
    answer:
      "The booking tool shows the price for each vehicle before you pay, with no surge pricing. Gratuity is your choice.",
  },
  {
    topic: "In the car",
    question: "Is every vehicle cleaned between rides?",
    answer:
      "Yes. Every vehicle is cleaned inside and out, checked and stocked with water before each ride.",
  },
];
