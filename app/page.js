import SurveyPageClient from '@/components/survey/survey-page-client';
import { FooterLinks } from '@/components/polar/footer-links';

/* ── page (server component — static content SSR'd, no JS needed) ── */
export default function SurveyPage() {
  const trustItems = [
    { icon: '✅', label: 'No Fees or Commissions' },
    { icon: '✅', label: 'Local Cash Buyers Based in DMV' },
    { icon: '✅', label: 'Cash Offer in 24 Hours' },
  ];

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* ── Hero Section ── */}
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-16 pt-8 sm:px-6 lg:px-8">

        {/* Headline + subtitle (server-rendered, no JS hydration needed) */}
        <div className="mb-6 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Need to Sell Your House Fast? Get a Fair Cash Offer in 24 Hours.{' '}
            <span style={{ color: 'var(--accent)' }}>No Fees. No Repairs. Close in as Few as 14 Days.</span>
          </h1>

          <p className="mx-auto mb-4 max-w-xl text-base text-gray-600 sm:text-lg">
            We handle the paperwork, the timeline, and the stress. You pick the closing date and walk away with a check.
          </p>

          {/* Trust indicator pills */}
          <div className="mx-auto mb-6 flex max-w-lg flex-wrap items-center justify-center gap-3 sm:gap-4">
            {trustItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 sm:text-sm"
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive survey parts (client component) */}
        <SurveyPageClient />
      </div>

      {/* Footer */}
      <FooterLinks />
    </main>
  );
}
