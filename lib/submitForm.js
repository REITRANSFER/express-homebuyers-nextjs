const WEBHOOK_URL = 'YOUR_EXPRESS_HOMEBUYERS_GHL_WEBHOOK_URL';

export async function submitFormData(formData, trackingData = {}) {
  const payload = { ...formData, ...trackingData };
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('Form submission error:', err);
  }
}
