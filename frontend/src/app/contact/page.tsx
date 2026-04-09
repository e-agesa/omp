import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with OMP — Kenya's trusted online pharmacy. Reach us via phone, email, WhatsApp or visit us.",
};

export default function ContactPage() {
  return <ContactContent />;
}
