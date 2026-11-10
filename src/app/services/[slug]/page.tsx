import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/services";
import { serviceDetailBySlug } from "@/lib/serviceDetails";
import SiteNav from "@/components/shared/SiteNav/SiteNav";
import ServiceDetail from "@/components/ServiceDetailPage/ServiceDetail";
import ClosingCta from "@/components/HomePage/ClosingCta/ClosingCta";

type Params = { slug: string };

export function generateStaticParams() {
  return servicesData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = serviceDetailBySlug(slug);
  if (!data) return { title: "Not found" };
  return {
    title: { absolute: data.meta.title },
    description: data.meta.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const data = serviceDetailBySlug(slug);
  if (!data) notFound();
  return (
    <>
      {/* The white bar from the start: no hero to sit over on this page. */}
      <SiteNav variant='solid' />
      <main>
        <ServiceDetail data={data} />
        <ClosingCta />
      </main>
    </>
  );
}
