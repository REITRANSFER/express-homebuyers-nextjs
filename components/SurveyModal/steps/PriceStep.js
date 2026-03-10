'use client';

import { useSurvey } from '@/context/SurveyContext';
import { formatPrice } from '@/lib/validation';

const backStyle = { background: 'none', border: 'none', color: 'var(--accent)', fontSize: '14px', cursor: 'pointer', marginBottom: '20px', fontWeight: 600, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
const inputStyle = { width: '100%', padding: '16px 20px 16px 40px', fontSize: '16px', border: '2px solid #e9ecef', borderRadius: '12px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
const btnStyle = { width: '100%', padding: '18px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };

export default function PriceStep() {
  const { formData, setField, continueToNext, goBack } = useSurvey();

  function handleContinue() {
    if (!formData.askingPrice?.trim()) {
      alert('Please enter an asking price or estimated value.');
      return;
    }
    continueToNext();
  }

  return (
    <>
      <button style={backStyle} onClick={goBack}>&#8592; Back</button>
      <h2>What&apos;s your asking price or estimated value?</h2>
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', fontWeight: 700, color: 'var(--accent)', pointerEvents: 'none' }}>$</span>
        <input
          type="text"
          style={inputStyle}
          placeholder="300,000"
          value={formData.askingPrice || ''}
          onChange={(e) => setField('askingPrice', formatPrice(e.target.value))}
          inputMode="numeric"
        />
      </div>
      <button style={btnStyle} onClick={handleContinue}>Continue &#8594;</button>
    </>
  );
}
