import type { Metadata } from "next";
import { PrescriptionUpload } from "@/components/prescription/PrescriptionUpload";

export const metadata: Metadata = {
  title: "Upload Prescription",
  description:
    "Upload your prescription and get medicines delivered. Get pharmacist support and fast delivery across Nairobi.",
};

export default function PrescriptionPage() {
  return (
    <div className="w-full px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-omp-dark">Upload Prescription</h1>
        <p className="text-sm text-omp-gray mt-1">
          Get your prescription reviewed by a licensed pharmacist and have your medicines delivered.
        </p>
      </div>
      <PrescriptionUpload />
    </div>
  );
}
