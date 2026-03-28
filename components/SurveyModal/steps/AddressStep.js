'use client';

import { useSurvey } from '@/context/SurveyContext';
import AddressInput from '@/components/AddressInput/AddressInput';
import styles from '../SurveyModal.module.css';

const BLOCKED_ADDRESSES = ['9809 newhall road', '9809 newhall rd'];

function isBlockedAddress(address) {
  const normalized = (address || '').toLowerCase().trim();
  return BLOCKED_ADDRESSES.some((blocked) => normalized.includes(blocked));
}

export default function AddressStep() {
  const { formData, setField, continueToNext, disqualify } = useSurvey();

  function handleContinue() {
    if (!formData.address?.trim()) {
      alert('Please enter your property address.');
      return;
    }
    if (isBlockedAddress(formData.address)) {
      disqualify('address', formData.address);
      return;
    }
    continueToNext();
  }

  function handleAddressSelect(addr) {
    setField('address', addr);
    if (isBlockedAddress(addr)) {
      setTimeout(() => disqualify('address', addr), 200);
      return;
    }
    setTimeout(() => continueToNext(), 200);
  }

  return (
    <>
      <h2>What&apos;s the property address?</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        Start by entering the address you want to sell.
      </p>
      <AddressInput
        id="propertyAddress"
        placeholder="123 Main St, City, State"
        value={formData.address || ''}
        onChange={(v) => setField('address', v)}
        onAddressSelect={handleAddressSelect}
      />
      <button className="continue-button" onClick={handleContinue} style={{ width: '100%', padding: '18px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', marginTop: '16px', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        Get My Offer &#8594;
      </button>
    </>
  );
}
