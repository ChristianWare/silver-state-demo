// /services/[slug]: one service in full. A hero (heading, intro, button and
// a wide photo), then a sticky navy summary card beside the details:
// overview, our approach with four steps, what's included, who it's for,
// questions, a two-photo gallery and three other services (the same
// cards as the services page), stacked.
//
// Content lives in src/lib/serviceDetails.ts. The questions also go out as
// FAQPage schema, and the page as a Service from the business.

import Image from "next/image";
import Link from "next/link";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import PulseEyeBrow from "@/components/shared/PulseEyeBrow/PulseEyeBrow";
import ArrowButton from "@/components/shared/ArrowButton/ArrowButton";
import { SITE } from "@/config/site";
import { BUSINESS_REF } from "@/lib/schema";
import type { ServiceDetail as Data } from "@/lib/serviceDetails";
import ServiceCard from "@/components/ServicesPage/ServicesList/ServiceCard";
import { otherServiceCards } from "@/components/ServicesPage/ServicesList/serviceCards";
import cardStyles from "@/components/ServicesPage/ServicesList/ServicesList.module.css";
import { getCompanySettings } from "../../../actions/admin/companySettings";
import styles from "./ServiceDetail.module.css";

export default async function ServiceDetail({ data }: { data: Data }) {
  const s = await getCompanySettings();
  const phone = s.dispatchPhone || SITE.phone.display;
  const phoneTel = s.dispatchPhoneRaw
    ? `+1${s.dispatchPhoneRaw}`
    : SITE.phone.tel;

  // Three other services, mixed differently on each page.
  const others = otherServiceCards(data.slug, 3);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: data.title,
      serviceType: data.title,
      description: data.meta.description,
      provider: BUSINESS_REF,
      areaServed: { "@type": "City", name: SITE.market.city },
      url: `${SITE.url}/services/${data.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <LayoutWrapper>
          <div className={styles.heroTop}>
            <div className={styles.head}>
              <PulseEyeBrow text={`${data.title} in Las Vegas`} />
              <h1 className={styles.heading}>{data.title}</h1>
            </div>
            <div className={styles.side}>
              <p className={styles.intro}>{data.intro}</p>
              <div className={styles.actions}>
                <ArrowButton
                  href={data.cta.href}
                  text={data.cta.text}
                  variant='midnight'
                />
                <Link href='/services' className={styles.textLink}>
                  All services
                </Link>
              </div>
            </div>
          </div>

          <figure className={styles.heroFigure}>
            <div className={styles.heroImage}>
              <Image
                src={data.heroImage}
                alt={data.heroAlt}
                fill
                priority
                sizes='(max-width: 1344px) 100vw, 1344px'
                className={styles.image}
                style={{ objectPosition: data.heroPosition }}
              />
              <span className={styles.heroTag}>
                <span className={styles.heroDot} aria-hidden='true' />
                Silver State · {data.title}
              </span>
            </div>
          </figure>
        </LayoutWrapper>
      </section>

      {/* ── Details ── */}
      <section className={styles.details} aria-label={`${data.title} details`}>
        <LayoutWrapper>
          <div className={styles.layout}>
            {/* Sticky summary card */}
            <aside className={styles.aside}>
              <div className={styles.summary}>
                <div>
                  <span className={styles.summaryLabel}>
                    What&apos;s included
                  </span>
                  <ul className={styles.chips}>
                    {data.tags.map((t) => (
                      <li key={t} className={styles.chip}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.stat}>
                  <p className={styles.statValue}>{data.stat.value}</p>
                  <span className={styles.summaryLabel}>{data.stat.label}</span>
                </div>

                <div className={styles.summaryFoot}>
                  <ArrowButton
                    href={data.cta.href}
                    text={data.cta.text}
                    variant='white'
                  />
                  <p className={styles.summaryCall}>
                    Or call <a href={`tel:${phoneTel}`}>{phone}</a>
                  </p>
                </div>
              </div>
            </aside>

            {/* Content rows */}
            <div className={styles.content}>
              <div className={styles.row}>
                <h2 className={`${styles.rowTitle} h4`}>Overview</h2>
                <div className={styles.rowBody}>
                  {data.overview.map((p) => (
                    <p key={p.slice(0, 24)} className={styles.text}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div className={styles.row}>
                <h2 className={`${styles.rowTitle} h4`}>Our approach</h2>
                <div className={styles.rowBody}>
                  <p className={styles.text}>{data.approach}</p>
                  <ol className={styles.steps}>
                    {data.steps.map((st, i) => (
                      <li key={st.title} className={styles.step}>
                        <div className={styles.stepTop}>
                          <span className={styles.stepBar} aria-hidden='true' />
                          <h3 className={styles.stepTitle}>{st.title}</h3>
                          <span className={styles.stepNum}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className={styles.stepBody}>{st.body}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className={styles.row}>
                <h2 className={`${styles.rowTitle} h4`}>
                  What&apos;s included
                </h2>
                <ul className={`${styles.rowBody} ${styles.included}`}>
                  {data.included.map((t) => (
                    <li key={t} className={styles.includedItem}>
                      <svg
                        className={styles.check}
                        viewBox='0 0 24 24'
                        width='16'
                        height='16'
                        aria-hidden='true'
                      >
                        <path
                          d='M5 12.5l4.5 4.5L19 7.5'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.row}>
                <h2 className={`${styles.rowTitle} h4`}>Who it&apos;s for</h2>
                <div className={styles.rowBody}>
                  <p className={styles.text}>{data.whoFor}</p>
                </div>
              </div>

              <div className={styles.row}>
                <h2 className={`${styles.rowTitle} h4`}>Questions</h2>
                <dl className={`${styles.rowBody} ${styles.faqs}`}>
                  {data.faqs.map((f) => (
                    <div key={f.q} className={styles.faq}>
                      <dt className={styles.faqQ}>{f.q}</dt>
                      <dd className={styles.faqA}>{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className={styles.gallery}>
                {data.gallery.map((g) => (
                  <div key={g.src} className={styles.galleryImage}>
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes='(max-width: 1068px) 50vw, 30vw'
                      className={styles.image}
                    />
                  </div>
                ))}
              </div>

              <div className={`${styles.row} ${styles.rowLast}`}>
                <h2 className={`${styles.rowTitle} h4`}>More services</h2>
                <ul className={`${styles.rowBody} ${styles.more}`}>
                  {others.map((o) => (
                    <li key={o.slug} className={cardStyles.item}>
                      <ServiceCard s={o} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </section>
    </>
  );
}
