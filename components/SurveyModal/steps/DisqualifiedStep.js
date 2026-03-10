'use client';

import { PHONE } from '@/lib/config';

export default function DisqualifiedStep() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>&#128222;</div>
      <h3 style={{ fontSize: '24px', color: '#1a1a1a', marginBottom: '15px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>We may still be able to help.</h3>
      <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.6, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        Our team specializes in unique situations. Call us directly and we&apos;ll tell you honestly what your options are.<br /><br />
        <strong>{PHONE}</strong>
      </p>
    </div>
  );
}
