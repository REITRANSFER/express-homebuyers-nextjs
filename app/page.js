'use client';

import { SurveyProvider } from '@/context/SurveyContext';
import { pageConfigs } from '@/lib/surveyConfig';
import { SurveyCard } from '@/components/survey/survey-card';
import { VSLSection } from '@/components/survey/vsl-section';
import StickyBar from '@/components/StickyBar/StickyBar';
import SurveyModal from '@/components/SurveyModal/SurveyModal';
import { FooterLinks } from '@/components/polar/footer-links';
import {
  TRUST_STATS,
  VIDALYTICS_EMBED_ID,
} from '@/lib/config';

/* ── helpers ─────────────────────────────────────────── */
function parseTrustStats(raw) {
  if (!raw) return null;
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr) && arr.length) return arr;
  } catch { /* fall through */ }
  return raw.split('|').map(s => s.trim()).filter(Boolean);
}

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/* ── page ────────────────────────────────────────────── */
function PageContent() {
  const stats = parseTrustStats(TRUST_STATS);

  return (
    <main style={{ background: '#f1f5f9', minHeight: '100vh' }}>
      {/* Sticky bar (appears on scroll past survey card) */}
      <StickyBar triggerElementId="survey-card" />

      {/* ── Hero ──────────────────────────────────── */}
      <section style={{
        padding: '52px 0 72px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px' }}>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 800,
            lineHeight: 1.12,
            color: '#0f172a',
            marginBottom: '16px',
            fontFamily: font,
            letterSpacing: '-0.02em',
          }}>
            Sell Your House Fast For Cash
          </h1>

          {/* Subheadline with accent */}
          <p style={{
            fontSize: 'clamp(18px, 3vw, 24px)',
            fontWeight: 700,
            color: '#0f172a',
            lineHeight: 1.35,
            marginBottom: '16px',
            fontFamily: font,
          }}>
            No Fees. No Repairs.{' '}
            <span style={{ color: 'var(--accent)' }}>Cash in 14 Days.</span>
          </p>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: '#64748b',
            maxWidth: '560px',
            margin: '0 auto 32px',
            lineHeight: 1.65,
            fontFamily: font,
          }}>
            We handle the paperwork, the timeline, and the stress.
            You pick the closing date and walk away with a check.
          </p>

          {/* Trust stats / benefits row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px 24px',
            marginBottom: '40px',
          }}>
            {(stats || ['No Fees or Commissions', 'No Repairs Needed', 'Cash Offer in 24 Hours']).map((label, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#475569',
                fontFamily: font,
              }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="var(--accent)" fillOpacity="0.15" />
                  <path d="M6 10l3 3 5-5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {typeof label === 'string' ? label : (label.label || label.value || String(label))}
              </div>
            ))}
          </div>

          {/* ── Inline Survey Card ────────────────── */}
          <div id="survey-card" style={{ maxWidth: '560px', margin: '0 auto' }}>
            <SurveyCard />
          </div>

          {/* VSL section (only if configured) */}
          {VIDALYTICS_EMBED_ID && (
            <div style={{ maxWidth: '720px', margin: '48px auto 0' }}>
              <VSLSection />
            </div>
          )}
        </div>
      </section>

      <div style={{ paddingBottom: '32px' }}>
        <FooterLinks />
      </div>

      {/* Modal fallback for StickyBar */}
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
