import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "OMP Privacy Policy — how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="April 1, 2026">
      <h2>1. Introduction</h2>
      <p>
        Online Mega Pharmacy (&quot;OMP&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
      </p>

      <h2>2. Information We Collect</h2>
      <h3>2.1 Personal Information</h3>
      <p>We may collect the following personal information when you use our services:</p>
      <ul>
        <li><strong>Identity Data:</strong> Full name, date of birth, gender</li>
        <li><strong>Contact Data:</strong> Email address, phone number, delivery address</li>
        <li><strong>Health Data:</strong> Prescription details, medication history</li>
        <li><strong>Financial Data:</strong> M-Pesa phone number, payment transaction records</li>
        <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
      </ul>

      <h3>2.2 Automatically Collected Information</h3>
      <p>
        When you access our website, we automatically collect certain information including your IP address, browser type, operating system, referring URLs, and browsing behavior through cookies and similar technologies.
      </p>

      <h2>3. How We Use Your Information</h2>
      <p>We use your personal information to:</p>
      <ul>
        <li>Process and fulfill your orders and prescriptions</li>
        <li>Verify prescriptions with healthcare providers</li>
        <li>Process payments through M-Pesa and other payment gateways</li>
        <li>Provide pharmacist consultation services</li>
        <li>Send order updates and delivery notifications</li>
        <li>Send refill reminders for recurring medications</li>
        <li>Improve our services, website, and user experience</li>
        <li>Comply with legal and regulatory obligations under Kenyan law</li>
      </ul>

      <h2>4. Data Protection</h2>
      <p>
        We implement industry-standard security measures to protect your personal information, including:
      </p>
      <ul>
        <li>SSL/TLS encryption for all data transmission</li>
        <li>Encrypted storage of prescription images and health data</li>
        <li>Secure M-Pesa integration through Safaricom Daraja API</li>
        <li>Role-based access control for staff handling sensitive data</li>
        <li>Regular security audits and vulnerability assessments</li>
      </ul>

      <h2>5. Prescription Data</h2>
      <p>
        Your prescription data is treated with the highest level of confidentiality in accordance with the Pharmacy and Poisons Act (Cap 244) of Kenya. Prescription images are stored in encrypted, access-controlled storage and are only accessible to licensed pharmacists involved in fulfilling your order.
      </p>

      <h2>6. Third-Party Sharing</h2>
      <p>We may share your information with:</p>
      <ul>
        <li><strong>Delivery Partners:</strong> Name and address for order fulfillment</li>
        <li><strong>Payment Processors:</strong> Safaricom (M-Pesa), Visa/Mastercard processors</li>
        <li><strong>Healthcare Partners:</strong> Only with your explicit consent for prescription processing</li>
        <li><strong>Regulatory Bodies:</strong> When required by law (PPB, Ministry of Health)</li>
      </ul>
      <p>We will never sell your personal information to third parties.</p>

      <h2>7. Your Rights</h2>
      <p>Under the Kenya Data Protection Act (2019), you have the right to:</p>
      <ul>
        <li>Access your personal data held by us</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your data (subject to legal retention requirements)</li>
        <li>Object to processing of your data for marketing purposes</li>
        <li>Data portability — receive your data in a structured format</li>
      </ul>

      <h2>8. Cookies</h2>
      <p>
        We use essential cookies to ensure our website functions properly, and analytics cookies to understand how visitors interact with our site. You can control cookie preferences through your browser settings.
      </p>

      <h2>9. Data Retention</h2>
      <p>
        We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy. Prescription records are retained for a minimum of 5 years as required by Kenyan pharmaceutical regulations.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        For any privacy-related inquiries, please contact our Data Protection Officer:
      </p>
      <ul>
        <li>Email: <strong>privacy@omp.co.ke</strong></li>
        <li>Phone: <strong>+254 700 000 000</strong></li>
        <li>Address: Nairobi, Kenya</li>
      </ul>
    </LegalPage>
  );
}
