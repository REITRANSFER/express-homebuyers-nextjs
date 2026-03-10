import { COMPANY_NAME, STATE, EMAIL, PHONE } from '@/lib/config';

export const metadata = {
  title: `Privacy Policy — ${COMPANY_NAME}`,
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{COMPANY_NAME} Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 10, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
        <p className="text-gray-700 leading-relaxed">
          {COMPANY_NAME} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website
          or submit a property inquiry. This policy is governed by the laws of {STATE}.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
        <p className="text-gray-700 leading-relaxed mb-3">We collect information you provide directly to us, including:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Name, email address, and phone number</li>
          <li>Property address and details</li>
          <li>Information about your situation and motivation for selling</li>
          <li>Device information, IP address, and browser type (collected automatically)</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
        <p className="text-gray-700 leading-relaxed mb-3">We use the information we collect to:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Contact you about your property inquiry and provide a cash offer</li>
          <li>Communicate with you about our services</li>
          <li>Improve our website and customer experience</li>
          <li>Comply with legal obligations</li>
          <li>Send marketing communications (you may opt out at any time)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Information Sharing</h2>
        <p className="text-gray-700 leading-relaxed">
          We do not sell, rent, or trade your personal information to third parties. We may share your information with
          trusted service providers who assist us in operating our business, subject to confidentiality agreements.
          We may disclose information when required by law or to protect our legal rights.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies</h2>
        <p className="text-gray-700 leading-relaxed">
          Our website uses cookies and similar tracking technologies to enhance your experience and analyze website traffic.
          We may use Meta Pixel to track conversions from advertising campaigns. You can control cookie settings through
          your browser preferences. Disabling cookies may affect website functionality.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights &amp; Opt-Out</h2>
        <p className="text-gray-700 leading-relaxed">
          You have the right to access, correct, or delete your personal information. To opt out of marketing
          communications, reply &quot;STOP&quot; to any text message or click &quot;Unsubscribe&quot; in any email.
          To exercise your rights, contact us at the information below.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Security</h2>
        <p className="text-gray-700 leading-relaxed">
          We implement reasonable technical and organizational measures to protect your personal information.
          However, no method of transmission over the internet is 100% secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have questions about this Privacy Policy, please contact us:
        </p>
        <div className="mt-3 space-y-1 text-gray-700">
          <p><strong>{COMPANY_NAME}</strong></p>
          <p>Email: <a href={`mailto:${EMAIL}`} className="text-[var(--accent)] hover:underline">{EMAIL}</a></p>
          <p>Phone: <a href={`tel:${PHONE.replace(/\D/g, '')}`} className="text-[var(--accent)] hover:underline">{PHONE}</a></p>
        </div>
      </section>
    </main>
  );
}
