import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Footer from "@/components/shared/Footer/Footer";
import SessionProviderWrap from "@/components/Providers/SessionProvider";
import ToastsProvider from "@/components/Providers/ToastsProvider";
import ScrollToTop from "@/components/shared/ScrollToTop/ScrollToTop";
import PlausibleProvider from "next-plausible";
import { SITE } from "@/config/site";
import { buildBusinessSchema } from "@/lib/schema";
import { getCompanySettings } from "../../actions/admin/companySettings";

const SofiaSansExtraCondensedBold = localFont({
  src: "../../public/fonts/SofiaSansExtraCondensed-Bold.ttf",
  variable: "--SofiaSansExtraCondensedBold",
  display: "swap",
});

const SofiaSansExtraCondensedExtraBold = localFont({
  src: "../../public/fonts/SofiaSansExtraCondensed-ExtraBold.ttf",
  variable: "--SofiaSansExtraCondensedExtraBold",
  display: "swap",
});

const SofiaSansRegular = localFont({
  src: "../../public/fonts/SofiaSans-Regular.ttf",
  variable: "--SofiaSansRegular",
  display: "swap",
});

const SofiaSansLight = localFont({
  src: "../../public/fonts/SofiaSans-Light.ttf",
  variable: "--SofiaSansLight",
  display: "swap",
});

const SofiaSansBold = localFont({
  src: "../../public/fonts/SofiaSans-Bold.ttf",
  variable: "--SofiaSansBold",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    images: [
      {
        url: `${SITE.url}${SITE.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [`${SITE.url}${SITE.ogImage}`],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Same settings the footer reads; its profile URLs feed `sameAs`/`hasMap`.
  // If the database can't be reached, the schema falls back to site config.
  const settings = await getCompanySettings().catch(() => ({}));
  const businessSchema = buildBusinessSchema(settings);

  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://plausible.io' />
        <link
          rel='preconnect'
          href='https://res.cloudinary.com'
          crossOrigin='anonymous'
        />

        {/* ── PWA ── */}
        <meta name='theme-color' content={SITE.themeColor} />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <meta name='apple-mobile-web-app-title' content={SITE.name} />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
      </head>
      <body
        className={`${SofiaSansExtraCondensedBold.variable} ${SofiaSansRegular.variable} ${SofiaSansLight.variable} ${SofiaSansBold.variable} ${SofiaSansExtraCondensedExtraBold.variable}`}
      >
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema),
          }}
        />
        <ScrollToTop />
        <PlausibleProvider
          domain={SITE.domain}
          trackLocalhost={false}
          enabled={true}
        >
          <SessionProviderWrap>
            <ToastsProvider />
            {children}
            <Footer />
          </SessionProviderWrap>
        </PlausibleProvider>
      </body>
    </html>
  );
}
