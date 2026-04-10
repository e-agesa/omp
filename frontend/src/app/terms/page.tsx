import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Our Mall Pharmacy Terms of Service — the rules governing use of our platform and services.",
  keywords: [
    "terms of service pharmacy",
    "Our Mall Pharmacy terms",
    "online pharmacy terms Kenya",
    "pharmacy user agreement",
    "pharmacy legal terms Nairobi",
    "e-commerce pharmacy terms",
  ],
  openGraph: {
    title: "Terms of Service | Our Mall Pharmacy",
    description: "Our Mall Pharmacy Terms of Service — the rules governing use of our platform and services.",
    url: "https://ourmallpharmacy.com/terms/",
  },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="April 1, 2026">
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using the Online Mega Pharmacy (&quot;OMP&quot;) website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
      </p>

      <h2>2. Services</h2>
      <p>OMP provides the following services through our platform:</p>
      <ul>
        <li>Online sale and delivery of pharmaceutical products, health supplements, beauty products, and medical devices</li>
        <li>Prescription upload and processing by licensed pharmacists</li>
        <li>Pharmacist consultation services via phone and WhatsApp</li>
        <li>Health information and wellness articles</li>
        <li>Medication refill reminders</li>
      </ul>

      <h2>3. Eligibility</h2>
      <p>
        You must be at least 18 years old to create an account and purchase products from OMP. By using our services, you represent that you are of legal age and have the capacity to enter into a binding agreement.
      </p>

      <h2>4. Prescription Medicines</h2>
      <ul>
        <li>Prescription medicines will only be dispensed upon receipt and verification of a valid prescription from a registered medical practitioner</li>
        <li>OMP reserves the right to reject any prescription that appears altered, expired, or fraudulent</li>
        <li>Our pharmacists may contact your prescribing doctor for verification</li>
        <li>Prescription medicines are non-returnable once dispensed, in accordance with Kenyan pharmaceutical law</li>
      </ul>

      <h2>5. Pricing and Payment</h2>
      <ul>
        <li>All prices are listed in Kenyan Shillings (KES) and include applicable taxes unless stated otherwise</li>
        <li>We accept M-Pesa, Visa, Mastercard, and cash on delivery in select areas</li>
        <li>Prices may change without prior notice; the price at the time of order confirmation applies</li>
        <li>M-Pesa payments are processed through the Safaricom Daraja API and are subject to Safaricom&apos;s terms</li>
      </ul>

      <h2>6. Orders and Delivery</h2>
      <ul>
        <li>Order confirmation is subject to product availability and prescription verification</li>
        <li>Delivery times are estimates and may vary based on location, traffic, and order volume</li>
        <li>Free delivery applies to orders above KES 2,000 within Nairobi</li>
        <li>You must be available to receive your order; undeliverable orders may incur re-delivery charges</li>
        <li>Risk of loss passes to you upon delivery</li>
      </ul>

      <h2>7. User Accounts</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. OMP is not liable for losses arising from unauthorized account access.
      </p>

      <h2>8. Intellectual Property</h2>
      <p>
        All content on the OMP website, including text, graphics, logos, images, and software, is the property of Online Mega Pharmacy and is protected by Kenyan and international copyright laws. You may not reproduce, distribute, or create derivative works without our written consent.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        OMP shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by you for the specific order giving rise to the claim.
      </p>

      <h2>10. Disclaimer</h2>
      <p>
        Health information provided on our website is for educational purposes only and does not constitute medical advice. Always consult a qualified healthcare provider for medical decisions. OMP is not a substitute for professional medical consultation.
      </p>

      <h2>11. Governing Law</h2>
      <p>
        These Terms of Service are governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes shall be subject to the exclusive jurisdiction of the courts of Kenya.
      </p>

      <h2>12. Changes to Terms</h2>
      <p>
        We reserve the right to update these Terms of Service at any time. Continued use of our services after changes constitutes acceptance of the updated terms. Material changes will be communicated via email or website notification.
      </p>

      <h2>13. Contact</h2>
      <p>
        For questions about these Terms, contact us at <strong>legal@omp.co.ke</strong> or <strong>+254 700 000 000</strong>.
      </p>
    </LegalPage>
  );
}
