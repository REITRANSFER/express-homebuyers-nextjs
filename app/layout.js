import './globals.css';
import FacebookPixel from '@/components/FacebookPixel/FacebookPixel';
import { COMPANY_NAME, ACCENT_COLOR, LOGO_URL } from '@/lib/config';

export const metadata = {
  title: COMPANY_NAME,
  description: `Get a fair cash offer from ${COMPANY_NAME} within 24 hours. No fees, no commissions, no repairs required.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`:root { --accent: ${ACCENT_COLOR}; }`}</style>
      </head>
      <body>
        <FacebookPixel />
        {/* Site header with logo or company name */}
        <header className="flex items-center justify-center px-6 py-4 bg-white shadow-sm">
          {LOGO_URL ? (
            <img src={LOGO_URL} alt={COMPANY_NAME} className="h-10 w-auto" />
          ) : (
            <span className="text-lg font-bold text-gray-900">{COMPANY_NAME}</span>
          )}
        </header>
        {children}
      </body>
    </html>
  );
}
