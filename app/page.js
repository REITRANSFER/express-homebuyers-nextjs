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
    <main className="min-h-screen bg-gray-50">
      <StickyBar triggerElementId="hero-form" />

      <section className="mx-auto max-w-3xl px-4 py-10 text-center">
        <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl text-balance">
          Sell Your House Fast For Cash
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Get a fair cash offer in 24 hours. No fees, no repairs, no hassle. We buy houses in any condition.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-700">
          {['No Fees', 'No Repairs', 'Close Fast'].map(label => (
            <div key={label} className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {label}
            </div>
          ))}
        </div>

        {VIDALYTICS_EMBED_ID && (
          <div className="mt-8 overflow-hidden rounded-xl bg-black shadow-2xl">
            <VidalyticsVideo embedId={VIDALYTICS_EMBED_ID} accountId={VIDALYTICS_ACCOUNT_ID} />
          </div>
        )}

        <div id="hero-form" className="mt-8 rounded-xl bg-white p-6 shadow-md text-left">
          <p className="mb-3 font-semibold text-gray-800">What&apos;s the property address?</p>
          <AddressInput
            id="mainAddress"
            placeholder="123 Main St, City, State"
            value={address}
            onChange={setAddress}
            onAddressSelect={handleAddressSelect}
          />
          <button
            className="mt-4 w-full rounded-xl py-4 text-lg font-semibold text-white transition hover:opacity-90"
            style={{ background: 'var(--accent)' }}
            onClick={() => address.trim() ? openSurvey(address) : openSurvey()}
          >
            Get My Offer &rarr;
          </button>
          <p className="mt-3 text-xs text-gray-500 text-center">No obligation. No fees. Response within 24 hours.</p>
        </div>
      </section>

      <div className="py-8">
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
