// /contact: the hero. Heading and intro on the left, a photo on the right,
// then a row with the dispatch number (live open status), email and the
// office address. Contact details come from Admin → Company Settings
// (falling back to src/config/site.ts).

import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import { SITE } from "@/config/site";
import { DESKS } from "@/lib/contact";
import DeskStatus from "../DeskStatus";
import { getCompanySettings } from "../../../../actions/admin/companySettings";
import styles from "./ContactHero.module.css";

export default async function ContactHero() {
  const s = await getCompanySettings();
  const phone = s.dispatchPhone || SITE.phone.display;
  const phoneTel = s.dispatchPhoneRaw
    ? `+1${s.dispatchPhoneRaw}`
    : SITE.phone.tel;
  const email = s.supportEmail || SITE.email.support;
  const street = s.officeAddress || SITE.address.street;
  const city =
    s.officeCity ||
    `${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${street}, ${city}`)}`;
  const dispatch = DESKS.find((d) => d.id === "dispatch") ?? DESKS[0];

  return (
    <section className={styles.section}>
      <LayoutWrapper>
        <div className={styles.grid}>
          <div className={styles.content}>
            <PulseEyeBrow text='Contact' />
            {/* Two lines, set by the break; they never wrap. */}
            <h1 className={styles.heading}>
              Talk to
              <br />
              dispatch.
            </h1>
            <p className={styles.intro}>
              A person answers, day or night. Call dispatch for anything about a
              ride today; for bookings ahead, corporate accounts and weddings,
              each desk below has its own line.
            </p>
          </div>

          <div className={styles.media}>
            <Image
              src='/img5.jpg'
              alt='Silver State chauffeur on the phone beside a black car'
              fill
              priority
              sizes='(max-width: 1068px) 100vw, 50vw'
              className={styles.img}
            />
            <span className={styles.tag}>
              <span className={styles.tagDot} aria-hidden='true' />
              Dispatch, Las Vegas
            </span>
          </div>
        </div>

        <dl className={styles.info}>
          <div className={styles.item}>
            <dt className={styles.label}>Dispatch</dt>
            <dd className={styles.value}>
              <a href={`tel:${phoneTel}`} className={styles.phone}>
                {phone}
              </a>
              <DeskStatus hours={dispatch.hours} />
            </dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.label}>Email</dt>
            <dd className={styles.value}>
              <a href={`mailto:${email}`} className={styles.email}>
                {email}
              </a>
              <span className={styles.small}>
                Replies within one working day
              </span>
            </dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.label}>Office</dt>
            <dd className={styles.value}>
              <address className={styles.address}>
                {street}
                <br />
                {city}
              </address>
              <a
                href={maps}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.link}
              >
                Directions
              </a>
            </dd>
          </div>
        </dl>
      </LayoutWrapper>
    </section>
  );
}
