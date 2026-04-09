import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Health",
  description: "Manage your account, prescriptions, orders and health dashboard.",
};

export default function AccountPage() {
  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-2xl font-bold text-omp-dark mb-6">My Health Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Refill Reminder Card */}
        <div className="bg-gradient-to-br from-omp-blue to-omp-blue-light rounded-medical p-5 text-white">
          <h3 className="font-bold text-lg mb-1">Need a Refill?</h3>
          <p className="text-sm text-white/80">
            Your 30-day Vitamin D supply may be running low. Reorder now for uninterrupted wellness.
          </p>
          <button className="mt-3 bg-omp-white text-omp-blue font-semibold px-5 py-2 rounded-medical text-sm hover:shadow-lg transition-all">
            Reorder Now
          </button>
        </div>

        {/* Prescription Status */}
        <div className="bg-omp-white rounded-medical shadow-card p-5">
          <h3 className="font-bold text-omp-dark mb-2">Active Prescriptions</h3>
          <p className="text-sm text-omp-gray">No active prescriptions.</p>
          <Link
            href="/prescription"
            className="inline-block mt-3 text-sm text-omp-blue font-medium hover:underline"
          >
            Upload a prescription
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-omp-white rounded-medical shadow-card p-5">
          <h3 className="font-bold text-omp-dark mb-2">Recent Orders</h3>
          <p className="text-sm text-omp-gray">No recent orders.</p>
          <Link
            href="/shop"
            className="inline-block mt-3 text-sm text-omp-blue font-medium hover:underline"
          >
            Start shopping
          </Link>
        </div>

        {/* Quick links */}
        <div className="bg-omp-white rounded-medical shadow-card p-5">
          <h3 className="font-bold text-omp-dark mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/track-order" className="text-omp-blue hover:underline">
                Track an Order
              </Link>
            </li>
            <li>
              <Link href="/prescription" className="text-omp-blue hover:underline">
                Upload Prescription
              </Link>
            </li>
            <li>
              <Link href="/health" className="text-omp-blue hover:underline">
                Health Articles
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
