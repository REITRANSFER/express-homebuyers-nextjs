'use client';

import { useEffect } from 'react';
import { OWNER_NAME, COMPANY_NAME, PHONE } from '@/lib/config';

export default function ThankYouPage() {
  useEffect(() => {
    try {
      if (window.fbq) window.fbq('track', 'Lead');
    } catch (e) { /* */ }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-xl w-full text-center">
        {/* Confirmation icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          You&apos;re All Set!
        </h1>

        {/* Main message */}
        <p className="text-lg text-gray-600 mb-6">
          {OWNER_NAME}&apos;s team at {COMPANY_NAME} has received your information and is reviewing your property now.
        </p>

        {/* What happens next */}
        <div className="rounded-xl bg-white border border-gray-200 p-6 text-left mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-4">What Happens Next:</h2>
          <ul className="space-y-3">
            {[
              "We'll review comparable sales in your area",
              "We'll prepare a real cash offer — no bait-and-switch",
              "You'll receive our offer within 24 hours via email and phone",
              "Our number won't change after inspection — we mean what we say",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="mt-0.5 flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs font-bold">{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Call CTA */}
        <p className="text-sm text-gray-500 mb-3">Questions? We&apos;re ready to talk.</p>
        <a
          href={`tel:${PHONE.replace(/\D/g, '')}`}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90"
        >
          Call Us Now: {PHONE}
        </a>
      </div>
    </div>
  );
}
