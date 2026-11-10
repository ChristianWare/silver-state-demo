import type { Metadata } from "next";
import { SITE } from "@/config/site";
import SiteNav from "@/components/shared/SiteNav/SiteNav";
import ContactHero from "@/components/ContactPage/ContactHero/ContactHero";
import ContactDesks from "@/components/ContactPage/ContactDesks/ContactDesks";
import ContactWhere from "@/components/ContactPage/ContactWhere/ContactWhere";
import ContactWrite from "@/components/ContactPage/ContactWrite/ContactWrite";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE.name}: dispatch answers any time, plus reservations, corporate accounts and weddings. Phone, email and how pickups work at Harry Reid.`,
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <>
      {/* The white bar from the start: no hero to sit over on this page. */}
      <SiteNav variant='solid' />
      <main>
        <ContactHero />
        <ContactDesks />
        <ContactWhere />
        <ContactWrite />
      </main>
    </>
  );
}
