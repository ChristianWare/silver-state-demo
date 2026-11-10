// /contact: write to us. Heading, a line about reply times and three
// shortcuts on the left; the form in an ivory panel on the right. The
// phone number comes from Admin → Company Settings.

import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import { SITE } from "@/config/site";
import { getCompanySettings } from "../../../../actions/admin/companySettings";
import ContactPanelForm from "./ContactPanelForm";
import styles from "./ContactWrite.module.css";

const SHORTCUTS = [
  {
    label: "A ride in the next few hours",
    link: "Book online",
    href: "/book",
  },
  {
    label: "A company account",
    link: "Open a corporate account",
    href: "/corporate-accounts",
  },
  {
    label: "A group of 15 or more",
    link: "Plan a group trip",
    href: "/services/group-transportation",
  },
];

export default async function ContactWrite() {
  const s = await getCompanySettings();
  const phone = s.dispatchPhone || SITE.phone.display;
  const phoneTel = s.dispatchPhoneRaw
    ? `+1${s.dispatchPhoneRaw}`
    : SITE.phone.tel;

  return (
    <section className={styles.section} id='write'>
      <LayoutWrapper>
        <div className={styles.grid}>
          <div className={styles.content}>
            <PulseEyeBrow text='Write to us' />
            {/* Two lines, set by the break; they never wrap. */}
            <h2 className={styles.heading}>
              Send us
              <br />a note.
            </h2>
            <p className={styles.intro}>
              We answer most notes within one working day. For a ride in the
              next few hours, call dispatch on{" "}
              <a href={`tel:${phoneTel}`}>{phone}</a>.
            </p>

            <ul className={styles.shortcuts}>
              {SHORTCUTS.map((sc) => (
                <li key={sc.href} className={styles.shortcut}>
                  <span className={styles.shortcutLabel}>{sc.label}</span>
                  <Link href={sc.href} className={styles.shortcutLink}>
                    {sc.link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.panel}>
            <ContactPanelForm />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
