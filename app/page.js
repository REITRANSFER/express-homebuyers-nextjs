'use client';

import { SurveyProvider } from '@/context/SurveyContext';
import { pageConfigs } from '@/lib/surveyConfig';
import { SurveyCard } from '@/components/survey/survey-card';
import StickyBar from '@/components/StickyBar/StickyBar';
import SurveyModal from '@/components/SurveyModal/SurveyModal';
import { FooterLinks } from '@/components/polar/footer-links';

/* ── page ────────────────────────────────────────────── */
function PageContent() {
  const trustItems = [
    { icon: '✅', label: 'No Fees or Commissions' },
    { icon: '✅', label: 'Local Cash Buyers Based in DMV' },
    { icon: '✅', label: 'Cash Offer in 24 Hours' },
  ];

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Sticky bar (appears on scroll past survey card) */}
      <StickyBar triggerElementId="survey-card" />

      {/* ── Hero Section ── */}
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-16 pt-8 sm:px-6 lg:px-8">

        {/* Headline + subtitle */}
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

        {/* Survey Entry Card */}
        <div id="survey-card" className="w-full max-w-lg">
          <SurveyCard />
        </div>
      </div>

      {/* Footer */}
      <FooterLinks />

      {/* Modal (opened by SurveyCard or StickyBar) */}
      <SurveyModal />
    </main>
  );
}

export default function SurveyPage() {
  return (
    <SurveyProvider config={pageConfigs.home}>
      <PageContent />
    </SurveyProvider>
  );
}
