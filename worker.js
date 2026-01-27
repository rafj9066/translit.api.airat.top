// Base Cyrillic -> Latin mapping (lowercase).
const TRANSLIT_MAP = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ь: '',
  ы: 'y',
  ъ: '',
  э: 'e',
  ю: 'yu',
  я: 'ya'
};

// Match Cyrillic letters (upper/lower, including Ё/ё).
const CYRILLIC_REGEX = /[А-Яа-яЁё]/g;

// Keep the API friendly for browser use.
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'X-Robots-Tag': 'noindex, nofollow'
};

function transliterate(text) {
  return text.replace(CYRILLIC_REGEX, (char) => {
    const lower = char.toLowerCase();
    const mapped = TRANSLIT_MAP[lower];
    if (mapped === undefined) {
      return char;
    }
    if (char === lower) {
      return mapped;
    }
    if (mapped.length === 0) {
      return '';
    }
    // Preserve capitalization for the first letter in the mapped output.
    return mapped[0].toUpperCase() + mapped.slice(1);
  });
}

async function readTextFromBody(request) {
  const contentType = request.headers.get('content-type') || '';

  // Accept JSON body: { "text": "..." }
  if (contentType.includes('application/json')) {
    try {
      const body = await request.json();
      return typeof body?.text === 'string' ? body.text : null;
    } catch {
      return null;
    }
  }

  // Accept form-encoded body: text=...
  if (contentType.includes('application/x-www-form-urlencoded')) {
    const body = await request.text();
    const params = new URLSearchParams(body);
    return params.get('text');
  }

  // Accept raw text body.
  if (contentType.includes('text/plain')) {
    return await request.text();
  }

  return null;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...CORS_HEADERS
    }
  });
}

function textResponse(text, status = 200) {
  return new Response(text, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      ...CORS_HEADERS
    }
  });
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    if (url.pathname === '/robots.txt') {
      return textResponse('User-agent: *\nDisallow: /\n');
    }
    if (url.pathname === '/health') {
      return jsonResponse({ status: 'ok' });
    }
    let text = url.searchParams.get('text');

    if (text === null && request.method === 'POST') {
      text = await readTextFromBody(request);
    }

    if (text === null) {
      return jsonResponse({ error: 'Missing required parameter: text' }, 400);
    }

    const translit = transliterate(text);
    return jsonResponse({ text, translit });
  }
};
