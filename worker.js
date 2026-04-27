// Cloudflare Worker — page view counter proxy
// Keeps the Upstash token server-side so it never appears in the client bundle.
//
// Environment variables (set in Cloudflare dashboard → Worker → Settings → Variables):
//   UPSTASH_URL   – e.g. https://trusting-eft-67649.upstash.io
//   UPSTASH_TOKEN – your Upstash REST token

const ALLOWED_ORIGIN = 'https://robayedl.github.io';

const cors = (origin) => ({
  'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : '',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
  'Content-Type': 'application/json',
});

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') ?? '';

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(origin) });
    }

    // Block non-portfolio origins (stops casual curl/script abuse)
    if (origin !== ALLOWED_ORIGIN) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const upstashHeaders = {
      Authorization: `Bearer ${env.UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    };

    try {
      const isIncr = request.method === 'POST';
      const res = await fetch(
        `${env.UPSTASH_URL}/${isIncr ? 'incr' : 'get'}/pageviews`,
        { method: isIncr ? 'POST' : 'GET', headers: upstashHeaders },
      );
      const { result } = await res.json();
      return Response.json({ count: Number(result) || 0 }, { headers: cors(origin) });
    } catch {
      return Response.json({ count: null }, { status: 500, headers: cors(origin) });
    }
  },
};
