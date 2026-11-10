/**
 * Content for each /services/[slug] page. Slugs match src/lib/services.ts.
 *
 * Written from the website copy doc (one sub-tab per service). Numbers come
 * from the booking rules (src/config/site.ts → booking) so the pages and
 * the booking tool always say the same thing. Photos are from /public;
 * swap any time.
 */
import {
  AIRPORT_FREE_WAIT_MINUTES,
  BOOKING_LEAD_HOURS,
  EXTRA_STOP_FEE_CENTS,
  HOURLY_MIN_HOURS,
  MEET_AND_GREET_FREE,
  usdShort,
} from "@/lib/booking/rules";

export type ServiceStep = { title: string; body: string };
export type ServiceFaq = { q: string; a: string };

export type ServiceDetail = {
  slug: string;
  /** H1, kept to two lines. */
  title: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  /** Where the hero photo is cropped from, if not the center. */
  heroPosition?: string;
  /** "What's included", as chips in the summary card. */
  tags: string[];
  stat: { value: string; label: string };
  overview: string[];
  approach: string;
  steps: ServiceStep[];
  included: string[];
  whoFor: string;
  faqs: ServiceFaq[];
  gallery: { src: string; alt: string }[];
  cta: { text: string; href: string };
  meta: { title: string; description: string };
};

const WAIT = `${AIRPORT_FREE_WAIT_MINUTES} minutes`;
/** "$15", from the booking rules. */
const STOP_FEE = usdShort(EXTRA_STOP_FEE_CENTS);

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "airport-transfers",
    title: "Airport transfers",
    intro:
      "A private car between Harry Reid International (LAS) and your hotel, home or meeting. We track your flight, meet you in baggage claim and skip the taxi and rideshare lines.",
    heroImage: "/img7.jpg",
    heroAlt: "Traveler stepping out of a black car at the airport terminal",
    tags: [
      "Flight tracking",
      `${AIRPORT_FREE_WAIT_MINUTES} min free wait`,
      "Meet & greet",
      "Terminals 1 and 3",
    ],
    stat: {
      value: `${AIRPORT_FREE_WAIT_MINUTES} min`,
      label: "Free wait after landing",
    },
    overview: [
      "An airport ride should be the one part of the trip you never think about. We follow your flight, move the pickup if it lands early or late, and have your chauffeur waiting in baggage claim when you walk out.",
      "Your price is shown before you book, and it doesn't change because your flight did.",
    ],
    approach: `We plan airport rides backwards from your flight. For departures, we look at the time of day, traffic on I-15 and the 215, and how busy your terminal usually is, then set a pickup that gets you to the curb with time to spare. For arrivals, we watch your flight from takeoff. If it's early, your chauffeur is already there. If it's late, we move the pickup so you don't have to call anyone. You get ${WAIT} of free wait from landing, so a slow bag carousel never costs you.`,
    steps: [
      {
        title: "Book with your flight",
        body: "Add your flight number and drop-off. You see your price before you pay.",
      },
      {
        title: "We track it",
        body: "We follow your flight and move the pickup if it lands early or late.",
      },
      {
        title: "Meet in baggage claim",
        body: "Your chauffeur waits inside with your name on a sign, and takes the bags.",
      },
      {
        title: "Straight to the car",
        body: "No taxi line, no rideshare lot. Water and a charger in the back.",
      },
    ],
    included: [
      "Flight tracking on every pickup, so delays are handled before you land",
      `${WAIT} of free wait after your flight lands`,
      `Meet & greet inside baggage claim with a name sign${MEET_AND_GREET_FREE ? ", at no charge" : ""}`,
      "Help with luggage, golf bags and car seats (ask when you book)",
      "Pickups at Terminal 1 and Terminal 3, Henderson Executive and North Las Vegas airports",
    ],
    whoFor:
      "Business travelers who need to be on time, families with a lot of luggage, and anyone landing late who doesn't want to wait in line.",
    faqs: [
      {
        q: "Where will my chauffeur meet me?",
        a: "Inside baggage claim with your name on a sign. For curbside pickup, tell us when you book.",
      },
      {
        q: "What if my bags take a long time?",
        a: `You have ${WAIT} of free wait from landing.`,
      },
      {
        q: "Do you drop off for departures too?",
        a: "Yes. Book an airport drop-off and we'll time your pickup to your flight.",
      },
    ],
    gallery: [
      { src: "/img4.jpg", alt: "Chauffeur waiting beside a black car" },
      {
        src: "/images/other/vegasAirport.jpg",
        alt: "Freeway to Harry Reid International at night",
      },
    ],
    cta: {
      text: "Book an airport pickup",
      href: "/book?trip=from-airport&airport=LAS",
    },
    meta: {
      title: "Private Airport Transfers in Las Vegas | Harry Reid (LAS)",
      description: `A private car to and from Harry Reid International, with flight tracking, meet & greet in baggage claim and ${WAIT} of free wait after landing.`,
    },
  },
  {
    slug: "hourly-chauffeur",
    title: "Hourly chauffeur",
    intro:
      "Keep the same car and chauffeur for as long as you need it. Dinner, a show, three stops on the Strip, a late night: your car waits while you go.",
    heroImage: "/images/other/aboutHeroii.jpg",
    heroAlt: "Chauffeur driving a passenger in the back of a black SUV",
    tags: [
      `${HOURLY_MIN_HOURS}-hour minimum`,
      "Unlimited stops",
      "Wait time included",
    ],
    stat: { value: `${HOURLY_MIN_HOURS} hrs`, label: "Minimum booking" },
    overview: [
      "Some nights don't fit into one ride. Book a chauffeur by the hour and the car is yours: it waits while you're inside and goes wherever you want next.",
      `You pay by the hour with a ${HOURLY_MIN_HOURS}-hour minimum. Stops and waiting are included.`,
    ],
    approach:
      "Hourly bookings start with a quick plan: where you're going, roughly how long you'll be at each stop, and anything your chauffeur should know. After that, the night is yours to change. Add a stop, stay longer at dinner or call it early, and your chauffeur adjusts. They wait at the property's limo or valet area, keep the car cool, and pull up when you text. It's the easy way to do a show and dinner on the Strip, a day of meetings or a property tour without parking or calling a new ride every hour.",
    steps: [
      {
        title: "Plan the night",
        body: "Tell us your stops and timing. We suggest the right car and hours.",
      },
      {
        title: "Pickup",
        body: "Your chauffeur arrives early and takes you to your first stop.",
      },
      {
        title: "Wait and go",
        body: "The car waits while you're inside. Text when you're ready.",
      },
      {
        title: "Home",
        body: "Dropped at your door, billed at the hourly rate you booked.",
      },
    ],
    included: [
      `${HOURLY_MIN_HOURS}-hour minimum, then billed by the hour`,
      "As many stops as you want within your hours",
      "Your chauffeur waits nearby and comes to the door when you're ready",
    ],
    whoFor:
      "Date nights, client dinners, shopping days, property tours and anyone with more than two stops.",
    faqs: [
      {
        q: "Can I add time on the night?",
        a: "Yes, if the car is free. Ask your chauffeur, and the extra time is added to your booking.",
      },
      {
        q: "Where does the chauffeur wait?",
        a: "At the property's limo or valet area, ready to pull up when you text.",
      },
      { q: "Is gratuity included?", a: "No. Gratuity is your choice." },
    ],
    gallery: [
      { src: "/img9.jpg", alt: "Chauffeur's hand on the steering wheel" },
      { src: "/img5.jpg", alt: "Chauffeur on the phone beside a black car" },
    ],
    cta: { text: "Book by the hour", href: "/book" },
    meta: {
      title: "Hourly Chauffeur Service in Las Vegas | By-the-Hour Car",
      description: `Keep the same car and chauffeur for dinner, a show and the night out. ${HOURLY_MIN_HOURS}-hour minimum, unlimited stops, waiting included.`,
    },
  },
  {
    slug: "corporate-travel",
    title: "Corporate travel",
    intro:
      "Las Vegas hosts some of the biggest trade shows in the country, and convention weeks are when cars run out first. A corporate account gets your team, clients and speakers moving without expense reports.",
    heroImage: "/img8.jpg",
    heroAlt: "Executive with a coffee in the back of a car",
    tags: ["Monthly invoice", "Guest rides", "Convention shuttles", "VIP"],
    stat: { value: "1", label: "Invoice a month" },
    overview: [
      "Corporate travel runs on reliability. Your team and your clients get the same early, quiet, spotless ride every time, and the paperwork stays out of your way.",
      "Every ride goes on one account and one monthly invoice, with a receipt for each.",
    ],
    approach:
      "We set up your account the way your office actually works: who can book, who gets the receipts, and which rides go on which invoice. From there, employees book their own rides or a travel manager books for them. For convention weeks, we plan shuttles between your hotels and the Las Vegas Convention Center around the show schedule, not the clock. For executives and VIP guests, we send discreet chauffeurs who know the difference between a meeting and a ride.",
    steps: [
      {
        title: "Open an account",
        body: "Tell us who books and who gets the invoice. We set it up to match.",
      },
      {
        title: "Book rides",
        body: "Employees book their own, or a travel manager books for them and guests.",
      },
      {
        title: "Ride",
        body: "Early, quiet, spotless. Receipts by email after every ride.",
      },
      {
        title: "One invoice",
        body: "Every ride lands on one monthly invoice, listed ride by ride.",
      },
    ],
    included: [
      "One account for your whole team, with every ride on a monthly invoice",
      "Employees book their own rides, or a travel manager books for them",
      "Convention shuttles between hotels and the Las Vegas Convention Center",
      "Discreet chauffeurs for executives and VIP guests",
    ],
    whoFor:
      "Event planners, executive assistants, sales teams and any company that flies people into Las Vegas.",
    faqs: [
      {
        q: "Can you handle CES week?",
        a: "Yes, with enough notice. Book convention-week cars as early as you can.",
      },
      {
        q: "Can a guest be billed to our account?",
        a: "Yes. Book the ride for your guest and it goes on your invoice.",
      },
      {
        q: "Do you send receipts?",
        a: "Every ride has a receipt, and the monthly invoice lists them all.",
      },
    ],
    gallery: [
      {
        src: "/img6.jpg",
        alt: "Chauffeur standing beside a black car",
      },
      {
        src: "/images/other/aboutHero.jpg",
        alt: "Chauffeur stepping out of a black SUV",
      },
    ],
    cta: { text: "Open a corporate account", href: "/corporate-accounts" },
    meta: {
      title: "Corporate Car Service in Las Vegas | Conventions & Executives",
      description:
        "Corporate accounts for Las Vegas business travel: one monthly invoice, guest rides, convention shuttles and discreet chauffeurs for executives.",
    },
  },
  {
    slug: "weddings",
    title: "Weddings",
    intro:
      "From the Marriage License Bureau to the chapel, the chapel to the reception, and the photos on the way. Your car runs on your schedule, not the meter.",
    heroImage: "/img10.jpg",
    heroAlt: "Bride holding flowers in the back of a car",
    heroPosition: "50% 30%",
    tags: ["Stretch limousine", "Photo stops", "Guest shuttles"],
    stat: { value: "3–5 hrs", label: "Typical wedding booking" },
    overview: [
      "On a wedding day, the schedule is everything. We plan the car around your timeline, so the two of you, the wedding party and your guests are always where they need to be.",
      "Book the car for the hours you need, and add a Sprinter for guests on the same booking.",
    ],
    approach:
      "We start with your timeline: getting ready, the license, the ceremony, photos and the reception. Then we work out where the car needs to be and when, with a little room for the moments that run long. Your chauffeur knows the chapels and the photo spots, from the Welcome to Fabulous Las Vegas sign to Downtown and the desert, and waits while you take your time. If guests are coming along, a Sprinter shuttles them between the hotel, the ceremony and the reception.",
    steps: [
      {
        title: "Share your timeline",
        body: "Tell us the plan for the day. We build the car's schedule around it.",
      },
      {
        title: "Pick the car",
        body: "A stretch limousine, SUV or Sprinter for the wedding party.",
      },
      {
        title: "The big day",
        body: "License, chapel, photo stops and reception, with the car waiting.",
      },
      {
        title: "Guests home",
        body: "Shuttles take guests back to the hotel after the reception.",
      },
    ],
    included: [
      "A stretch limousine, SUV or Sprinter for the wedding party",
      "Stops for photos at the Welcome to Fabulous Las Vegas sign, Downtown or the desert",
      "Guest shuttles between the hotel, ceremony and reception",
    ],
    whoFor:
      "Couples marrying in Las Vegas, wedding planners and chapels arranging transport for their couples.",
    faqs: [
      {
        q: "How long should we book for?",
        a: "Most weddings book 3 to 5 hours, from getting ready to arriving at the reception.",
      },
      {
        q: "Can you decorate the car?",
        a: "Ask when you book. Simple ribbons are usually fine.",
      },
      {
        q: "Can guests ride separately?",
        a: "Yes. Add a Sprinter for guests on the same booking.",
      },
    ],
    gallery: [
      {
        src: "/images/other/heroii.jpg",
        alt: "Gondola on the canal outside a Las Vegas resort",
      },
      { src: "/images/other/vegas.jpg", alt: "The Las Vegas Strip by day" },
    ],
    cta: { text: "Plan your wedding ride", href: "/book" },
    meta: {
      title: "Las Vegas Wedding Car Service | Limousines & Guest Shuttles",
      description:
        "Wedding cars in Las Vegas: the license, the chapel, photo stops and the reception, with a limousine, SUV or Sprinter and shuttles for guests.",
    },
  },
  {
    slug: "nightlife-events",
    title: "Nightlife & events",
    intro:
      "Allegiant Stadium, T-Mobile Arena, Sphere, the clubs and the fight. We drop you at the door, and we're waiting when it lets out, so you skip the post-event surge and the hour-long rideshare wait.",
    heroImage: "/images/other/herov.jpg",
    heroAlt: "The Las Vegas Valley lit up at night",
    tags: ["Door drop-off", "Pickup after", "No surge", "Groups of 14"],
    stat: { value: "0", label: "Surge after the event" },
    overview: [
      "The show is the easy part. Getting out afterward is where the night goes wrong: thousands of people, one rideshare lot and prices that double the minute the doors open.",
      "We drop you at the door and we're waiting at the venue's car service area when it lets out, at the price you booked.",
    ],
    approach:
      "We plan event nights around the venue, not just the address. Your chauffeur knows where the car service areas are at Allegiant Stadium, T-Mobile Arena and Sphere, how the traffic flows on a fight night, and when to leave the hotel so you're in your seat on time. Before the event ends, we text you the exact pickup spot. Make it a full night with hourly service: dinner, the show, the club and home, with as many stops as you want.",
    steps: [
      {
        title: "Book the night",
        body: "One ride to the venue and back, or hourly for the whole night.",
      },
      {
        title: "Door drop-off",
        body: "Dropped at the venue's car service area, timed to the doors.",
      },
      {
        title: "We text the spot",
        body: "Before it lets out, you get the exact pickup spot by text.",
      },
      {
        title: "Skip the surge",
        body: "Your car is waiting, at the price you booked. Straight home.",
      },
    ],
    included: [
      "Drop-off and pickup at the venue's car service area",
      "Hourly service for a full night out, with as many stops as you want",
      "Sprinters for groups of up to 14",
    ],
    whoFor:
      "Concert and game nights, birthdays, bachelor and bachelorette parties, Formula 1 weekend and NFR week.",
    faqs: [
      {
        q: "Where do you pick up after the event?",
        a: "At the venue's designated car service area. We'll text you the exact spot.",
      },
      {
        q: "Can we bring drinks?",
        a: "Ask when you book; we'll explain what's allowed in the vehicle.",
      },
      {
        q: "How early should we book for big events?",
        a: "As soon as you have tickets.",
      },
    ],
    gallery: [
      {
        src: "/img11.jpg",
        alt: "Rider laughing out of a car window on a night out",
      },
      {
        src: "/images/other/vegasAirport.jpg",
        alt: "Las Vegas freeway at night",
      },
    ],
    cta: { text: "Book your night out", href: "/book" },
    meta: {
      title: "Event & Nightlife Car Service in Las Vegas | No Surge",
      description:
        "Door drop-off and pickup at Allegiant Stadium, T-Mobile Arena, Sphere and the clubs. Skip the post-event surge and the rideshare line.",
    },
  },
  {
    slug: "group-transportation",
    title: "Group transportation",
    intro:
      "Keep the whole group together. Executive Sprinters seat up to 14, and larger groups ride in several vehicles on one booking.",
    heroImage: "/vehicles/charter.jpg",
    heroAlt: "Motor coach waiting under a covered pickup area",
    tags: ["Sprinters for 14", "Motor coaches", "One invoice"],
    stat: { value: "14", label: "Seats in a Sprinter" },
    overview: [
      "A group trip falls apart when the group does: three rideshares, two of them late, and someone left at the curb. One vehicle keeps everyone together, from the airport to the last stop of the night.",
      "Bigger groups ride in several vehicles on one booking, with one coordinator and one invoice.",
    ],
    approach:
      "We start with the headcount, the bags and the plan. Golf groups need room for clubs, wedding parties need to arrive together, and conference teams need to get from the airport to the hotel to the convention center on time. We pick the vehicles to fit, time airport pickups to one flight or several, and put one coordinator on the trip so you have one person to call for everything.",
    steps: [
      {
        title: "Tell us the group",
        body: "Headcount, bags, golf clubs and the plan. We size the vehicles.",
      },
      {
        title: "One coordinator",
        body: "One person to call for every vehicle on the trip.",
      },
      {
        title: "Ride together",
        body: "Airport pickups timed to one flight or several, then on to the hotel.",
      },
      {
        title: "One invoice",
        body: "Every vehicle on one booking, billed on one invoice.",
      },
    ],
    included: [
      "Executive Sprinters, stretch limousines and motor coaches",
      "Airport pickups for the whole group, timed to one flight or several",
      "One coordinator and one invoice for multi-vehicle trips",
    ],
    whoFor:
      "Bachelor and bachelorette parties, golf groups, wedding parties and conference teams.",
    faqs: [
      {
        q: "How many people can ride together?",
        a: "Up to 14 in an Executive Sprinter. Larger groups ride in several vehicles or a motor coach on one booking.",
      },
      {
        q: "Is there room for golf bags?",
        a: "Yes. Tell us how many sets when you book so we send a vehicle with room for every bag.",
      },
      {
        q: "Can you pick up from several flights?",
        a: "Yes. We time pickups to each flight and bring everyone to the same place.",
      },
    ],
    gallery: [
      {
        src: "/vehicles/sprinteriii.jpg",
        alt: "Executive Sprinter waiting beside a private jet",
      },
      { src: "/vehicles/coach.jpeg", alt: "Black motor coach" },
    ],
    cta: { text: "Book for your group", href: "/book" },
    meta: {
      title: "Group Transportation in Las Vegas | Sprinters & Coaches",
      description:
        "Keep the whole group together. Executive Sprinters seat up to 14, and bigger groups ride in several vehicles on one booking and one invoice.",
    },
  },
  {
    slug: "point-to-point",
    title: "Point-to-point rides",
    intro:
      "One ride, from where you are to where you're going. A hotel to a meeting, a home to a restaurant, the Strip to Downtown.",
    heroImage: "/images/other/hero.jpg",
    heroAlt: "The Las Vegas Strip skyline at dusk",
    tags: ["Door to door", "Price up front", `${STOP_FEE} per extra stop`],
    stat: { value: STOP_FEE, label: "Per extra stop" },
    overview: [
      "Not every ride needs a plan. Sometimes you just need a clean car and a professional driver to get you across town, on time, without the rideshare roulette.",
      "Door-to-door service with your price shown before you book.",
    ],
    approach: `Point-to-point rides are as simple as they sound. Book your pickup and drop-off, see the price, and your chauffeur arrives early. Need to stop on the way, to pick up a colleague or grab something from the hotel? Add it when you book for ${STOP_FEE} a stop. It works anywhere in the Las Vegas Valley: the Strip, Downtown, Henderson, Summerlin, North Las Vegas, Boulder City and Lake Las Vegas.`,
    steps: [
      {
        title: "Book online",
        body: "Pickup, drop-off and any stops. Your price before you pay.",
      },
      {
        title: "Chauffeur arrives",
        body: "Early, in a clean car, with your name and the address.",
      },
      {
        title: "Door to door",
        body: "Straight there, or via the stops you added.",
      },
      {
        title: "Receipt",
        body: "By email, the moment you're dropped off.",
      },
    ],
    included: [
      "Door-to-door service anywhere in the Las Vegas Valley",
      "Your price shown before you book",
      `${STOP_FEE} per extra stop on the way`,
    ],
    whoFor:
      "Dinners, meetings, a ride home, and anyone who wants a professional driver for one trip across town.",
    faqs: [
      {
        q: "Can I add a stop?",
        a: `Yes. Add it when you book; each extra stop is ${STOP_FEE}.`,
      },
      {
        q: "How far ahead do I need to book?",
        a: `Book online at least ${BOOKING_LEAD_HOURS} hours ahead. For conventions and big weekends, book as early as you can.`,
      },
      {
        q: "Is the price really the price?",
        a: "Yes. The booking tool shows your total before you pay, with no surge pricing.",
      },
    ],
    gallery: [
      {
        src: "/vehicles/heroiv.jpg",
        alt: "Black Chevrolet Suburban parked beside the grass",
      },
      { src: "/img3.webp", alt: "Black luxury SUV" },
    ],
    cta: { text: "Book a ride", href: "/book" },
    meta: {
      title: "Private Point-to-Point Rides in Las Vegas | Upfront Price",
      description: `One private ride, door to door, anywhere in the Las Vegas Valley. See your price before you book, with ${STOP_FEE} per extra stop.`,
    },
  },
  {
    slug: "day-trips",
    title: "Day trips",
    intro:
      "Hoover Dam, the Grand Canyon West Rim, Zion, Death Valley, Valley of Fire or a ride home to St. George. Travel in comfort with a chauffeur who waits while you explore.",
    heroImage: "/img2.png",
    heroAlt: "Black SUV on the open desert road",
    tags: ["Door to door", "Chauffeur waits", "Water on board"],
    stat: { value: "45 min", label: "To Hoover Dam" },
    overview: [
      "The best of the desert is an hour or two from the Strip, but it's a long day behind the wheel. Let someone else drive, and spend the day looking out the window instead of at the road.",
      "Day trips are booked by the hour, from pickup to drop-off, with the total shown before you book.",
    ],
    approach:
      "We plan day trips around the light and the heat. Hoover Dam is about 45 minutes away, Valley of Fire about an hour, Death Valley about two and Zion and the Grand Canyon West Rim about two and a half each way. We'll suggest the best time to leave, where to stop, and how long to plan at each place. Your chauffeur waits at every stop with the car cool and water on board, so you can take your time.",
    steps: [
      {
        title: "Pick the trip",
        body: "Hoover Dam, Zion, the Grand Canyon or your own route.",
      },
      {
        title: "Early start",
        body: "Picked up at your hotel, timed for the light and the heat.",
      },
      {
        title: "Stop and explore",
        body: "Your chauffeur waits at every stop with water and A/C.",
      },
      {
        title: "Back for dinner",
        body: "Dropped at your door, billed for the hours you booked.",
      },
    ],
    included: [
      "Door-to-door from your hotel, with stops when you want them",
      "Your chauffeur waits at each stop",
      "Water on board for desert drives",
    ],
    whoFor:
      "Sightseers, photographers, families and anyone who'd rather see the desert than drive it.",
    faqs: [
      {
        q: "How are day trips priced?",
        a: "By the hour, for the time from pickup to drop-off. You'll see the total before you book.",
      },
      {
        q: "Are park entrance fees included?",
        a: "No. Park and attraction fees are paid at the gate.",
      },
      {
        q: "What about summer heat?",
        a: "Every vehicle is air-conditioned and stocked with water. Plan hikes for the morning.",
      },
    ],
    gallery: [
      {
        src: "/img1.png",
        alt: "Black SUV parked on the desert flats at sunset",
      },
      { src: "/vehicles/sub.png", alt: "Black Chevrolet Suburban" },
    ],
    cta: { text: "Plan a day trip", href: "/book" },
    meta: {
      title: "Private Day Trips from Las Vegas | Hoover Dam, Zion & More",
      description:
        "Private day trips from Las Vegas to Hoover Dam, the Grand Canyon West Rim, Zion and Death Valley. Your chauffeur waits while you explore.",
    },
  },
];

export const serviceDetailBySlug = (slug: string) =>
  SERVICE_DETAILS.find((s) => s.slug === slug);
