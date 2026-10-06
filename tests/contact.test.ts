import test from 'node:test';
import assert from 'node:assert/strict';
import {
  handleContact,
  validateContact,
  createRateLimiter,
} from '../src/lib/contact.ts';
const config = {
  apiKey: 'test-key',
  from: 'APIXEL <test@example.com>',
  to: 'inbox@example.com',
};
const valid = {
  name: 'Test',
  email: 'person@example.com',
  message: 'Potrzebuję strony dla firmy usługowej.',
  service: 'strona-seo',
  requestId: '1e05026e-e2ec-4f5f-9cfb-9951568f1eca',
};
function form(values: Record<string, string> = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ ...valid, ...values }))
    data.set(key, value);
  return data;
}
function request(values: Record<string, string> = {}, json = true) {
  return new Request('https://www.apixel.pl/api/contact/', {
    method: 'POST',
    headers: {
      Origin: 'https://www.apixel.pl',
      Accept: json ? 'application/json' : 'text/html',
    },
    body: form(values),
  });
}

test('normalizes optional website and rejects invalid fields', () => {
  const { data, errors } = validateContact(
    form({ website: 'firma.pl', phone: '+48 123 456 789' }),
  );
  assert.equal(data.website, 'https://firma.pl/');
  assert.deepEqual(errors, {});
  const invalid = validateContact(
    form({
      name: 'x',
      email: 'invalid',
      message: 'short',
      website: 'javascript:alert(1)',
      phone: 'abc',
    }),
  );
  for (const key of ['name', 'email', 'message', 'website', 'phone'])
    assert.ok(Object.hasOwn(invalid.errors, key));
});
test('does not call mail provider for validation errors or honeypot', async () => {
  let calls = 0;
  const send: typeof fetch = async () => {
    calls++;
    return Response.json({ id: 'ok' });
  };
  const bad = await handleContact(request({ email: 'invalid' }), 'ip', {
    config,
    send,
  });
  assert.equal(bad.status, 400);
  assert.equal((await bad.json()).ok, false);
  assert.equal(
    (
      await handleContact(request({ company_url: 'spam' }), 'ip', {
        config,
        send,
      })
    ).status,
    400,
  );
  assert.equal(calls, 0);
});
test('rejects cross-origin and wrong method', async () => {
  const cross = new Request('https://www.apixel.pl/api/contact/', {
    method: 'POST',
    headers: { Origin: 'https://other.example', Accept: 'application/json' },
    body: form(),
  });
  assert.equal((await handleContact(cross, 'ip', { config })).status, 403);
  assert.equal(
    (
      await handleContact(
        new Request('https://www.apixel.pl/api/contact/'),
        'ip',
        { config },
      )
    ).status,
    405,
  );
});
test('missing configuration and provider errors never report success', async () => {
  assert.equal(
    (await handleContact(request(), 'ip', { config: {} })).status,
    503,
  );
  for (const send of [
    async () => Response.json({ error: 'failed' }, { status: 500 }),
    async () => Response.json({}),
    async () => {
      throw new Error('timeout');
    },
  ]) {
    const response = await handleContact(request(), 'ip', { config, send });
    assert.equal(response.status, 502);
    assert.equal((await response.json()).ok, false);
  }
});
test('only provider acknowledgement produces success, with stable retry id and reply address', async () => {
  const ids: string[] = [];
  const send: typeof fetch = async (_url, options) => {
    const payload = JSON.parse(options?.body as string);
    assert.equal(payload.reply_to, valid.email);
    assert.equal(payload.to[0], config.to);
    ids.push(new Headers(options?.headers).get('Idempotency-Key')!);
    return Response.json({ id: 'accepted' });
  };
  for (let i = 0; i < 2; i++) {
    const response = await handleContact(request(), 'ip', { config, send });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
  }
  assert.equal(ids[0], ids[1]);
  const native = await handleContact(request({}, false), 'ip', {
    config,
    send,
  });
  assert.equal(native.status, 303);
  assert.equal(native.headers.get('location'), '/dziekujemy/');
});
test('native error response preserves values and escapes HTML', async () => {
  const response = await handleContact(
    request({ message: '<script>alert("x")</script>' }, false),
    'ip',
    { config: {} },
  );
  const html = await response.text();
  assert.equal(response.status, 503);
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes(valid.email));
  assert.ok(!html.includes('<script>alert'));
});
test('limits oversized requests before calling provider', async () => {
  let called = false;
  const send: typeof fetch = async () => {
    called = true;
    return Response.json({ id: 'ok' });
  };
  const response = await handleContact(
    request({ message: 'a'.repeat(17000) }),
    'ip',
    { config, send },
  );
  assert.equal(response.status, 413);
  assert.equal(called, false);
});
test('rate limit stops repeated valid requests and preserves native data', async () => {
  const limit = createRateLimiter(2);
  assert.equal(limit('a'), true);
  assert.equal(limit('a'), true);
  assert.equal(limit('a'), false);
  assert.equal(limit('b'), true);
  const response = await handleContact(request({}, false), 'ip', {
    config,
    rateLimit: () => false,
  });
  assert.equal(response.status, 429);
  assert.ok((await response.text()).includes(valid.email));
});
