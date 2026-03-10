'use client';

import { useSurvey } from '@/context/SurveyContext';

const cardStyle = { padding: '20px 16px', border: '2px solid #e9ecef', borderRadius: '12px', background: 'white', cursor: 'pointer', textAlign: 'center', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
const backStyle = { background: 'none', border: 'none', color: 'var(--accent)', fontSize: '14px', cursor: 'pointer', marginBottom: '20px', fontWeight: 600, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };

export default function ConditionStep() {
  const { selectOption, goBack } = useSurvey();

  return (
    <>
      <button style={backStyle} onClick={goBack}>&#8592; Back</button>
      <h2>What&apos;s the condition of the home?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <button style={cardStyle} onClick={() => selectOption('condition', 'Move-in ready')}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>&#127969;</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a' }}>Move-in Ready</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>No major repairs needed</div>
        </button>
        <button style={cardStyle} onClick={() => selectOption('condition', 'Minor repairs')}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>&#128295;</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a' }}>Minor Repairs</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Some updating needed</div>
        </button>
        <button style={cardStyle} onClick={() => selectOption('condition', 'Major repairs')}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>&#127962;</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a' }}>Major Repairs</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Significant work needed</div>
        </button>
        <button style={cardStyle} onClick={() => selectOption('condition', 'Severe damage')}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>&#9888;&#65039;</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a' }}>Severe Damage</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Fire, flood, or structural</div>
        </button>
      </div>
    </>
  );
}
