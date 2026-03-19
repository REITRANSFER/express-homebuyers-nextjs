'use client';

import { SurveyProvider } from '@/context/SurveyContext';
import { pageConfigs } from '@/lib/surveyConfig';
import { SurveyCard } from '@/components/survey/survey-card';
import StickyBar from '@/components/StickyBar/StickyBar';
import SurveyModal from '@/components/SurveyModal/SurveyModal';

export default function SurveyPageClient() {
  return (
    <SurveyProvider config={pageConfigs.home}>
      <StickyBar triggerElementId="survey-card" />
      <div id="survey-card" className="w-full max-w-lg">
        <SurveyCard />
      </div>
      <SurveyModal />
    </SurveyProvider>
  );
}
