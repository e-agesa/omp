import type { Metadata } from "next";
import { FindClinicContent } from "@/components/clinic/FindClinicContent";

export const metadata: Metadata = {
  title: "Find a Clinic",
  description: "Find pharmacies and clinics near you across Nairobi. Get directions, hours, and contact details.",
};

export default function FindClinicPage() {
  return <FindClinicContent />;
}
