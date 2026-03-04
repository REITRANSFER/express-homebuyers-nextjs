'use client';

import { useSurvey } from '@/context/SurveyContext';
import styles from './SurveyModal.module.css';
import AddressStep from './steps/AddressStep';
import PropertyTypeStep from './steps/PropertyTypeStep';
import ConditionStep from './steps/ConditionStep';
import PriceStep from './steps/PriceStep';
import TimelineStep from './steps/TimelineStep';
import ReasonStep from './steps/ReasonStep';
import ListedStep from './steps/ListedStep';
import ContactStep from './steps/ContactStep';
import SuccessStep from './steps/SuccessStep';
import DisqualifiedStep from './steps/DisqualifiedStep';

const stepComponents = {
  address: AddressStep,
  propertyType: PropertyTypeStep,
  condition: ConditionStep,
  price: PriceStep,
  timeline: TimelineStep,
  reason: ReasonStep,
  listed: ListedStep,
  contact: ContactStep,
};

export default function SurveyModal() {
  const { isOpen, currentStepName, currentStepIndex, totalSteps, progressPercent, status, closeSurvey } = useSurvey();

  if (!isOpen) return null;

  let content;
  if (status === 'success') {
    content = <SuccessStep />;
  } else if (status === 'disqualified') {
    content = <DisqualifiedStep />;
  } else {
    const StepComponent = stepComponents[currentStepName];
    content = StepComponent ? <StepComponent /> : null;
  }

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) closeSurvey(); }}>
      <div className={styles.modal}>
        <span className={styles.close} onClick={closeSurvey}>&times;</span>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
        </div>
        <div className={styles.content}>
          {status === 'idle' && (
            <div className={styles.stepNumber}>
              {currentStepIndex === totalSteps - 1 ? 'Last Step' : `Step ${currentStepIndex + 1} of ${totalSteps}`}
            </div>
          )}
          {content}
        </div>
      </div>
    </div>
  );
}
