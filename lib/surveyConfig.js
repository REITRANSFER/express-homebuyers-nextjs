const standardStepOrder = ['address', 'propertyType', 'condition', 'price', 'timeline', 'reason', 'listed', 'contact'];
const founderStepOrder = ['propertyType', 'timeline', 'condition', 'address', 'contact'];

const standardReasonOptions = [
  { emoji: '\u{1F3E2}', label: 'Pre-foreclosure / behind on mortgage', value: 'Pre-foreclosure / behind on mortgage' },
  { emoji: '\u{1F3E5}', label: 'Medical debt / financial hardship', value: 'Medical debt / financial hardship' },
  { emoji: '\u2696\uFE0F', label: 'Divorce / separation', value: 'Divorce / separation' },
  { emoji: '\u{1F4CB}', label: 'Tax lien / delinquent taxes', value: 'Tax lien / delinquent taxes' },
  { emoji: '\u{1F3E0}', label: 'Inherited property', value: 'Inherited property' },
  { emoji: '\u2708\uFE0F', label: 'Relocation / life change', value: 'Relocation / life change' },
];

export const pageConfigs = {
  home: {
    sourceName: 'Express Homebuyers - Direct Response',
    reasonOptions: standardReasonOptions,
    stepOrder: standardStepOrder,
    totalSteps: standardStepOrder.length,
  },
  advertorial: {
    sourceName: 'Express Homebuyers - Elder Care Article',
    reasonOptions: standardReasonOptions,
    stepOrder: standardStepOrder,
    totalSteps: standardStepOrder.length,
  },
  'advertorial-founder': {
    sourceName: 'Express Homebuyers - Brad Chandler Article',
    reasonOptions: standardReasonOptions,
    stepOrder: standardStepOrder,
    totalSteps: standardStepOrder.length,
  },
  'pre-foreclosure': {
    sourceName: 'Express Homebuyers - Pre-Foreclosure Article',
    reasonOptions: standardReasonOptions,
    stepOrder: standardStepOrder,
    totalSteps: standardStepOrder.length,
  },
  'tax-lien': {
    sourceName: 'Express Homebuyers - Tax Lien Article',
    reasonOptions: standardReasonOptions,
    stepOrder: standardStepOrder,
    totalSteps: standardStepOrder.length,
  },
  'elder-care': {
    sourceName: 'Express Homebuyers - Elder Care Article',
    reasonOptions: standardReasonOptions,
    stepOrder: standardStepOrder,
    totalSteps: standardStepOrder.length,
  },
  inherited: {
    sourceName: 'Express Homebuyers - Inherited Article',
    reasonOptions: standardReasonOptions,
    stepOrder: standardStepOrder,
    totalSteps: standardStepOrder.length,
  },
  downsizing: {
    sourceName: 'Express Homebuyers - Downsizing Article',
    reasonOptions: standardReasonOptions,
    stepOrder: standardStepOrder,
    totalSteps: standardStepOrder.length,
  },
  'medical-financial': {
    sourceName: 'Express Homebuyers - Medical/Financial Article',
    reasonOptions: standardReasonOptions,
    stepOrder: standardStepOrder,
    totalSteps: standardStepOrder.length,
  },
  divorce: {
    sourceName: 'Express Homebuyers - Divorce Article',
    reasonOptions: standardReasonOptions,
    stepOrder: standardStepOrder,
    totalSteps: standardStepOrder.length,
  },
  'tired-landlord': {
    sourceName: 'Express Homebuyers - Tired Landlord Article',
    reasonOptions: standardReasonOptions,
    stepOrder: standardStepOrder,
    totalSteps: standardStepOrder.length,
  },
  'job-loss': {
    sourceName: 'Express Homebuyers - Job Loss Article',
    reasonOptions: standardReasonOptions,
    stepOrder: standardStepOrder,
    totalSteps: standardStepOrder.length,
  },
};
