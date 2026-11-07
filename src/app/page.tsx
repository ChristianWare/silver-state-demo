import type { Metadata } from "next";
import { SITE } from "@/config/site";
import SiteNav from "@/components/shared/SiteNav/SiteNav";
import Hero from "@/components/HomePage/Hero/Hero";

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
      </main>
    </>
  );
}
