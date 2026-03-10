'use client';

import { useSurvey } from '@/context/SurveyContext';
import AddressInput from '@/components/AddressInput/AddressInput';
import styles from '../SurveyModal.module.css';

export default function AddressStep() {
  const { formData, setField, continueToNext } = useSurvey();

  function handleContinue() {
    if (!formData.address?.trim()) {
      alert('Please enter your property address.');
      return;
    }
    continueToNext();
  }

  function handleAddressSelect(addr) {
    setField('address', addr);
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
