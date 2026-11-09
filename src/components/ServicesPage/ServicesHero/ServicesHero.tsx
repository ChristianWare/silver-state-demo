// Services page: the hero. Heading, intro, button and a "not sure?" phone
// line on the left; a photo on the right with a tilted "Reserved" tag over
// its corner, like a luggage tag. The phone number comes from Admin →
// Company Settings (falls back to src/config/site.ts).

import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import MountainIcon from "@/components/shared/icons/MountainIcon/MountainIcon";
import { SITE } from "@/config/site";
import { getCompanySettings } from "../../../../actions/admin/companySettings";
import styles from "./ServicesHero.module.css";

export default async function ServicesHero() {
  const s = await getCompanySettings();
  const phone = s.dispatchPhone || SITE.phone.display;
  const phoneTel = s.dispatchPhoneRaw
    ? `+1${s.dispatchPhoneRaw}`
    : SITE.phone.tel;

  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.grid}>
          <div className={styles.content}>
            <div className={styles.head}>
              <PulseEyeBrow text='Services in Las Vegas' />
              {/* Two lines, set by the break; they never wrap. */}
              <h1 className={styles.heading}>
                Every trip,
                <br />
                chauffeured.
              </h1>
            </div>
            <p className={styles.intro}>
              Airport pickups, nights out, conventions, weddings and road trips.
              Every ride is private, booked online with the price up front, and
              driven by a professional chauffeur.
            </p>
            <ArrowButton
              href='/book'
              text='Book your ride'
              variant='midnight'
            />
            <p className={styles.call}>
              Not sure which service fits? Call{" "}
              <a href={`tel:${phoneTel}`}>{phone}</a> and we&apos;ll set it up
              for you.
            </p>
          </div>

          <div className={styles.mediaWrap}>
            <div className={styles.media}>
              <Image
                src='/images/other/aboutHeroii.jpg'
                alt='Chauffeur driving a passenger in the back of a black SUV'
                fill
                priority
                sizes='(max-width: 1068px) 100vw, 50vw'
                className={styles.img}
              />
            </div>

            {/* A luggage-style tag over the photo's corner. */}
            <div className={styles.tag} aria-hidden='true'>
              <span className={styles.tagHole} />
              <span className={styles.tagBrand}>
                <MountainIcon className={styles.tagIcon} />
                <span className={styles.tagText}>
                  <span className={styles.tagName}>SS Black Car</span>
                  <span className={styles.tagSub}>Las Vegas, NV</span>
                </span>
              </span>
              <span className={styles.tagWord}>Reserved</span>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
