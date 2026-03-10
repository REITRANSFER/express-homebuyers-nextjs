import { SOURCE_TAG } from '@/lib/config';

export async function submitFormData(formData, trackingData = {}) {
  const payload = { ...formData, ...trackingData, source: SOURCE_TAG };
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response;
  } catch (err) {
    console.error('Form submission error:', err);
    throw err;
  }
}
