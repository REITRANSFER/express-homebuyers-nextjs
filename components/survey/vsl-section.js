'use client';

import { useEffect } from 'react';
import { COMPANY_NAME, VIDALYTICS_EMBED_ID, VIDALYTICS_ACCOUNT_ID } from '@/lib/config';

export function VSLSection() {
  useEffect(() => {
    if (!VIDALYTICS_EMBED_ID || !VIDALYTICS_ACCOUNT_ID) return;
    try {
      (function (v, i, d, a, l, y, t, c, s) {
        y = '_' + d.toLowerCase(); c = d + 'L';
        if (!v[d]) { v[d] = {}; } if (!v[c]) { v[c] = {}; } if (!v[y]) { v[y] = {}; }
        var vl = 'Loader', vli = v[y][vl], vsl = v[c][vl + 'Script'], vlf = v[c][vl + 'Loaded'], ve = 'Embed';
        if (!vsl) {
          vsl = function (u, cb) {
            if (t) { cb(); return; }
            s = i.createElement('script'); s.type = 'text/javascript'; s.async = 1; s.src = u;
            if (s.readyState) { s.onreadystatechange = function () { if (s.readyState === 'loaded' || s.readyState === 'complete') { s.onreadystatechange = null; vlf = 1; cb(); } }; }
            else { s.onload = function () { vlf = 1; cb(); }; }
            i.getElementsByTagName('head')[0].appendChild(s);
          };
        }
        vsl(l + 'loader.min.js', function () { if (!vli) { var vlc = v[c][vl]; vli = new vlc(); } vli.loadScript(l + 'player.min.js', function () { var vec = v[d][ve]; t = new vec(); t.run(a); }); });
      })(window, document, 'Vidalytics', VIDALYTICS_EMBED_ID, 'https://fast.vidalytics.com/embeds/' + VIDALYTICS_ACCOUNT_ID + '/' + VIDALYTICS_EMBED_ID + '/');
    } catch (e) {
      // Vidalytics not available
    }
  }, []);

  if (!VIDALYTICS_EMBED_ID || !VIDALYTICS_ACCOUNT_ID) return null;

  return (
    <div className="w-full max-w-3xl">
      <div className="overflow-hidden rounded-xl bg-black shadow-2xl">
        <div id={VIDALYTICS_EMBED_ID} style={{ width: '100%', position: 'relative', paddingTop: '56.25%' }} />
      </div>
      <p className="mt-3 text-center text-sm text-gray-500">
        &#9654; Watch: See how {COMPANY_NAME} can help you sell fast
      </p>
    </div>
  );
}
