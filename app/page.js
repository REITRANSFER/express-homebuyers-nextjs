'use client';

import { SurveyProvider } from '@/context/SurveyContext';
import { pageConfigs } from '@/lib/surveyConfig';
import { SurveyCard } from '@/components/survey/survey-card';
import { VSLSection } from '@/components/survey/vsl-section';
import StickyBar from '@/components/StickyBar/StickyBar';
import SurveyModal from '@/components/SurveyModal/SurveyModal';
import { FooterLinks } from '@/components/polar/footer-links';
import { TRUST_STATS, VIDALYTICS_EMBED_ID } from '@/lib/config';

/* ── helpers ─────────────────────────────────────────── */
function parseTrustStats(raw) {
  if (!raw) return null;
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr) && arr.length) return arr;
  } catch { /* fall through */ }
  return raw.split('|').map(s => s.trim()).filter(Boolean);
}

/* ── page ────────────────────────────────────────────── */
function PageContent() {
  const stats = parseTrustStats(TRUST_STATS);
  const trustItems = stats || [
    { icon: '💰', label: 'No Fees' },
    { icon: '🔧', label: 'No Repairs' },
    { icon: '⚡', label: 'Close Fast' },
  ];

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Sticky bar (appears on scroll past survey card) */}
      <StickyBar triggerElementId="survey-card" />

      {/* ── Hero Section (matches DMV sell-your-house-fast layout) ── */}
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 pb-16 pt-8 sm:px-6 lg:px-8">

        {/* Headline + subtitle */}
        <div className="mb-6 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Sell Your House Fast For Cash
          </h1>

          <p className="mx-auto mb-4 max-w-xl text-base text-gray-600 sm:text-lg">
            No hidden fees. No repairs. No agents. We buy your house
            directly &mdash; any condition, any situation.
          </p>

          {/* Trust indicator pills */}
          <div className="mx-auto mb-6 flex max-w-lg flex-wrap items-center justify-center gap-3 sm:gap-4">
            {trustItems.map((item, i) => {
              const icon = typeof item === 'string' ? '✓' : item.icon;
              const label = typeof item === 'string' ? item : item.label;
              return (
                <div
                  key={i}
                  className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 sm:text-sm"
                >
                  <span className="text-base">{icon}</span>
                  {label}
                </div>
              );
            })}
          </div>
        </div>

        {/* VSL Video (only if Vidalytics is configured) */}
        {VIDALYTICS_EMBED_ID && (
          <div className="mb-8 w-full max-w-2xl">
            <VSLSection />
          </div>
        )}

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
