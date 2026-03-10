'use client';

import { PHONE } from '@/lib/config';

export default function SuccessStep() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>&#9989;</div>
      <h3 style={{ fontSize: '24px', color: '#1a1a1a', marginBottom: '15px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>You&apos;re all set!</h3>
      <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.6, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        We&apos;ll call you within 24 hours with a real offer. No obligation, no pressure.<br /><br />
        Questions? Call us directly: <strong>{PHONE}</strong>
      </p>
    </div>
  );
}
