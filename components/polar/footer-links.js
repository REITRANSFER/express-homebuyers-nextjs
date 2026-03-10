'use client';

import { COMPANY_NAME, SERVICE_AREAS, STATE } from '@/lib/config';

export function FooterLinks() {
  const serviceDescription = SERVICE_AREAS.length > 0
    ? `Serving ${SERVICE_AREAS.join(', ')}`
    : `Serving ${STATE}`;

  return (
    <footer className="mx-auto max-w-7xl px-4 text-center">
      <div className="border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </p>
        <p className="mt-2 text-xs text-gray-400">
          {serviceDescription}
        </p>
        <div className="mt-4 flex justify-center gap-6 text-xs text-gray-400">
          <a href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</a>
        </div>
        <p className="mt-4 text-xs text-gray-400 max-w-2xl mx-auto">
          {COMPANY_NAME} is a licensed and insured real estate investment company. This website does not constitute an offer to purchase real estate. Individual results vary.
        </p>
      </div>
    </footer>
  );
}
