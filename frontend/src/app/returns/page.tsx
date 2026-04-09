import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description: "OMP Return & Refund Policy — learn how to return products and request refunds.",
};

export default function ReturnsPage() {
  return (
    <LegalPage title="Return & Refund Policy" lastUpdated="April 1, 2026">
      <h2>1. Overview</h2>
      <p>
        At OMP, your satisfaction is important to us. This policy outlines the conditions under which you may return products and request refunds.
      </p>

      <h2>2. Eligible Returns</h2>
      <p>You may return a product if:</p>
      <ul>
        <li>The product is <strong>unused, sealed, and in its original packaging</strong></li>
        <li>The return request is made <strong>within 7 days</strong> of delivery</li>
        <li>The product was <strong>damaged during delivery</strong> (report within 24 hours)</li>
        <li>You received the <strong>wrong product</strong></li>
        <li>The product is <strong>expired or defective</strong></li>
      </ul>

      <h2>3. Non-Returnable Items</h2>
      <p>The following items cannot be returned due to health and safety regulations:</p>
      <ul>
        <li><strong>Dispensed prescription medicines</strong> — once a prescription has been dispensed, it cannot be returned per the Pharmacy and Poisons Act (Cap 244)</li>
        <li><strong>Opened or used products</strong> — including supplements, skincare, and personal care items</li>
        <li><strong>Cold-chain products</strong> — items requiring refrigeration (e.g., insulin, certain vaccines)</li>
        <li><strong>Intimate/personal items</strong> — for hygiene reasons</li>
      </ul>

      <h2>4. How to Request a Return</h2>
      <ol>
        <li>Contact our support team via <strong>WhatsApp</strong>, <strong>email (support@omp.co.ke)</strong>, or <strong>phone (+254 700 000 000)</strong></li>
        <li>Provide your <strong>order number</strong> and reason for return</li>
        <li>Include <strong>photos</strong> of the product (required for damaged/wrong items)</li>
        <li>Our team will review your request within <strong>24 hours</strong></li>
        <li>If approved, we will arrange a <strong>free pickup</strong> from your delivery address</li>
      </ol>

      <h2>5. Refund Process</h2>
      <ul>
        <li><strong>M-Pesa payments:</strong> Refunded to the same M-Pesa number within 3-5 business days</li>
        <li><strong>Card payments:</strong> Refunded to the original card within 7-10 business days</li>
        <li><strong>Cash on delivery:</strong> Refunded via M-Pesa to your registered phone number</li>
        <li>Shipping costs are refunded only if the return is due to our error (wrong/damaged product)</li>
      </ul>

      <h2>6. Exchanges</h2>
      <p>
        We offer direct exchanges for wrong items or size/variant issues. The exchange product will be delivered at no additional cost. If the replacement product costs more, you will be charged the difference; if it costs less, the difference will be refunded.
      </p>

      <h2>7. Damaged Products</h2>
      <p>
        If your order arrives damaged, please <strong>do not accept the delivery</strong> or report the damage within 24 hours with photographic evidence. We will arrange an immediate replacement or full refund at no cost to you.
      </p>

      <h2>8. Contact</h2>
      <p>
        For return and refund inquiries, reach out via:
      </p>
      <ul>
        <li>WhatsApp: <strong>+254 700 000 000</strong></li>
        <li>Email: <strong>returns@omp.co.ke</strong></li>
        <li>Or visit our <Link href="/contact" className="text-omp-blue hover:underline">Contact Page</Link></li>
      </ul>
    </LegalPage>
  );
}
