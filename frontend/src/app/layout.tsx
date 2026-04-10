import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { PageTransitionProvider } from "@/components/motion/PageTransitionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://ourmallpharmacy.com";
const SITE_NAME = "Our Mall Pharmacy";
const SITE_DESC = "Kenya's trusted online pharmacy. Shop 1,700+ genuine medicines, supplements, beauty & skincare products. Upload prescriptions, pay with M-Pesa, and get same-day delivery across Nairobi.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Kenya's Trusted Online Pharmacy`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  keywords: [
    "online pharmacy Kenya",
    "buy medicine online Nairobi",
    "M-Pesa pharmacy",
    "prescription delivery Kenya",
    "Our Mall Pharmacy",
    "pharmacy near me Nairobi",
    "buy drugs online Kenya",
    "medicine delivery Nairobi",
    "health products Kenya",
    "skincare products Nairobi",
    "vitamins supplements Kenya",
    "PPB certified pharmacy",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Shop Medicines, Supplements & Beauty Online`,
    description: SITE_DESC,
    images: [{ url: "/images/logo-blue.jpeg", width: 800, height: 800, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Kenya's Trusted Online Pharmacy`,
    description: SITE_DESC,
    images: ["/images/logo-blue.jpeg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "Health & Pharmacy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-omp-slate">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </main>
        <Footer />
        <MobileNav />
        <WhatsAppButton />
      </body>
    </html>
  );
}
