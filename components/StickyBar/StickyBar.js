'use client';

import { useState, useEffect } from 'react';
import { useSurvey } from '@/context/SurveyContext';
import AddressInput from '@/components/AddressInput/AddressInput';
import styles from './StickyBar.module.css';

export default function StickyBar({ triggerElementId }) {
  const { openSurvey } = useSurvey();
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    function onScroll() {
      if (triggerElementId) {
        const el = document.getElementById(triggerElementId);
        if (el) {
          const bottom = el.getBoundingClientRect().bottom;
          setVisible(bottom < 0);
          return;
        }
      }
      setVisible(window.scrollY > 300);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [triggerElementId]);

  function handleAddressSelect(addr) {
    setAddress(addr);
    setTimeout(() => openSurvey(addr), 200);
  }

  if (!visible) return null;

  return (
    <div className={styles.bar}>
      <div className={styles.content}>
        <span className={styles.label}>Get Your Cash Offer:</span>
        <AddressInput
          id="stickyAddress"
          placeholder="Enter property address..."
          value={address}
          onChange={setAddress}
          onAddressSelect={handleAddressSelect}
          inputClassName={styles.input}
        />
        <button className={styles.button} onClick={() => {
          if (address.trim()) openSurvey(address);
        }}>Start &#8594;</button>
      </div>
    </div>
  );
}
