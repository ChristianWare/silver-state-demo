import type { Metadata } from "next";
import { SITE } from "@/config/site";
import SiteNav from "@/components/shared/SiteNav/SiteNav";
import AboutHero from "@/components/AboutPage/AboutHero/AboutHero";
import AboutStory from "@/components/AboutPage/AboutStory/AboutStory";

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
      </main>
    </>
  );
}
