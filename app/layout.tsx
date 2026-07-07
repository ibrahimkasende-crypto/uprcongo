import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { IMAGES } from "@/lib/assets";
import { PARTY, SITE_URL } from "@/lib/constants";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PARTY.name} Congo | ${PARTY.fullName}`,
    template: `%s | ${PARTY.name} Congo`,
  },
  description: PARTY.description,
  keywords: [
    "UPR Congo",
    PARTY.fullName,
    "parti politique RDC",
    "Julien Ciakudia",
    PARTY.motto,
    "adhésion UPR",
  ],
  authors: [{ name: PARTY.fullName }],
  creator: PARTY.fullName,
  openGraph: {
    type: "website",
    locale: "fr_CD",
    url: SITE_URL,
    siteName: `${PARTY.name} Congo`,
    title: `${PARTY.name} Congo | ${PARTY.fullName}`,
    description: PARTY.description,
    images: [{ url: IMAGES.logo.main, alt: PARTY.logoAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PARTY.name} Congo | ${PARTY.fullName}`,
    description: `${PARTY.officialMessage} ${PARTY.rallyingCall}`,
    images: [IMAGES.logo.main],
  },
  robots: { index: true, follow: true },
  icons: { icon: IMAGES.logo.favicon },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${manrope.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <a href="#contenu" className="skip-link">
            Aller au contenu principal
          </a>
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
