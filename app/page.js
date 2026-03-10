'use client';

import { SurveyProvider } from '@/context/SurveyContext';
import { pageConfigs } from '@/lib/surveyConfig';
import { SurveyCard } from '@/components/survey/survey-card';
import { VSLSection } from '@/components/survey/vsl-section';
import { FooterLinks } from '@/components/polar/footer-links';
import { Phone } from 'lucide-react';
import { PHONE, COMPANY_NAME } from '@/lib/config';

function PageContent() {
  return (
    <main className="relative min-h-screen bg-gray-50">
      {/* Content */}
      <div className="relative z-10">
        {/* Phone number at top */}
        <div className="flex items-center justify-center gap-2 bg-white py-4 shadow-sm">
          <Phone className="h-5 w-5 text-[var(--accent)]" />
          <a
            href={`tel:${PHONE.replace(/\D/g, '')}`}
            className="text-lg font-semibold text-gray-900 hover:text-[var(--accent)] transition-colors"
          >
            {PHONE}
          </a>
        </div>

        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
          {/* Centered Hero content */}
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl text-balance">
              Sell Your House Fast For Cash
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Get a fair cash offer in 24 hours. No fees, no repairs, no hassle. We buy houses in any condition.
            </p>

            {/* Trust indicators */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#22c55e]/10">
                  <svg className="h-5 w-5 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">No Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#22c55e]/10">
                  <svg className="h-5 w-5 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">No Repairs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#22c55e]/10">
                  <svg className="h-5 w-5 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Close Fast</span>
              </div>
            </div>
          </div>

          {/* VSL Video Section - Below hero */}
          <div className="mt-10 flex justify-center">
            <VSLSection />
          </div>

          {/* Survey Form - Below video */}
          <div className="mt-10 flex justify-center">
            <div className="w-full max-w-xl">
              <SurveyCard />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 py-8">
          <FooterLinks />
        </div>
      </div>
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
