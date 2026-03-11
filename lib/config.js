// lib/config.js
// Single read point for all client-specific env vars.
// All NEXT_PUBLIC_ vars are available in the browser; others are server-side only.

export const COMPANY_NAME  = process.env.NEXT_PUBLIC_COMPANY_NAME  || '[Company Name]';
export const OWNER_NAME    = process.env.NEXT_PUBLIC_OWNER_NAME    || '[Owner Name]';
export const PHONE         = process.env.NEXT_PUBLIC_PHONE         || '[Phone Number]';
export const EMAIL         = process.env.NEXT_PUBLIC_EMAIL         || '[Email Address]';
export const STATE         = process.env.NEXT_PUBLIC_STATE         || '[State]';
export const SOURCE_TAG    = process.env.NEXT_PUBLIC_SOURCE_TAG    || 'survey';
export const ACCENT_COLOR  = process.env.NEXT_PUBLIC_ACCENT_COLOR  || '#2b5e8e';
export const LOGO_URL      = process.env.NEXT_PUBLIC_LOGO_URL      || '';

// Location bias: two flat keys parsed as floats
export const LOCATION_BIAS_LAT = parseFloat(process.env.NEXT_PUBLIC_LOCATION_BIAS_LAT || '38.9072');
export const LOCATION_BIAS_LNG = parseFloat(process.env.NEXT_PUBLIC_LOCATION_BIAS_LNG || '-77.0369');

// Service areas: JSON array of uppercase state abbreviations e.g. '["TX","OK"]'
export const SERVICE_AREAS = (() => {
  try { return JSON.parse(process.env.NEXT_PUBLIC_SERVICE_AREAS || '[]'); }
  catch { return []; }
})();

// Browser-side env vars (require NEXT_PUBLIC_ prefix)
export const FB_PIXEL_ID           = process.env.NEXT_PUBLIC_FB_PIXEL_ID           || '';
export const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || '';
export const VIDALYTICS_EMBED_ID   = process.env.NEXT_PUBLIC_VIDALYTICS_EMBED_ID   || '';
export const VIDALYTICS_ACCOUNT_ID = process.env.NEXT_PUBLIC_VIDALYTICS_ACCOUNT_ID || '';

// Trust stats: JSON array or pipe-separated string for trust indicator pills
export const TRUST_STATS = process.env.NEXT_PUBLIC_TRUST_STATS || '';
