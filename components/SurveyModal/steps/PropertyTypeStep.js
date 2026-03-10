'use client';

import { useSurvey } from '@/context/SurveyContext';

const buttonStyle = { padding: '20px 24px', border: '2px solid #e9ecef', borderRadius: '12px', background: 'white', fontSize: '16px', fontWeight: 500, color: '#1a1a1a', cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
const backStyle = { background: 'none', border: 'none', color: 'var(--accent)', fontSize: '14px', cursor: 'pointer', marginBottom: '20px', fontWeight: 600, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };

export default function PropertyTypeStep() {
  const { selectOption, disqualify, goBack } = useSurvey();

  return (
    <>
      <button style={backStyle} onClick={goBack}>&#8592; Back</button>
      <h2>What type of property is it?</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button style={buttonStyle} onClick={() => selectOption('propertyType', 'Single Family')}>&#127968; Single Family Home</button>
        <button style={buttonStyle} onClick={() => selectOption('propertyType', 'Multi-Family')}>&#127960; Multi-Family (2-4 units)</button>
        <button style={buttonStyle} onClick={() => selectOption('propertyType', 'Condo/Townhouse')}>&#127970; Condo or Townhouse</button>
        <button style={buttonStyle} onClick={() => disqualify('propertyType', 'Land/Commercial/Mobile')}>&#128683; Land, Commercial, or Mobile Home</button>
      </div>
    </>
  );
}
