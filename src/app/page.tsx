import type { Metadata } from "next";
import { SITE } from "@/config/site";
import SiteNav from "@/components/shared/SiteNav/SiteNav";
import Hero from "@/components/HomePage/Hero/Hero";
import AboutSection from "@/components/HomePage/AboutSection/AboutSection";
import WhySection from "@/components/HomePage/WhySection/WhySection";
import ServicesSection from "@/components/HomePage/ServicesSection/ServicesSection";
import HowItWorks from "@/components/HomePage/HowItWorks/HowItWorks";
import FleetSection from "@/components/HomePage/FleetSection/FleetSection";
import AirportsSection from "@/components/HomePage/AirportsSection/AirportsSection";
import VideoSection from "@/components/HomePage/VideoSection/VideoSection";
import ServiceAreasSection from "@/components/HomePage/ServiceAreasSection/ServiceAreasSection";
import ReviewsSection from "@/components/HomePage/ReviewsSection/ReviewsSection";
import FaqSection from "@/components/HomePage/FaqSection/FaqSection";
import ClosingCta from "@/components/HomePage/ClosingCta/ClosingCta";

export const metadata: Metadata = {
  title: "Home",
  description: `${SITE.description}`,
};

export default function Page() {
  return (
    <>
      <SiteNav variant='overlay' heroId='hero' />
      <main>
        <Hero />
        <AboutSection />
        <WhySection />
        <ServicesSection />
        <HowItWorks />
        <FleetSection />
        <AirportsSection />
        <VideoSection />
        <ServiceAreasSection />
        <ReviewsSection />
        <FaqSection />
        <ClosingCta />
      </main>
    </>
  );
}
