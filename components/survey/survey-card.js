'use client';

import { useState } from 'react';
import { useSurvey } from '@/context/SurveyContext';
import AddressInput from '@/components/AddressInput/AddressInput';
import { formatPrice, formatPhone, validatePhone, validateEmail } from '@/lib/validation';
import { PHONE } from '@/lib/config';

const steps = ['address', 'propertyType', 'condition', 'price', 'timeline', 'reason', 'listed', 'contact'];

/* ── shared styles ────────────────────────────────── */
const card = {
  borderRadius: '16px',
  background: 'white',
  padding: '24px 28px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
};
const heading = {
  fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};
const subtext = { fontSize: '14px', color: '#64748b', marginBottom: '16px' };
const optionBtn = {
  width: '100%', textAlign: 'left', padding: '14px 16px', fontSize: '15px',
  fontWeight: 500, color: '#0f172a', background: 'white', border: '2px solid #e2e8f0',
  borderRadius: '10px', cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};
const primaryBtn = {
  width: '100%', padding: '14px', background: 'var(--accent)', color: 'white',
  border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 600,
  cursor: 'pointer', transition: 'opacity 0.2s',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};
const backLink = {
  background: 'none', border: 'none', fontSize: '14px', fontWeight: 600,
  color: 'var(--accent)', cursor: 'pointer', marginBottom: '12px', padding: 0,
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};
const inputStyle = {
  width: '100%', padding: '12px 16px', fontSize: '15px', border: '2px solid #e2e8f0',
  borderRadius: '10px', outline: 'none', transition: 'border-color 0.15s',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

export function SurveyCard() {
  const { formData, setField, submitSurvey, status, reasonOptions } = useSurvey();
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const currentStep = steps[step];
  const progressPct = ((step + 1) / steps.length) * 100;

  function next() { setStep(prev => Math.min(prev + 1, steps.length - 1)); }
  function back() { setStep(prev => Math.max(prev - 1, 0)); }

  function handleAddressSelect(addr) {
    setField('address', addr);
    setTimeout(() => next(), 200);
  }

  function handleSelect(key, value) {
    setField(key, value);
    next();
  }

  function handleDisqualify(key, value) {
    setField(key, value);
    setStep(99);
  }

  async function handleSubmit() {
    if (!firstName.trim() || !phone.trim()) { alert('Please enter your name and phone number.'); return; }
    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.valid) { alert(phoneCheck.msg); return; }
    if (honeypot) return;
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) { alert(emailCheck.msg); return; }
    await submitSurvey({ firstName, lastName, email, phone });
  }

  /* Hover helpers */
  function onOptEnter(e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = '#f8fafc'; }
  function onOptLeave(e) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'white'; }
  function onDqEnter(e) { e.currentTarget.style.borderColor = '#fca5a5'; e.currentTarget.style.background = '#fef2f2'; }
  function onDqLeave(e) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'white'; }

  // ── Disqualified ──
  if (step === 99) {
    return (
      <div style={{ ...card, textAlign: 'center' }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>📞</div>
        <h3 style={{ ...heading, fontSize: '22px', marginBottom: '12px' }}>We may still be able to help.</h3>
        <p style={{ ...subtext, marginBottom: '16px' }}>Our team specializes in unique situations. Call us directly and we&apos;ll tell you honestly what your options are.</p>
        {PHONE && PHONE !== '[Phone Number]' && (
          <p style={{ fontSize: '20px', fontWeight: 700 }}>
            <a href={`tel:${PHONE.replace(/\D/g, '')}`} style={{ color: '#0f172a', textDecoration: 'none' }}>{PHONE}</a>
          </p>
        )}
      </div>
    );
  }

  return (
    <div style={card}>
      {/* ── Progress ── */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>
          <span style={{ fontWeight: 600 }}>Step {step + 1} of {steps.length}</span>
          <span>{Math.round(progressPct)}%</span>
        </div>
        <div style={{ height: '6px', borderRadius: '3px', background: '#e2e8f0' }}>
          <div style={{ height: '100%', borderRadius: '3px', background: 'var(--accent)', transition: 'width 0.3s', width: `${progressPct}%` }} />
        </div>
      </div>

      {/* ── Address ── */}
      {currentStep === 'address' && (
        <div>
          <h2 style={heading}>What&apos;s your property address?</h2>
          <p style={subtext}>Start typing and select your address from the dropdown.</p>
          <AddressInput
            id="surveyAddress"
            placeholder="Start typing your address..."
            value={formData.address || ''}
            onChange={(v) => setField('address', v)}
            onAddressSelect={handleAddressSelect}
            inputClassName=""
            style={inputStyle}
          />
          <button
            onClick={() => { if (formData.address?.trim()) next(); else alert('Please enter your property address.'); }}
            style={{ ...primaryBtn, marginTop: '14px' }}
            onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}
          >
            Continue &rarr;
          </button>
        </div>
      )}

      {/* ── Property Type ── */}
      {currentStep === 'propertyType' && (
        <div>
          <button onClick={back} style={backLink}>&larr; Back</button>
          <h2 style={heading}>What type of property is it?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { emoji: '🏠', label: 'Single Family Home', value: 'Single Family' },
              { emoji: '🏘', label: 'Multi-Family (2-4 units)', value: 'Multi-Family' },
              { emoji: '🏢', label: 'Condo or Townhouse', value: 'Condo/Townhouse' },
            ].map(opt => (
              <button key={opt.value} onClick={() => handleSelect('propertyType', opt.value)}
                style={optionBtn} onMouseEnter={onOptEnter} onMouseLeave={onOptLeave}>
                {opt.emoji} {opt.label}
              </button>
            ))}
            <button onClick={() => handleDisqualify('propertyType', 'Land/Commercial/Mobile')}
              style={optionBtn} onMouseEnter={onDqEnter} onMouseLeave={onDqLeave}>
              🚫 Land, Commercial, or Mobile Home
            </button>
          </div>
        </div>
      )}

      {/* ── Condition ── */}
      {currentStep === 'condition' && (
        <div>
          <button onClick={back} style={backLink}>&larr; Back</button>
          <h2 style={heading}>What&apos;s the condition of the home?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { emoji: '🏡', label: 'Move-in Ready', sub: 'No major repairs needed', value: 'Move-in ready' },
              { emoji: '🔧', label: 'Minor Repairs', sub: 'Some updating needed', value: 'Minor repairs' },
              { emoji: '🏚', label: 'Major Repairs', sub: 'Significant work needed', value: 'Major repairs' },
              { emoji: '⚠️', label: 'Severe Damage', sub: 'Fire, flood, or structural', value: 'Severe damage' },
            ].map(opt => (
              <button key={opt.value} onClick={() => handleSelect('condition', opt.value)}
                style={{ ...optionBtn, textAlign: 'center', padding: '16px 12px' }}
                onMouseEnter={onOptEnter} onMouseLeave={onOptLeave}>
                <div style={{ fontSize: '28px', marginBottom: '4px' }}>{opt.emoji}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{opt.label}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{opt.sub}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Price ── */}
      {currentStep === 'price' && (
        <div>
          <button onClick={back} style={backLink}>&larr; Back</button>
          <h2 style={heading}>What&apos;s your asking price or estimated value?</h2>
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', fontWeight: 700, color: 'var(--accent)' }}>$</span>
            <input type="text" placeholder="300,000" inputMode="numeric" value={formData.askingPrice || ''}
              onChange={(e) => setField('askingPrice', formatPrice(e.target.value))}
              style={{ ...inputStyle, paddingLeft: '36px' }} />
          </div>
          <button onClick={() => { if (formData.askingPrice?.trim()) next(); else alert('Please enter a price.'); }}
            style={primaryBtn} onMouseOver={e => e.currentTarget.style.opacity = '0.9'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
            Continue &rarr;
          </button>
        </div>
      )}

      {/* ── Timeline ── */}
      {currentStep === 'timeline' && (
        <div>
          <button onClick={back} style={backLink}>&larr; Back</button>
          <h2 style={heading}>When do you need to close?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { emoji: '⚡', label: 'ASAP — within 7 days' },
              { emoji: '📅', label: 'Within 30 days' },
              { emoji: '📆', label: 'Within 60 days' },
              { emoji: '🗓', label: '3–6 months' },
              { emoji: '🕐', label: 'No rush — just exploring' },
            ].map(opt => (
              <button key={opt.label} onClick={() => handleSelect('timeline', opt.label)}
                style={optionBtn} onMouseEnter={onOptEnter} onMouseLeave={onOptLeave}>
                {opt.emoji} {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Reason ── */}
      {currentStep === 'reason' && (
        <div>
          <button onClick={back} style={backLink}>&larr; Back</button>
          <h2 style={heading}>What&apos;s your primary reason for selling?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {reasonOptions.map(opt => (
              <button key={opt.value} onClick={() => handleSelect('reason', opt.value)}
                style={optionBtn} onMouseEnter={onOptEnter} onMouseLeave={onOptLeave}>
                {opt.emoji} {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Listed ── */}
      {currentStep === 'listed' && (
        <div>
          <button onClick={back} style={backLink}>&larr; Back</button>
          <h2 style={heading}>Is the property currently listed for sale?</h2>
          <p style={subtext}>Includes MLS, agent listings, and FSBO on Zillow or Realtor.com.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => handleSelect('listed', 'No - not listed')}
              style={optionBtn} onMouseEnter={onOptEnter} onMouseLeave={onOptLeave}>
              ✓ No — not currently listed anywhere
            </button>
            <button onClick={() => handleDisqualify('listed', 'Listed with agent')}
              style={optionBtn} onMouseEnter={onDqEnter} onMouseLeave={onDqLeave}>
              ✗ Yes — listed with an agent
            </button>
            <button onClick={() => handleDisqualify('listed', 'Listed FSBO')}
              style={optionBtn} onMouseEnter={onDqEnter} onMouseLeave={onDqLeave}>
              ✗ Yes — listed for sale by owner (FSBO)
            </button>
          </div>
        </div>
      )}

      {/* ── Contact ── */}
      {currentStep === 'contact' && (
        <div>
          <button onClick={back} style={backLink}>&larr; Back</button>
          <h2 style={heading}>Where should we send your cash offer?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={inputStyle} />
            <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} style={inputStyle} />
          </div>
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
            style={{ ...inputStyle, marginBottom: '10px' }} />
          <input type="tel" placeholder="(555) 000-0000" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))}
            style={{ ...inputStyle, marginBottom: '14px' }} />
          <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
            style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, width: 0, opacity: 0 }} tabIndex={-1} autoComplete="off" />
          <button onClick={handleSubmit} disabled={status === 'submitting'}
            style={{ ...primaryBtn, opacity: status === 'submitting' ? 0.6 : 1 }}
            onMouseOver={e => { if (status !== 'submitting') e.currentTarget.style.opacity = '0.9'; }}
            onMouseOut={e => { if (status !== 'submitting') e.currentTarget.style.opacity = '1'; }}>
            {status === 'submitting' ? 'Submitting...' : 'Get My Cash Offer →'}
          </button>
        </div>
      )}
    </div>
  );
}
