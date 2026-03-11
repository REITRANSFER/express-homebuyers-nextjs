'use client';

import { COMPANY_NAME, SERVICE_AREAS, STATE, PHONE } from '@/lib/config';

export function FooterLinks() {
  const showPhone = PHONE && PHONE !== '[Phone Number]';
  const cleanPhone = showPhone ? PHONE.replace(/\D/g, '') : '';
  const serviceDescription = SERVICE_AREAS.length > 0
    ? `Serving ${SERVICE_AREAS.join(', ')}`
    : STATE && STATE !== '[State]'
      ? `Serving ${STATE}`
      : null;

  return (
    <footer className="border-t border-gray-100 bg-white py-8">
      <div className="mx-auto max-w-3xl px-4 text-center">
        {/* Phone CTA */}
        {showPhone && (
          <div className="mb-4">
            <a
              href={`tel:${cleanPhone}`}
              className="text-sm font-semibold"
              style={{ color: 'var(--accent)' }}
            >
              {PHONE}
            </a>
          </div>
        )}

        {/* Service area */}
        {serviceDescription && (
          <p className="mb-3 text-xs text-gray-400">{serviceDescription}</p>
        )}

        {/* Links */}
        <div className="mb-4 flex justify-center gap-6 text-xs text-gray-400">
          <a href="/privacy" className="transition-colors hover:text-gray-600">Privacy Policy</a>
          <a href="/terms" className="transition-colors hover:text-gray-600">Terms of Service</a>
        </div>

        {/* Copyright + disclaimer */}
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </p>
        <p className="mx-auto mt-2 max-w-xl text-xs text-gray-300">
          This website does not constitute an offer to purchase real estate. Individual results vary.
        </p>
      </div>
    </footer>
  );
}
