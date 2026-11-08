import Link from "next/link";
import { SITE } from "@/config/site";
import MountainIcon from "@/components/shared/icons/MountainIcon/MountainIcon";
import { getCompanySettings } from "../../../../actions/admin/companySettings";
import styles from "./Footer.module.css";

const RIDE = [
  { text: "Book a ride", href: "/book" },
  { text: "Services", href: "/services" },
  { text: "Fleet", href: "/fleet" },
  { text: "Airports", href: "/airports" },
  { text: "Service areas", href: "/locations" },
  { text: "Routes", href: "/routes" },
];
const COMPANY = [
  { text: "About", href: "/about" },
  { text: "Corporate accounts", href: "/corporate-accounts" },
  { text: "Blog", href: "/blog" },
  { text: "Contact", href: "/contact" },
  { text: "Log in", href: "/login" },
];
const LEGAL = [
  { text: "Privacy", href: "/privacy" },
  { text: "Terms", href: "/terms" },
];

/**
 * The site footer: a midnight panel inside the same 10px frame as the hero,
 * with the wordmark across the bottom. Contact details come from Admin →
 * Company Settings (which fall back to src/config/site.ts until the
 * operator fills them in).
 */
export default async function Footer() {
  const s = await getCompanySettings();
  const year = new Date().getFullYear();
  const phone = s.dispatchPhone || SITE.phone.display;
  const phoneTel = s.dispatchPhoneRaw
    ? `+1${s.dispatchPhoneRaw}`
    : SITE.phone.tel;
  const email = s.supportEmail || SITE.email.support;

  return (
    <footer className={styles.footer}>
      <div className={styles.panel}>
        <div className={styles.inner}>
          <div className={styles.grid}>
            <div className={styles.brandCol}>
              <Link
                href='/'
                className={styles.logo}
                aria-label='SS Black Car home'
              >
                <MountainIcon className={styles.logoIcon} />
                <span className={styles.logoText}>
                  <span className={styles.logoName}>SS Black Car</span>
                  <span className={styles.logoSub}>Las Vegas, NV</span>
                </span>
              </Link>
              <p className={styles.address}>
                {s.officeAddress || SITE.address.street}
                <br />
                {s.officeCity ||
                  `${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`}
              </p>
              <div className={styles.contact}>
                <a href={`tel:${phoneTel}`}>{phone}</a>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>

            <nav className={styles.linkCol} aria-label='Ride'>
              <p className={styles.label}>Ride</p>
              <ul className={styles.list}>
                {RIDE.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.text}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className={styles.linkCol} aria-label='Company'>
              <p className={styles.label}>Company</p>
              <ul className={styles.list}>
                {COMPANY.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.text}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.dispatch}>
              <p className={styles.dispatchLabel}>Dispatch</p>
              <a href={`tel:${phoneTel}`} className={styles.dispatchPhone}>
                {phone}
              </a>
              <p className={styles.dispatchCopy}>
                Flight delayed or plans changed? Call dispatch and we&apos;ll
                sort it.
              </p>
            </div>
          </div>

          <div className={styles.bottom}>
            <p className={styles.copyright}>
              © {year} {SITE.legalName}
            </p>
            <ul className={styles.legal}>
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.text}</Link>
                </li>
              ))}
              <li>
                <a href='#top'>Back to top</a>
              </li>
            </ul>
          </div>
        </div>

        <p className={styles.wordmark} aria-hidden='true'>
          SS Black Car
        </p>
      </div>
    </footer>
  );
}
