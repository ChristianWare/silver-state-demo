import type { Metadata } from "next";
import { SITE } from "@/config/site";
import SiteNav from "@/components/shared/SiteNav/SiteNav";
import Hero from "@/components/HomePage/Hero/Hero";
import AboutSection from "@/components/HomePage/AboutSection/AboutSection";
import WhySection from "@/components/HomePage/WhySection/WhySection";

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
      </main>
    </>
  );
}
