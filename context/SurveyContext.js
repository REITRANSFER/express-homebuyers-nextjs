'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { captureUTMParams } from '@/lib/tracking';
import { submitFormData } from '@/lib/submitForm';

const SurveyContext = createContext(null);

export function SurveyProvider({ config, children }) {
  const { sourceName, reasonOptions, stepOrder, totalSteps } = config;
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [addressValidated, setAddressValidated] = useState({});
  const [status, setStatus] = useState('idle');
  const [trackingData] = useState(() => captureUTMParams());

  const currentStepName = stepOrder[currentStepIndex];
  const progressPercent = status === 'success' || status === 'disqualified'
    ? 100
    : ((currentStepIndex + 1) / totalSteps) * 100;

  const openSurvey = useCallback((prefillAddress = null) => {
    if (prefillAddress) {
      setFormData(prev => ({ ...prev, address: prefillAddress }));
      const addressIndex = stepOrder.indexOf('address');
      if (addressIndex >= 0) {
        setCurrentStepIndex(addressIndex + 1);
      } else {
        setCurrentStepIndex(0);
      }
    } else {
      setCurrentStepIndex(0);
      setFormData({});
    }
    setStatus('idle');
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, [stepOrder]);

  const closeSurvey = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const goBack = useCallback(() => {
    setCurrentStepIndex(prev => Math.max(0, prev - 1));
  }, []);

  const selectOption = useCallback((key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setCurrentStepIndex(prev => prev + 1);
  }, []);

  const disqualify = useCallback((key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setStatus('disqualified');
  }, []);

  const setField = useCallback((key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  const continueToNext = useCallback(() => {
    setCurrentStepIndex(prev => prev + 1);
  }, []);

  const submitSurvey = useCallback(async (contactData) => {
    setStatus('submitting');
    const payload = {
      ...formData,
      ...contactData,
      source: sourceName,
    };
    await submitFormData(payload, trackingData);
    window.location.href = '/thank-you';
  }, [formData, sourceName, trackingData]);

  const value = {
    isOpen,
    currentStepIndex,
    currentStepName,
    formData,
    addressValidated,
    setAddressValidated: (inputId, valid) => setAddressValidated(prev => ({ ...prev, [inputId]: valid })),
    status,
    progressPercent,
    stepOrder,
    totalSteps,
    reasonOptions,
    openSurvey,
    closeSurvey,
    goBack,
    selectOption,
    disqualify,
    setField,
    continueToNext,
    submitSurvey,
  };

  return (
    <SurveyContext.Provider value={value}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) throw new Error('useSurvey must be used within a SurveyProvider');
  return context;
}
