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

export const metadata: Metadata = {
  title: {
    default: "Our Mall Pharmacy | Kenya's Trusted Online Pharmacy",
    template: "%s | Our Mall Pharmacy",
  },
  description:
    "Kenya's trusted online pharmacy. Shop medicines, supplements, beauty & skincare. Upload prescriptions, pay with M-Pesa, and get fast delivery across Nairobi.",
  keywords: [
    "online pharmacy Kenya",
    "buy medicine online Nairobi",
    "M-Pesa pharmacy",
    "prescription delivery Kenya",
    "Our Mall Pharmacy",
  ],
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
