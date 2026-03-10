import { COMPANY_NAME, STATE, EMAIL } from '@/lib/config';

export const metadata = {
  title: `Terms of Service — ${COMPANY_NAME}`,
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{COMPANY_NAME} Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 10, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          By accessing our website or submitting a property inquiry, you agree to be bound by these Terms of Service
          and our Privacy Policy. If you do not agree to these terms, please do not use our services.
          These terms are governed by the laws of the State of {STATE}.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Services Description</h2>
        <p className="text-gray-700 leading-relaxed">
          {COMPANY_NAME} is a real estate investment company that makes cash offers to purchase residential properties.
          Submitting a property inquiry does not obligate either party to complete a transaction. Any offer made is
          subject to due diligence, property inspection, and final approval. This website does not constitute an offer
          to purchase real estate.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Representations</h2>
        <p className="text-gray-700 leading-relaxed mb-3">By submitting a property inquiry, you represent that:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>You are at least 18 years of age</li>
          <li>You have the legal authority to sell the property or are an authorized representative</li>
          <li>The information you provide is accurate and complete</li>
          <li>You are not currently under a listing agreement with a real estate agent for the submitted property</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. No Obligation</h2>
        <p className="text-gray-700 leading-relaxed">
          Submitting an inquiry creates no obligation for {COMPANY_NAME} to purchase your property, nor does it
          create any obligation for you to sell. We reserve the right to decline any inquiry at our sole discretion.
          Individual results vary. Past performance is not indicative of future results.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
        <p className="text-gray-700 leading-relaxed">
          All content on this website, including text, graphics, logos, and images, is the property of {COMPANY_NAME}
          and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or create
          derivative works without our prior written consent.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
        <p className="text-gray-700 leading-relaxed">
          To the maximum extent permitted by law, {COMPANY_NAME} shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages arising from your use of our website or services. Our total
          liability shall not exceed one hundred dollars ().
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Governing Law</h2>
        <p className="text-gray-700 leading-relaxed">
          These Terms of Service shall be governed by and construed in accordance with the laws of the State of {STATE},
          without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of {STATE}.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          We reserve the right to modify these Terms of Service at any time. Changes will be effective upon posting
          to our website. Your continued use of our services after any changes constitutes acceptance of the new terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
        <p className="text-gray-700 leading-relaxed">
          For questions about these Terms of Service, contact us at:{' '}
          <a href={`mailto:${EMAIL}`} className="text-[var(--accent)] hover:underline">{EMAIL}</a>
        </p>
      </section>
    </main>
  );
}
