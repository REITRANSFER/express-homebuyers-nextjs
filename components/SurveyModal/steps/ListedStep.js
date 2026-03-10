'use client';

import { useSurvey } from '@/context/SurveyContext';

const buttonStyle = { padding: '20px 24px', border: '2px solid #e9ecef', borderRadius: '12px', background: 'white', fontSize: '16px', fontWeight: 500, color: '#1a1a1a', cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
const backStyle = { background: 'none', border: 'none', color: 'var(--accent)', fontSize: '14px', cursor: 'pointer', marginBottom: '20px', fontWeight: 600, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };

export default function ListedStep() {
  const { selectOption, disqualify, goBack } = useSurvey();

  return (
    <>
      <button style={backStyle} onClick={goBack}>&#8592; Back</button>
      <h2>Is the property currently listed for sale?</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        Includes MLS listings, agent listings, and FSBO listings on Zillow or Realtor.com.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button style={buttonStyle} onClick={() => selectOption('listed', 'No - not listed')}>&#10003; No - not currently listed anywhere</button>
        <button style={buttonStyle} onClick={() => disqualify('listed', 'Listed with agent')}>&#10007; Yes - listed with an agent</button>
        <button style={buttonStyle} onClick={() => disqualify('listed', 'Listed FSBO')}>&#10007; Yes - listed for sale by owner (FSBO)</button>
      </div>
    </>
  );
}
