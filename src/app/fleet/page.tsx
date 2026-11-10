import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { BUSINESS_REF } from "@/lib/schema";
import { FLEET, FLEET_QUESTIONS } from "@/lib/fleetDetails";
import { getFleetRatesBySlug } from "@/lib/booking/publicRates";
import SiteNav from "@/components/shared/SiteNav/SiteNav";
import FleetHero from "@/components/FleetPage/FleetHero/FleetHero";
import FleetCompare from "@/components/FleetPage/FleetCompare/FleetCompare";
import FleetSection from "@/components/HomePage/FleetSection/FleetSection";
import FleetFaq from "@/components/FleetPage/FleetFaq/FleetFaq";
import ClosingCta from "@/components/HomePage/ClosingCta/ClosingCta";

// Prices come from Admin → Vehicle Categories (refreshed on save).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Fleet: Sedans, SUVs, Sprinters, Limos & Coaches",
  description: `The ${SITE.name} fleet in Las Vegas: executive sedans, luxury SUVs, Executive Sprinters, a stretch limousine and motor coaches. Pick by group size and luggage.`,
  alternates: { canonical: "/fleet" },
};

export default async function Page() {
  const rates = await getFleetRatesBySlug();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${SITE.name} fleet`,
      url: `${SITE.url}/fleet`,
      itemListElement: FLEET.map((v, i) => {
        const r = rates.get(v.slug);
        const hourly =
          r && !r.callForPricing && r.hourlyRateCents
            ? r.hourlyRateCents / 100
            : null;
        return {
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Vehicle",
            name: v.name,
            description: v.intro,
            vehicleConfiguration: v.vehicleClass,
            seatingCapacity: v.passengers,
            url: `${SITE.url}/fleet/${v.slug}`,
            offers: {
              "@type": "Offer",
              seller: BUSINESS_REF,
              ...(hourly && {
                priceSpecification: {
                  "@type": "PriceSpecification",
                  price: hourly,
                  priceCurrency: "USD",
                  unitText: "HOUR",
                },
              }),
            },
          },
        };
      }),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FLEET_QUESTIONS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* The white bar from the start: no hero to sit over on this page. */}
      <SiteNav variant='solid' />
      <main>
        <FleetHero />
        <FleetCompare rates={rates} />
        <FleetSection />
        <FleetFaq items={FLEET_QUESTIONS} />
        <ClosingCta />
      </main>
    </>
  );
}
