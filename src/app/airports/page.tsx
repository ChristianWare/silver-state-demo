import type { Metadata } from "next";
import {
  AIRPORT_FAQS,
  NEVADA_AIRPORTS,
  NPIAS_AIRPORT_COUNT,
} from "@/lib/nevadaAirports";
import SiteNav from "@/components/shared/SiteNav/SiteNav";
import AirportsHero from "@/components/AirportsPage/AirportsHero/AirportsHero";
import AirportsServed from "@/components/AirportsPage/AirportsServed/AirportsServed";
import AirportsAviation from "@/components/AirportsPage/AirportsAviation/AirportsAviation";
import AirportsDirectory from "@/components/AirportsPage/AirportsDirectory/AirportsDirectory";
import FleetFaq from "@/components/FleetPage/FleetFaq/FleetFaq";
import ClosingCta from "@/components/HomePage/ClosingCta/ClosingCta";

export const metadata: Metadata = {
  title: {
    absolute:
      "Nevada Airports: Every Airport in Nevada, with Codes & Drive Times",
  },
  description: `All ${NPIAS_AIRPORT_COUNT} public airports in Nevada in one place, with codes and drive times from the Las Vegas Strip, plus car service to Harry Reid, Henderson Executive, North Las Vegas and Boulder City.`,
  alternates: { canonical: "/airports" },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Airports in Nevada",
    numberOfItems: NEVADA_AIRPORTS.length,
    itemListElement: NEVADA_AIRPORTS.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Airport",
        name: a.name,
        ...(a.iata && { iataCode: a.iata }),
        ...(a.icao && { icaoCode: a.icao }),
        address: {
          "@type": "PostalAddress",
          addressLocality: a.city,
          addressRegion: "NV",
        },
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: AIRPORT_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
];

export default function Page() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* The white bar from the start: no hero to sit over on this page. */}
      <SiteNav variant='solid' />
      <main>
        <AirportsHero />
        <AirportsServed />
        <AirportsAviation />
        <AirportsDirectory />
        <FleetFaq
          heading='Questions about Nevada airports'
          items={AIRPORT_FAQS}
        />
        <ClosingCta />
      </main>
    </>
  );
}
