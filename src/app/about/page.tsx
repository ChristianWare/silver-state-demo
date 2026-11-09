import type { Metadata } from "next";
import { SITE } from "@/config/site";
import SiteNav from "@/components/shared/SiteNav/SiteNav";
import AboutHero from "@/components/AboutPage/AboutHero/AboutHero";
import AboutStory from "@/components/AboutPage/AboutStory/AboutStory";
import AboutTimeline from "@/components/AboutPage/AboutTimeline/AboutTimeline";
import AboutMission from "@/components/AboutPage/AboutMission/AboutMission";
import AboutBeliefs from "@/components/AboutPage/AboutBeliefs/AboutBeliefs";
import AboutLicensed from "@/components/AboutPage/AboutLicensed/AboutLicensed";
import AboutTeam from "@/components/AboutPage/AboutTeam/AboutTeam";
import VideoSection from "@/components/HomePage/VideoSection/VideoSection";
import ReviewsSection from "@/components/HomePage/ReviewsSection/ReviewsSection";
import ClosingCta from "@/components/HomePage/ClosingCta/ClosingCta";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE.name}: who we are, our chauffeurs, our fleet, and our standards.`,
};

export default function Page() {
  return (
    <>
      {/* The white bar from the start: no hero to sit over on this page. */}
      <SiteNav variant='solid' />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutTimeline />
        <AboutMission />
        <AboutBeliefs />
        <AboutLicensed />
        <AboutTeam />
        <VideoSection />
        <ReviewsSection />
        <ClosingCta />
      </main>
    </>
  );
}
