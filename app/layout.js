import './globals.css';
import FacebookPixel from '@/components/FacebookPixel/FacebookPixel';
import { COMPANY_NAME, ACCENT_COLOR, LOGO_URL, PHONE } from '@/lib/config';

export const metadata = {
  title: COMPANY_NAME,
  description: `Get a fair cash offer from ${COMPANY_NAME} within 24 hours. No fees, no commissions, no repairs required.`,
};

export default function RootLayout({ children }) {
  const showPhone = PHONE && PHONE !== '[Phone Number]';
  const cleanPhone = showPhone ? PHONE.replace(/\D/g, '') : '';

  return (
    <html lang="en">
      <head>
        <style>{`:root { --accent: ${ACCENT_COLOR}; }`}</style>
      </head>
      <body className="antialiased">
        <FacebookPixel />

        {/* Header — white bg, centered phone (matches DMV landing layout) */}
        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="flex items-center justify-center gap-3">
              {LOGO_URL ? (
                <img src={LOGO_URL} alt={COMPANY_NAME} className="h-8 w-auto" />
              ) : null}
              {showPhone && (
                <a
                  href={`tel:${cleanPhone}`}
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: 'var(--accent)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {PHONE}
                </a>
              )}
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
