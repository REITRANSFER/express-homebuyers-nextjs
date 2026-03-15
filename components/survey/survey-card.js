'use client';

import { useState } from 'react';
import { useSurvey } from '@/context/SurveyContext';
import AddressInput from '@/components/AddressInput/AddressInput';

/**
 * SurveyCard — simple entry card that opens the SurveyModal.
 * Matches Express Homebuyers DMV design: gradient bg, address input, CTA button.
 * This is NOT a multi-step inline form — the full survey lives in SurveyModal.
 */
export function SurveyCard() {
  const { openSurvey } = useSurvey();
  const [address, setAddress] = useState('');

  function handleAddressSelect(addr) {
    setAddress(addr);
    setTimeout(() => openSurvey(addr), 200);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (address.trim()) {
      openSurvey(address);
    }
  }

  return (
    <div
      className="rounded-xl p-6 text-center text-white shadow-xl md:p-8"
      style={{
        background: `linear-gradient(to bottom right, var(--accent), color-mix(in srgb, var(--accent) 80%, black))`,
      }}
    >
      <h3 className="mb-2 text-xl font-bold md:text-2xl">
        See What Your Home Is Actually Worth
      </h3>
      <p className="mb-4 text-sm text-white/80 md:text-base">
        60 seconds. Written cash offer within 24 hours. The number won&apos;t change after we see your house.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <AddressInput
          id="surveyAddress"
          placeholder="Enter your property address..."
          value={address}
          onChange={setAddress}
          onAddressSelect={handleAddressSelect}
          inputClassName="w-full rounded-lg border-0 px-4 py-3.5 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-white/50 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-white px-6 py-3.5 text-base font-bold shadow-md transition hover:shadow-lg active:scale-[0.98]"
          style={{ color: 'var(--accent)' }}
        >
          See What My Home Is Worth &rarr;
        </button>
      </form>

      <p className="mt-4 text-xs text-white/60">
        100% free &middot; No obligation &middot; No phone call to start &middot; 4,000+ offers made since 2003
      </p>
    </div>
  );
}
