'use client';

import { useState } from 'react';
import { SurveyProvider, useSurvey } from '@/context/SurveyContext';
import { pageConfigs } from '@/lib/surveyConfig';
import SurveyModal from '@/components/SurveyModal/SurveyModal';
import StickyBar from '@/components/StickyBar/StickyBar';
import VidalyticsVideo from '@/components/VidalyticsVideo/VidalyticsVideo';
import AddressInput from '@/components/AddressInput/AddressInput';
import { FooterLinks } from '@/components/polar/footer-links';
import { VIDALYTICS_EMBED_ID, VIDALYTICS_ACCOUNT_ID } from '@/lib/config';

function PageContent() {
  const { openSurvey } = useSurvey();
  const [address, setAddress] = useState('');

  function handleAddressSelect(addr) {
    setAddress(addr);
    setTimeout(() => openSurvey(addr), 200);
  }

  return (
    <main style={{ background: '#f8fafc' }}>
      <StickyBar triggerElementId="hero-form" />

      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 0',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
        }}>
          {/* Video (optional) */}
          {VIDALYTICS_EMBED_ID && (
            <div style={{ maxWidth: '720px', margin: '0 auto 40px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              <VidalyticsVideo embedId={VIDALYTICS_EMBED_ID} accountId={VIDALYTICS_ACCOUNT_ID} />
            </div>
          )}

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#0f172a',
            textAlign: 'center',
            marginBottom: '16px',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}>
            Sell Your House Fast&nbsp;For Cash
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: 'clamp(17px, 2.5vw, 22px)',
            color: '#475569',
            textAlign: 'center',
            marginBottom: '28px',
            lineHeight: 1.6,
            maxWidth: '640px',
            margin: '0 auto 28px',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}>
            Get a fair cash offer in 24 hours. No fees, no repairs, no hassle.
          </p>

          {/* Benefits row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px 28px',
            marginBottom: '36px',
          }}>
            {['No Fees or Commissions', 'No Repairs Needed', 'Close In As Little As 7 Days'].map(label => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: '15px', fontWeight: 600, color: '#334155' }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="var(--accent)" fillOpacity="0.15" />
                  <path d="M6 10l3 3 5-5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {label}
              </div>
            ))}
          </div>

          {/* Lead form card */}
          <div id="hero-form" style={{
            maxWidth: '560px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          }}>
            <p style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontSize: '16px',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '12px',
            }}>
              Enter your property address to get started:
            </p>
            <AddressInput
              id="mainAddress"
              placeholder="123 Main St, City, State"
              value={address}
              onChange={setAddress}
              onAddressSelect={handleAddressSelect}
            />
            <button
              onClick={() => address.trim() ? openSurvey(address) : openSurvey()}
              style={{
                marginTop: '12px',
                width: '100%',
                padding: '18px',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                transition: 'opacity 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}
            >
              Get My Cash Offer &rarr;
            </button>
            <p style={{
              marginTop: '10px',
              fontSize: '12px',
              color: '#94a3b8',
              textAlign: 'center',
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}>
              No obligation &bull; No fees &bull; Response within 24 hours
            </p>
          </div>
        </div>
      </section>

      <div style={{ paddingBottom: '32px' }}>
        <FooterLinks />
      </div>

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
