'use client';

import { useState } from 'react';
import { useSurvey } from '@/context/SurveyContext';
import AddressInput from '@/components/AddressInput/AddressInput';
import { formatPrice, formatPhone, validatePhone, validateEmail } from '@/lib/validation';

const steps = ['address', 'propertyType', 'condition', 'price', 'timeline', 'reason', 'listed', 'contact'];

export function SurveyCard() {
  const { openSurvey, formData, setField, selectOption, disqualify, continueToNext, submitSurvey, goBack, status, reasonOptions } = useSurvey();
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
    setStep(99); // disqualified
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

  // Disqualified state
  if (step === 99) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-xl text-center">
        <div className="text-6xl mb-4">&#128222;</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">We may still be able to help.</h3>
        <p className="text-gray-600">Our team specializes in unique situations. Call us directly and we&apos;ll tell you honestly what your options are.</p>
        <p className="mt-4 text-lg font-bold text-gray-900">(888) 298-4807</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Step {step + 1} of {steps.length}</span>
          <span>{Math.round(progressPct)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-200">
          <div className="h-full rounded-full bg-[#0891b2] transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Step: Address */}
      {currentStep === 'address' && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">What&apos;s the property address?</h2>
          <p className="text-sm text-gray-500 mb-4">Start by entering the address you want to sell.</p>
          <AddressInput
            id="surveyAddress"
            placeholder="123 Main St, City, State"
            value={formData.address || ''}
            onChange={(v) => setField('address', v)}
            onAddressSelect={handleAddressSelect}
            inputClassName="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-base focus:border-[#0891b2] focus:outline-none"
          />
          <button onClick={() => { if (formData.address?.trim()) next(); else alert('Please enter your property address.'); }}
            className="mt-4 w-full rounded-lg bg-[#0891b2] py-3.5 text-base font-semibold text-white transition hover:bg-[#0e7490]">
            Get My Offer &#8594;
          </button>
        </div>
      )}

      {/* Step: Property Type */}
      {currentStep === 'propertyType' && (
        <div>
          <button onClick={back} className="mb-3 text-sm font-semibold text-[#0891b2] hover:underline">&#8592; Back</button>
          <h2 className="text-xl font-bold text-gray-900 mb-4">What type of property is it?</h2>
          <div className="flex flex-col gap-3">
            {[
              { emoji: '&#127968;', label: 'Single Family Home', value: 'Single Family' },
              { emoji: '&#127960;', label: 'Multi-Family (2-4 units)', value: 'Multi-Family' },
              { emoji: '&#127970;', label: 'Condo or Townhouse', value: 'Condo/Townhouse' },
            ].map(opt => (
              <button key={opt.value} onClick={() => handleSelect('propertyType', opt.value)}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-4 text-left text-base font-medium text-gray-900 transition hover:border-[#0891b2] hover:bg-cyan-50"
                dangerouslySetInnerHTML={{ __html: `${opt.emoji} ${opt.label}` }} />
            ))}
            <button onClick={() => handleDisqualify('propertyType', 'Land/Commercial/Mobile')}
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-4 text-left text-base font-medium text-gray-900 transition hover:border-red-300 hover:bg-red-50">
              &#128683; Land, Commercial, or Mobile Home
            </button>
          </div>
        </div>
      )}

      {/* Step: Condition */}
      {currentStep === 'condition' && (
        <div>
          <button onClick={back} className="mb-3 text-sm font-semibold text-[#0891b2] hover:underline">&#8592; Back</button>
          <h2 className="text-xl font-bold text-gray-900 mb-4">What&apos;s the condition of the home?</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: '&#127969;', label: 'Move-in Ready', sub: 'No major repairs needed', value: 'Move-in ready' },
              { emoji: '&#128295;', label: 'Minor Repairs', sub: 'Some updating needed', value: 'Minor repairs' },
              { emoji: '&#127962;', label: 'Major Repairs', sub: 'Significant work needed', value: 'Major repairs' },
              { emoji: '&#9888;&#65039;', label: 'Severe Damage', sub: 'Fire, flood, or structural', value: 'Severe damage' },
            ].map(opt => (
              <button key={opt.value} onClick={() => handleSelect('condition', opt.value)}
                className="rounded-lg border-2 border-gray-200 p-4 text-center transition hover:border-[#0891b2] hover:bg-cyan-50">
                <div className="text-3xl mb-1" dangerouslySetInnerHTML={{ __html: opt.emoji }} />
                <div className="text-sm font-bold text-gray-900">{opt.label}</div>
                <div className="text-xs text-gray-500 mt-1">{opt.sub}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Price */}
      {currentStep === 'price' && (
        <div>
          <button onClick={back} className="mb-3 text-sm font-semibold text-[#0891b2] hover:underline">&#8592; Back</button>
          <h2 className="text-xl font-bold text-gray-900 mb-4">What&apos;s your asking price or estimated value?</h2>
          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-[#0891b2]">$</span>
            <input type="text" placeholder="300,000" inputMode="numeric" value={formData.askingPrice || ''}
              onChange={(e) => setField('askingPrice', formatPrice(e.target.value))}
              className="w-full rounded-lg border-2 border-gray-200 py-3 pl-10 pr-4 text-base focus:border-[#0891b2] focus:outline-none" />
          </div>
          <button onClick={() => { if (formData.askingPrice?.trim()) next(); else alert('Please enter a price.'); }}
            className="w-full rounded-lg bg-[#0891b2] py-3.5 text-base font-semibold text-white transition hover:bg-[#0e7490]">
            Continue &#8594;
          </button>
        </div>
      )}

      {/* Step: Timeline */}
      {currentStep === 'timeline' && (
        <div>
          <button onClick={back} className="mb-3 text-sm font-semibold text-[#0891b2] hover:underline">&#8592; Back</button>
          <h2 className="text-xl font-bold text-gray-900 mb-4">When do you need to close?</h2>
          <div className="flex flex-col gap-3">
            {[
              { emoji: '&#9889;', label: 'ASAP - within 7 days' },
              { emoji: '&#128197;', label: 'Within 30 days' },
              { emoji: '&#128198;', label: 'Within 60 days' },
              { emoji: '&#128467;', label: '3-6 months' },
              { emoji: '&#128336;', label: 'No rush - just exploring' },
            ].map(opt => (
              <button key={opt.label} onClick={() => handleSelect('timeline', opt.label)}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-4 text-left text-base font-medium text-gray-900 transition hover:border-[#0891b2] hover:bg-cyan-50"
                dangerouslySetInnerHTML={{ __html: `${opt.emoji} ${opt.label}` }} />
            ))}
          </div>
        </div>
      )}

      {/* Step: Reason */}
      {currentStep === 'reason' && (
        <div>
          <button onClick={back} className="mb-3 text-sm font-semibold text-[#0891b2] hover:underline">&#8592; Back</button>
          <h2 className="text-xl font-bold text-gray-900 mb-4">What&apos;s your primary reason for selling?</h2>
          <div className="flex flex-col gap-3">
            {reasonOptions.map(opt => (
              <button key={opt.value} onClick={() => handleSelect('reason', opt.value)}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-4 text-left text-base font-medium text-gray-900 transition hover:border-[#0891b2] hover:bg-cyan-50">
                {opt.emoji} {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Listed */}
      {currentStep === 'listed' && (
        <div>
          <button onClick={back} className="mb-3 text-sm font-semibold text-[#0891b2] hover:underline">&#8592; Back</button>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Is the property currently listed for sale?</h2>
          <p className="text-sm text-gray-500 mb-4">Includes MLS, agent listings, and FSBO on Zillow or Realtor.com.</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => handleSelect('listed', 'No - not listed')}
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-4 text-left text-base font-medium text-gray-900 transition hover:border-[#0891b2] hover:bg-cyan-50">
              &#10003; No - not currently listed anywhere
            </button>
            <button onClick={() => handleDisqualify('listed', 'Listed with agent')}
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-4 text-left text-base font-medium text-gray-900 transition hover:border-red-300 hover:bg-red-50">
              &#10007; Yes - listed with an agent
            </button>
            <button onClick={() => handleDisqualify('listed', 'Listed FSBO')}
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-4 text-left text-base font-medium text-gray-900 transition hover:border-red-300 hover:bg-red-50">
              &#10007; Yes - listed for sale by owner (FSBO)
            </button>
          </div>
        </div>
      )}

      {/* Step: Contact */}
      {currentStep === 'contact' && (
        <div>
          <button onClick={back} className="mb-3 text-sm font-semibold text-[#0891b2] hover:underline">&#8592; Back</button>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Where should we send your cash offer?</h2>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
              className="rounded-lg border-2 border-gray-200 px-4 py-3 text-base focus:border-[#0891b2] focus:outline-none" />
            <input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}
              className="rounded-lg border-2 border-gray-200 px-4 py-3 text-base focus:border-[#0891b2] focus:outline-none" />
          </div>
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
            className="mb-3 w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-base focus:border-[#0891b2] focus:outline-none" />
          <input type="tel" placeholder="+1 (301) 000-0000" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))}
            className="mb-4 w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-base focus:border-[#0891b2] focus:outline-none" />
          <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
            className="absolute -left-[9999px] -top-[9999px] h-0 w-0 opacity-0" tabIndex={-1} autoComplete="off" />
          <button onClick={handleSubmit} disabled={status === 'submitting'}
            className="w-full rounded-lg bg-[#0891b2] py-3.5 text-base font-semibold text-white transition hover:bg-[#0e7490] disabled:opacity-60">
            {status === 'submitting' ? 'Submitting...' : 'Get My Cash Offer \u2192'}
          </button>
        </div>
      )}
    </div>
  );
}
