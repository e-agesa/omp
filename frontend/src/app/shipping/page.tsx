import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Our Mall Pharmacy Shipping Policy — delivery zones, times, costs, and tracking information.",
  keywords: [
    "pharmacy delivery Nairobi",
    "shipping policy Kenya",
    "medicine delivery zones",
    "Our Mall Pharmacy delivery",
    "free delivery pharmacy Nairobi",
    "same day delivery medicine",
  ],
  openGraph: {
    title: "Shipping Policy | Our Mall Pharmacy",
    description: "Our Mall Pharmacy Shipping Policy — delivery zones, times, costs, and tracking information.",
    url: "https://ourmallpharmacy.com/shipping/",
  },
};

export default function ShippingPage() {
  return (
    <LegalPage title="Shipping Policy" lastUpdated="April 1, 2026">
      <h2>1. Delivery Areas</h2>
      <p>
        Our Mall Pharmacy currently delivers across the greater Nairobi metropolitan area. We are expanding to Mombasa, Kisumu, and Nakuru soon.
      </p>

      <h3>Nairobi Zones &amp; Estimated Delivery Times</h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-omp-slate">
            <th className="text-left px-4 py-2 font-semibold">Zone</th>
            <th className="text-left px-4 py-2 font-semibold">Estates Covered</th>
            <th className="text-left px-4 py-2 font-semibold">Est. Time</th>
            <th className="text-left px-4 py-2 font-semibold">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-omp-gray-light">
            <td className="px-4 py-2 font-medium">Westlands</td>
            <td className="px-4 py-2">Westlands, Parklands, Highridge, Kangemi</td>
            <td className="px-4 py-2">30 min</td>
            <td className="px-4 py-2">KES 150</td>
          </tr>
          <tr className="border-b border-omp-gray-light">
            <td className="px-4 py-2 font-medium">Kilimani</td>
            <td className="px-4 py-2">Kilimani, Hurlingham, Yaya, Ngong Road</td>
            <td className="px-4 py-2">25 min</td>
            <td className="px-4 py-2">KES 150</td>
          </tr>
          <tr className="border-b border-omp-gray-light">
            <td className="px-4 py-2 font-medium">Nairobi CBD</td>
            <td className="px-4 py-2">CBD, Upper Hill, Community</td>
            <td className="px-4 py-2">35 min</td>
            <td className="px-4 py-2">KES 100</td>
          </tr>
          <tr className="border-b border-omp-gray-light">
            <td className="px-4 py-2 font-medium">Karen</td>
            <td className="px-4 py-2">Karen, Lang&apos;ata, Hardy, Ngong</td>
            <td className="px-4 py-2">45 min</td>
            <td className="px-4 py-2">KES 250</td>
          </tr>
          <tr className="border-b border-omp-gray-light">
            <td className="px-4 py-2 font-medium">Eastlands</td>
            <td className="px-4 py-2">Buruburu, Donholm, Umoja, Embakasi</td>
            <td className="px-4 py-2">50 min</td>
            <td className="px-4 py-2">KES 200</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-medium">Greater Nairobi</td>
            <td className="px-4 py-2">Other areas within Nairobi County</td>
            <td className="px-4 py-2">60-90 min</td>
            <td className="px-4 py-2">KES 300</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Free Delivery</h2>
      <p>
        Orders above <strong>KES 2,000</strong> qualify for <strong>free delivery</strong> across all Nairobi zones. This is automatically applied at checkout — no promo code required.
      </p>

      <h2>3. Delivery Hours</h2>
      <ul>
        <li><strong>Monday - Friday:</strong> 8:00 AM - 8:00 PM</li>
        <li><strong>Saturday:</strong> 9:00 AM - 6:00 PM</li>
        <li><strong>Sunday:</strong> 10:00 AM - 4:00 PM</li>
        <li><strong>Public Holidays:</strong> 10:00 AM - 2:00 PM</li>
      </ul>
      <p>
        Orders placed outside delivery hours will be processed and dispatched on the next available delivery window.
      </p>

      <h2>4. Order Tracking</h2>
      <p>
        Once your order is dispatched, you will receive an SMS and email with a tracking link. You can also track your order from your account dashboard or by visiting the <strong>Track Order</strong> page on our website.
      </p>

      <h2>5. Delivery Requirements</h2>
      <ul>
        <li>Someone must be present at the delivery address to receive the order</li>
        <li>For prescription medicines, the recipient may need to verify their identity</li>
        <li>If you are unavailable, our rider will attempt to reach you by phone. After 2 failed attempts, the order will be returned and a re-delivery fee may apply</li>
      </ul>

      <h2>6. Cold-Chain Products</h2>
      <p>
        Products requiring cold storage (e.g., insulin, certain vaccines, probiotics) are transported in insulated packaging with cold packs to maintain the required temperature range. These items are prioritized for same-day delivery.
      </p>

      <h2>7. Prescription Delivery</h2>
      <p>
        Prescription orders undergo pharmacist review before dispatch. This may add 15-30 minutes to the delivery estimate. Once reviewed and dispensed, the order follows normal delivery timelines.
      </p>

      <h2>8. Contact</h2>
      <p>
        For delivery inquiries, contact us at <strong>ourmallpharmacy@gmail.com</strong> or call <strong>+254 722 390 003</strong>.
      </p>
    </LegalPage>
  );
}
