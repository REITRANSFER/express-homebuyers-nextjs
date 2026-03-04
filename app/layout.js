import './globals.css';
import FacebookPixel from '@/components/FacebookPixel/FacebookPixel';

export const metadata = {
  title: 'Express Homebuyers',
  description: 'Get a real cash offer for your DMV home within 24 hours. No fees, no commissions, no repairs required.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FacebookPixel />
        {children}
      </body>
    </html>
  );
}
