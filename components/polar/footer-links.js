'use client';

export function FooterLinks() {
  return (
    <footer className="mx-auto max-w-7xl px-4 text-center">
      <div className="border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Express Homebuyers. All rights reserved.
        </p>
        <p className="mt-2 text-xs text-gray-400">
          Serving DC, Maryland &amp; Virginia since 2003 &nbsp;&#8226;&nbsp; 4,000+ homes purchased &nbsp;&#8226;&nbsp; A+ BBB rated
        </p>
        <div className="mt-4 flex justify-center gap-6 text-xs text-gray-400">
          <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Contact Us</a>
        </div>
        <p className="mt-4 text-xs text-gray-400 max-w-2xl mx-auto">
          Express Homebuyers operates in Maryland, DC, and Virginia. Licensed and insured. This website does not constitute an offer to purchase real estate. Individual results vary.
        </p>
      </div>
    </footer>
  );
}
