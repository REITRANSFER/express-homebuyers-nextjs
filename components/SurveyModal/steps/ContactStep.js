'use client';

import { useState } from 'react';
import { useSurvey } from '@/context/SurveyContext';
import { validatePhone, validateEmail, formatPhone } from '@/lib/validation';

const inputStyle = { width: '100%', padding: '16px 20px', fontSize: '16px', border: '2px solid #e9ecef', borderRadius: '12px', marginBottom: '16px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
const backStyle = { background: 'none', border: 'none', color: 'var(--accent)', fontSize: '14px', cursor: 'pointer', marginBottom: '20px', fontWeight: 600, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
const btnStyle = { width: '100%', padding: '18px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };

export default function ContactStep() {
  const { submitSurvey, goBack, status } = useSurvey();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [honeypot, setHoneypot] = useState('');

  async function handleSubmit() {
    if (!firstName.trim() || !phone.trim()) {
      alert('Please enter your name and phone number.');
      return;
    }
    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.valid) { alert(phoneCheck.msg); return; }
    if (honeypot) return;
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) { alert(emailCheck.msg); return; }
    await submitSurvey({ firstName, lastName, email, phone });
  }

  return (
    <>
      <button style={backStyle} onClick={goBack}>&#8592; Back</button>
      <h2>Where should we send your cash offer?</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <input style={{ ...inputStyle, marginBottom: 0 }} type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input style={{ ...inputStyle, marginBottom: 0 }} type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <input style={inputStyle} type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input style={inputStyle} type="tel" placeholder="+1 (301) 000-0000" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} />
      <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, width: 0 }} tabIndex={-1} autoComplete="off" />
      <button style={btnStyle} onClick={handleSubmit} disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting...' : 'Get My Cash Offer →'}
      </button>
    </>
  );
}
