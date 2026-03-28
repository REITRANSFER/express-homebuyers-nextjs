// app/api/submit/route.js
// Next.js App Router Route Handler
// Reads WEBHOOK_URL server-side and proxies form data -- never expose webhook URL to browser.

const BLOCKED_ADDRESSES = ['9809 newhall road', '9809 newhall rd'];

function isBlockedAddress(address) {
  const normalized = (address || '').toLowerCase().trim();
  return BLOCKED_ADDRESSES.some((blocked) => normalized.includes(blocked));
}

export async function POST(request) {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json({ error: 'Webhook not configured' }, { status: 500 });
  }
  try {
    const body = await request.json();

    if (isBlockedAddress(body.address)) {
      return Response.json({ success: true }, { status: 200 });
    }
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const text = await upstream.text();
    return new Response(text, { status: upstream.status });
  } catch (err) {
    console.error('Submission proxy error:', err);
    return Response.json({ error: 'Submission failed' }, { status: 500 });
  }
}
