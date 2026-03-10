'use client';

import { useSurvey } from '@/context/SurveyContext';

const buttonStyle = { padding: '20px 24px', border: '2px solid #e9ecef', borderRadius: '12px', background: 'white', fontSize: '16px', fontWeight: 500, color: '#1a1a1a', cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
const backStyle = { background: 'none', border: 'none', color: 'var(--accent)', fontSize: '14px', cursor: 'pointer', marginBottom: '20px', fontWeight: 600, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };

export default function TimelineStep() {
  const { selectOption, goBack } = useSurvey();

  return (
    <>
      <button style={backStyle} onClick={goBack}>&#8592; Back</button>
      <h2>When do you need to close?</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button style={buttonStyle} onClick={() => selectOption('timeline', 'ASAP / within 7 days')}>&#9889; ASAP - within 7 days</button>
        <button style={buttonStyle} onClick={() => selectOption('timeline', 'Within 30 days')}>&#128197; Within 30 days</button>
        <button style={buttonStyle} onClick={() => selectOption('timeline', 'Within 60 days')}>&#128198; Within 60 days</button>
        <button style={buttonStyle} onClick={() => selectOption('timeline', '3-6 months')}>&#128467; 3-6 months</button>
        <button style={buttonStyle} onClick={() => selectOption('timeline', 'No rush')}>&#128336; No rush - just exploring</button>
      </div>
    </>
  );
}
