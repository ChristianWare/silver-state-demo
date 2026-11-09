import type { Metadata } from "next";
import { SITE } from "@/config/site";
import SiteNav from "@/components/shared/SiteNav/SiteNav";
import ServicesHero from "@/components/ServicesPage/ServicesHero/ServicesHero";
import ServicesList from "@/components/ServicesPage/ServicesList/ServicesList";
import AboutBeliefs from "@/components/AboutPage/AboutBeliefs/AboutBeliefs";
import FaqSection from "@/components/HomePage/FaqSection/FaqSection";
import ClosingCta from "@/components/HomePage/ClosingCta/ClosingCta";

export const metadata: Metadata = {
  title: "Services",
  description: `Airport transfers, corporate travel, events, and hourly chauffeur service from ${SITE.name}.`,
};

export default function Page() {
  return (
    <>
      {/* The white bar from the start: no hero to sit over on this page. */}
      <SiteNav variant='solid' />
      <main>
        <ServicesHero />
        <ServicesList />
        <AboutBeliefs />
        <FaqSection />
        <ClosingCta />
      </main>
    </>
  );
}
