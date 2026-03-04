export function captureUTMParams() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const data = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid', 'msclkid', 'ttclid'].forEach((k) => {
    const v = params.get(k);
    if (v) data[k] = v;
  });
  data.landing_page = window.location.pathname;
  // Capture IP
  fetch('https://api.ipify.org?format=json')
    .then((r) => r.json())
    .then((d) => { data.ip_address = d.ip; })
    .catch(() => {});
  return data;
}
