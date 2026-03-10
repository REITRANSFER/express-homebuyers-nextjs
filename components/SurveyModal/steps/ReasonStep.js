'use client';

import { useSurvey } from '@/context/SurveyContext';

const buttonStyle = { padding: '20px 24px', border: '2px solid #e9ecef', borderRadius: '12px', background: 'white', fontSize: '16px', fontWeight: 500, color: '#1a1a1a', cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
const backStyle = { background: 'none', border: 'none', color: 'var(--accent)', fontSize: '14px', cursor: 'pointer', marginBottom: '20px', fontWeight: 600, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };

export default function ReasonStep() {
  const { selectOption, goBack, reasonOptions } = useSurvey();

  return (
    <>
      <button style={backStyle} onClick={goBack}>&#8592; Back</button>
      <h2>What&apos;s your primary reason for selling?</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {reasonOptions.map((opt) => (
          <button key={opt.value} style={buttonStyle} onClick={() => selectOption('reason', opt.value)}>
            {opt.emoji} {opt.label}
          </button>
        ))}
      </div>
    </>
  );
}
