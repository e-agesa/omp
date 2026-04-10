import type { Metadata } from "next";
import { FindClinicContent } from "@/components/clinic/FindClinicContent";

export const metadata: Metadata = {
  title: "Find a Clinic",
  description: "Find pharmacies and clinics near you across Nairobi. Get directions, hours, and contact details.",
  keywords: [
    "pharmacies near me Nairobi",
    "clinics near me Kenya",
    "find pharmacy Nairobi",
    "clinic directions Nairobi",
    "Our Mall Pharmacy locations",
    "healthcare facilities Kenya",
  ],
  openGraph: {
    title: "Find a Clinic | Our Mall Pharmacy",
    description: "Find pharmacies and clinics near you across Nairobi. Get directions, hours, and contact details.",
    url: "https://ourmallpharmacy.com/find-clinic/",
  },
};

export default function FindClinicPage() {
  return <FindClinicContent />;
}
