'use client';

import { SurveyProvider } from '@/context/SurveyContext';
import { pageConfigs } from '@/lib/surveyConfig';
import { SurveyCard } from '@/components/survey/survey-card';
import { VSLSection } from '@/components/survey/vsl-section';
import StickyBar from '@/components/StickyBar/StickyBar';
import SurveyModal from '@/components/SurveyModal/SurveyModal';
import { FooterLinks } from '@/components/polar/footer-links';
import {
  COMPANY_NAME,
  PHONE,
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

/* ── page ────────────────────────────────────────────── */
function PageContent() {
  const stats = parseTrustStats(TRUST_STATS);
  const showPhone = PHONE && PHONE !== '[Phone Number]';

  return (
    <main style={{ background: '#f8fafc' }}>
      {/* ── Phone bar ─────────────────────────────── */}
      {showPhone && (
        <div style={{
          background: '#111827',
          padding: '10px 16px',
          textAlign: 'center',
        }}>
          <a
            href={`tel:${PHONE.replace(/\D/g, '')}`}
            style={{
              color: 'white',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {PHONE}
          </a>
        </div>
      )}

      {/* ── Sticky bar (on scroll) ────────────────── */}
      <StickyBar triggerElementId="survey-card" />

      {/* ── Hero ──────────────────────────────────── */}
      <section style={{
        padding: '48px 0 64px',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 24px',
        }}>
          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#0f172a',
            marginBottom: '20px',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}>
            Sell Your House Fast For Cash
          </h1>

          {/* Subheadline with accent */}
          <p style={{
            fontSize: 'clamp(18px, 3vw, 26px)',
            fontWeight: 700,
            color: '#0f172a',
            lineHeight: 1.35,
            marginBottom: '16px',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}>
            No Fees. No Repairs.{' '}
            <span style={{ color: 'var(--accent)' }}>Cash in 14 Days.</span>
          </p>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#475569',
            maxWidth: '640px',
            margin: '0 auto 28px',
            lineHeight: 1.6,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}>
            We handle the paperwork, the timeline, and the stress. You pick the closing date and walk away with a check.
          </p>

          {/* Trust stats / benefits row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px 28px',
            marginBottom: '40px',
          }}>
            {(stats || ['No Fees or Commissions', 'No Repairs Needed', 'Cash Offer in 24 Hours']).map((label, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#334155',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
          <div id="survey-card" style={{
            maxWidth: '640px',
            margin: '0 auto',
          }}>
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

      {/* Keep modal as fallback for StickyBar address entry */}
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
