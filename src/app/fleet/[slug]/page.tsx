import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/config/site";
import { BUSINESS_REF } from "@/lib/schema";
import { fleetData } from "@/lib/data";
import { fleetVehicleBySlug } from "@/lib/fleetDetails";
import { getFleetRates } from "@/lib/booking/publicRates";
import SiteNav from "@/components/shared/SiteNav/SiteNav";
import FleetDetail from "@/components/FleetPage/FleetDetail/FleetDetail";
import FleetFaq from "@/components/FleetPage/FleetFaq/FleetFaq";
import ClosingCta from "@/components/HomePage/ClosingCta/ClosingCta";

// Prices come from Admin → Vehicle Categories. Saving a category refreshes
// these pages right away; this is the fallback refresh.
export const revalidate = 3600;

type Params = { slug: string };

export function generateStaticParams() {
  return fleetData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = fleetVehicleBySlug(slug);
  if (!v) return { title: "Not found" };
  return {
    title: { absolute: v.meta.title },
    description: v.meta.description,
    alternates: { canonical: `/fleet/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const v = fleetVehicleBySlug(slug);
  if (!v) notFound();
  const rates = await getFleetRates(v.slug);
  const hourly =
    rates && !rates.callForPricing && rates.hourlyRateCents
      ? rates.hourlyRateCents / 100
      : null;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Vehicle",
      name: v.name,
      description: v.about,
      vehicleConfiguration: v.vehicleClass,
      seatingCapacity: v.passengers,
      url: `${SITE.url}/fleet/${v.slug}`,
      ...(hourly && {
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: hourly,
          unitText: "per hour",
          seller: BUSINESS_REF,
        },
      }),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: v.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Fleet",
          item: `${SITE.url}/fleet`,
        },
        { "@type": "ListItem", position: 2, name: v.name },
      ],
    },
  ];

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteNav variant='solid' />
      <main>
        <FleetDetail vehicle={v} rates={rates} />
        <FleetFaq
          heading={`Questions about the ${v.short}`}
          items={v.faqs.map((f) => ({
            topic: v.name,
            question: f.q,
            answer: f.a,
          }))}
        />
        <ClosingCta />
      </main>
    </>
  );
}
