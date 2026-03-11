'use client';

import { useState } from 'react';
import { useSurvey } from '@/context/SurveyContext';
import AddressInput from '@/components/AddressInput/AddressInput';
import { formatPrice, formatPhone, validatePhone, validateEmail } from '@/lib/validation';
import { PHONE } from '@/lib/config';

const steps = ['address', 'propertyType', 'condition', 'price', 'timeline', 'reason', 'listed', 'contact'];

/* ── design tokens (matched to Express Homebuyers production) ── */
const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const styles = {
  card: {
    borderRadius: '20px',
    background: '#ffffff',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.03)',
    overflow: 'hidden',
    position: 'relative',
  },
  progressTrack: {
    height: '5px',
    background: '#e5e7eb',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--accent), var(--accent-dark, var(--accent)))',
    transition: 'width 0.4s ease',
    borderRadius: '0 3px 3px 0',
  },
  content: {
    padding: '36px 40px 40px',
  },
  stepLabel: {
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'var(--accent)',
    marginBottom: '6px',
    fontFamily: font,
  },
  heading: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    lineHeight: 1.3,
    marginBottom: '8px',
    fontFamily: font,
  },
  subtext: {
    fontSize: '15px',
    color: '#6b7280',
    marginBottom: '20px',
    lineHeight: 1.5,
    fontFamily: font,
  },
  input: {
    width: '100%',
    padding: '16px 20px',
    fontSize: '16px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    outline: 'none',
    background: '#ffffff',
    color: '#111827',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: font,
    boxSizing: 'border-box',
  },
  primaryBtn: {
    width: '100%',
    padding: '16px 24px',
    background: 'linear-gradient(135deg, var(--accent), var(--accent-dark, var(--accent)))',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '17px',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    fontFamily: font,
    letterSpacing: '0.01em',
  },
  optionBtn: {
    width: '100%',
    textAlign: 'left',
    padding: '18px 22px',
    fontSize: '16px',
    fontWeight: 500,
    color: '#111827',
    background: '#ffffff',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
    fontFamily: font,
    position: 'relative',
  },
  conditionCard: {
    textAlign: 'center',
    padding: '20px 14px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    background: '#ffffff',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s',
    fontFamily: font,
  },
  backLink: {
    background: 'none',
    border: 'none',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--accent)',
    cursor: 'pointer',
    marginBottom: '16px',
    padding: 0,
    fontFamily: font,
    display: 'inline-block',
  },
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

  function next() { setStep(p => Math.min(p + 1, steps.length - 1)); }
  function back() { setStep(p => Math.max(p - 1, 0)); }
  function handleAddressSelect(addr) { setField('address', addr); setTimeout(() => next(), 200); }
  function handleSelect(key, value) { setField(key, value); next(); }
  function handleDisqualify(key, value) { setField(key, value); setStep(99); }

  async function handleSubmit() {
    if (!firstName.trim() || !phone.trim()) { alert('Please enter your name and phone number.'); return; }
    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.valid) { alert(phoneCheck.msg); return; }
    if (honeypot) return;
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) { alert(emailCheck.msg); return; }
    await submitSurvey({ firstName, lastName, email, phone });
  }

  /* hover helpers */
  function optIn(e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = '#faf5f0'; e.currentTarget.style.transform = 'translateX(-2px)'; }
  function optOut(e) { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.transform = 'translateX(0)'; }
  function condIn(e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = '#faf5f0'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)'; }
  function condOut(e) { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }
  function dqIn(e) { e.currentTarget.style.borderColor = '#fca5a5'; e.currentTarget.style.background = '#fef2f2'; }
  function dqOut(e) { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#ffffff'; }
  function btnIn(e) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)'; }
  function btnOut(e) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.15)'; }
  function inputFocus(e) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--accent-rgb, 59,130,246), 0.1)'; }
  function inputBlur(e) { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }

  // ── Disqualified ──
  if (step === 99) {
    return (
      <div style={styles.card}>
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: '100%' }} />
        </div>
        <div style={{ ...styles.content, textAlign: 'center', padding: '48px 40px 56px' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>📞</div>
          <h3 style={{ ...styles.heading, fontSize: '22px', marginBottom: '12px' }}>We may still be able to help.</h3>
          <p style={{ ...styles.subtext, marginBottom: '20px', maxWidth: '380px', marginLeft: 'auto', marginRight: 'auto' }}>
            Our team specializes in unique situations. Call us directly and we&apos;ll tell you honestly what your options are.
          </p>
          {PHONE && PHONE !== '[Phone Number]' && (
            <a href={`tel:${PHONE.replace(/\D/g, '')}`} style={{
              display: 'inline-block', fontSize: '20px', fontWeight: 700, color: '#111827',
              textDecoration: 'none', padding: '12px 28px', background: '#f3f4f6',
              borderRadius: '12px', fontFamily: font,
            }}>{PHONE}</a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      {/* ── Progress bar (flush with card top) ── */}
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${progressPct}%` }} />
      </div>

      <div style={styles.content}>
        {/* ── Step 1: Address ── */}
        {currentStep === 'address' && (
          <div>
            <div style={styles.stepLabel}>
              <span role="img" aria-label="house">🏠</span>{' '}Step {step + 1} of {steps.length}
            </div>
            <h2 style={styles.heading}>What&apos;s your property address?</h2>
            <p style={styles.subtext}>Start typing and select your address from the dropdown.</p>
            <AddressInput
              id="surveyAddress"
              placeholder="Enter your property address..."
              value={formData.address || ''}
              onChange={(v) => setField('address', v)}
              onAddressSelect={handleAddressSelect}
              inputClassName=""
              style={styles.input}
            />
            <button
              onClick={() => { if (formData.address?.trim()) next(); else alert('Please enter your property address.'); }}
              style={{ ...styles.primaryBtn, marginTop: '16px' }}
              onMouseEnter={btnIn} onMouseLeave={btnOut}
            >
              Continue →
            </button>
          </div>
        )}

        {/* ── Step 2: Property Type ── */}
        {currentStep === 'propertyType' && (
          <div>
            <button onClick={back} style={styles.backLink}>← Back</button>
            <div style={styles.stepLabel}>Step {step + 1} of {steps.length}</div>
            <h2 style={styles.heading}>What type of property is it?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              {[
                { emoji: '🏠', label: 'Single Family Home', value: 'Single Family' },
                { emoji: '🏘', label: 'Multi-Family (2-4 units)', value: 'Multi-Family' },
                { emoji: '🏢', label: 'Condo or Townhouse', value: 'Condo/Townhouse' },
              ].map(opt => (
                <button key={opt.value} onClick={() => handleSelect('propertyType', opt.value)}
                  style={styles.optionBtn} onMouseEnter={optIn} onMouseLeave={optOut}>
                  <span style={{ marginRight: '10px' }}>{opt.emoji}</span>{opt.label}
                </button>
              ))}
              <button onClick={() => handleDisqualify('propertyType', 'Land/Commercial/Mobile')}
                style={styles.optionBtn} onMouseEnter={dqIn} onMouseLeave={dqOut}>
                <span style={{ marginRight: '10px' }}>🚫</span>Land, Commercial, or Mobile Home
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Condition ── */}
        {currentStep === 'condition' && (
          <div>
            <button onClick={back} style={styles.backLink}>← Back</button>
            <div style={styles.stepLabel}>Step {step + 1} of {steps.length}</div>
            <h2 style={styles.heading}>What&apos;s the condition of the home?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
              {[
                { emoji: '🏡', label: 'Move-in Ready', sub: 'No major repairs needed', value: 'Move-in ready' },
                { emoji: '🔧', label: 'Minor Repairs', sub: 'Some updating needed', value: 'Minor repairs' },
                { emoji: '🏚', label: 'Major Repairs', sub: 'Significant work needed', value: 'Major repairs' },
                { emoji: '⚠️', label: 'Severe Damage', sub: 'Fire, flood, or structural', value: 'Severe damage' },
              ].map(opt => (
                <button key={opt.value} onClick={() => handleSelect('condition', opt.value)}
                  style={styles.conditionCard} onMouseEnter={condIn} onMouseLeave={condOut}>
                  <div style={{ fontSize: '32px', marginBottom: '6px' }}>{opt.emoji}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{opt.label}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 4: Price ── */}
        {currentStep === 'price' && (
          <div>
            <button onClick={back} style={styles.backLink}>← Back</button>
            <div style={styles.stepLabel}>Step {step + 1} of {steps.length}</div>
            <h2 style={styles.heading}>What&apos;s your asking price or estimated value?</h2>
            <div style={{ position: 'relative', marginBottom: '16px', marginTop: '8px' }}>
              <span style={{
                position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
                fontSize: '18px', fontWeight: 700, color: 'var(--accent)', pointerEvents: 'none',
              }}>$</span>
              <input type="text" placeholder="300,000" inputMode="numeric" value={formData.askingPrice || ''}
                onChange={(e) => setField('askingPrice', formatPrice(e.target.value))}
                onFocus={inputFocus} onBlur={inputBlur}
                style={{ ...styles.input, paddingLeft: '40px' }} />
            </div>
            <button onClick={() => { if (formData.askingPrice?.trim()) next(); else alert('Please enter a price.'); }}
              style={styles.primaryBtn} onMouseEnter={btnIn} onMouseLeave={btnOut}>
              Continue →
            </button>
          </div>
        )}

        {/* ── Step 5: Timeline ── */}
        {currentStep === 'timeline' && (
          <div>
            <button onClick={back} style={styles.backLink}>← Back</button>
            <div style={styles.stepLabel}>Step {step + 1} of {steps.length}</div>
            <h2 style={styles.heading}>When do you need to close?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              {[
                { emoji: '⚡', label: 'ASAP — within 7 days' },
                { emoji: '📅', label: 'Within 30 days' },
                { emoji: '📆', label: 'Within 60 days' },
                { emoji: '🗓', label: '3–6 months' },
                { emoji: '🕐', label: 'No rush — just exploring' },
              ].map(opt => (
                <button key={opt.label} onClick={() => handleSelect('timeline', opt.label)}
                  style={styles.optionBtn} onMouseEnter={optIn} onMouseLeave={optOut}>
                  <span style={{ marginRight: '10px' }}>{opt.emoji}</span>{opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 6: Reason ── */}
        {currentStep === 'reason' && (
          <div>
            <button onClick={back} style={styles.backLink}>← Back</button>
            <div style={styles.stepLabel}>Step {step + 1} of {steps.length}</div>
            <h2 style={styles.heading}>What&apos;s your primary reason for selling?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              {reasonOptions.map(opt => (
                <button key={opt.value} onClick={() => handleSelect('reason', opt.value)}
                  style={styles.optionBtn} onMouseEnter={optIn} onMouseLeave={optOut}>
                  <span style={{ marginRight: '10px' }}>{opt.emoji}</span>{opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 7: Listed ── */}
        {currentStep === 'listed' && (
          <div>
            <button onClick={back} style={styles.backLink}>← Back</button>
            <div style={styles.stepLabel}>Step {step + 1} of {steps.length}</div>
            <h2 style={styles.heading}>Is the property currently listed for sale?</h2>
            <p style={styles.subtext}>Includes MLS, agent listings, and FSBO on Zillow or Realtor.com.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button onClick={() => handleSelect('listed', 'No - not listed')}
                style={styles.optionBtn} onMouseEnter={optIn} onMouseLeave={optOut}>
                <span style={{ marginRight: '10px' }}>✓</span>No — not currently listed anywhere
              </button>
              <button onClick={() => handleDisqualify('listed', 'Listed with agent')}
                style={styles.optionBtn} onMouseEnter={dqIn} onMouseLeave={dqOut}>
                <span style={{ marginRight: '10px' }}>✗</span>Yes — listed with an agent
              </button>
              <button onClick={() => handleDisqualify('listed', 'Listed FSBO')}
                style={styles.optionBtn} onMouseEnter={dqIn} onMouseLeave={dqOut}>
                <span style={{ marginRight: '10px' }}>✗</span>Yes — listed for sale by owner (FSBO)
              </button>
            </div>
          </div>
        )}

        {/* ── Step 8: Contact ── */}
        {currentStep === 'contact' && (
          <div>
            <button onClick={back} style={styles.backLink}>← Back</button>
            <div style={styles.stepLabel}>Last Step</div>
            <h2 style={styles.heading}>Where should we send your cash offer?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px', marginTop: '8px' }}>
              <input type="text" placeholder="First name" value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={inputFocus} onBlur={inputBlur}
                style={styles.input} />
              <input type="text" placeholder="Last name" value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onFocus={inputFocus} onBlur={inputBlur}
                style={styles.input} />
            </div>
            <input type="email" placeholder="Email address" value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={inputFocus} onBlur={inputBlur}
              style={{ ...styles.input, marginBottom: '12px' }} />
            <input type="tel" placeholder="(555) 000-0000" value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              onFocus={inputFocus} onBlur={inputBlur}
              style={{ ...styles.input, marginBottom: '16px' }} />
            <input type="text" name="website" value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, width: 0, opacity: 0 }}
              tabIndex={-1} autoComplete="off" />
            <button onClick={handleSubmit} disabled={status === 'submitting'}
              style={{ ...styles.primaryBtn, opacity: status === 'submitting' ? 0.6 : 1 }}
              onMouseEnter={status !== 'submitting' ? btnIn : undefined}
              onMouseLeave={status !== 'submitting' ? btnOut : undefined}>
              {status === 'submitting' ? 'Submitting...' : 'Get My Cash Offer →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
