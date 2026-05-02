import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NavigationProgressProvider from "@/components/common/NavigationProgressProvider";
import MovementCtaSection from "@/components/common/MovementCtaSection";
import { ABOUT_US_PAGE_SLUG } from "@/config/publicRoutes";
import { getAboutPageData } from "@/lib/api/about";

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const viewport: Viewport = {
  themeColor: "#009FE8",
};

const GTM_ID = "GTM-TZNFVFFC";

export const metadata: Metadata = {
  title: "Lamipak - Your Platform",
  description: "Building the future with innovative solutions",
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const aboutData = await getAboutPageData(ABOUT_US_PAGE_SLUG);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body
        className={`${lato.variable} font-sans antialiased`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            title="Google Tag Manager"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <NavigationProgressProvider>
          <Header />
          {children}
          <MovementCtaSection data={aboutData.cta} />
          <Footer />
        </NavigationProgressProvider>
      </body>
    </html>
  );
}
