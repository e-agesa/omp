import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Our Mall Pharmacy — Kenya's trusted online pharmacy. Reach us via phone, email, WhatsApp or visit us.",
  keywords: [
    "contact Our Mall Pharmacy",
    "pharmacy Nairobi location",
    "online pharmacy phone number",
    "pharmacy WhatsApp Kenya",
    "pharmacy email support",
    "Our Mall Pharmacy contact",
  ],
  openGraph: {
    title: "Contact Us | Our Mall Pharmacy",
    description:
      "Get in touch with Our Mall Pharmacy — Kenya's trusted online pharmacy. Reach us via phone, email, WhatsApp or visit us.",
    url: "https://ourmallpharmacy.com/contact/",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
