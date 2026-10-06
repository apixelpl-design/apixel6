import assert from 'node:assert/strict';
import { test } from 'node:test';
import { campaignParams } from '../src/scripts/analytics-params.ts';
import { initAnalytics, track } from '../src/scripts/analytics.ts';

test('campaign measurement accepts campaign codes and excludes unrelated or unsafe URL data', () => {
  assert.deepEqual(
    campaignParams(
      '?utm_source=google&utm_medium=cpc&utm_campaign=strony_warszawa&email=test@example.com&message=private&gclid=secret',
    ),
    {
      campaign_source: 'google',
      campaign_medium: 'cpc',
      campaign_name: 'strony_warszawa',
    },
  );
  assert.deepEqual(
    campaignParams(
      `?utm_campaign=test%40example.com&utm_source=${'a'.repeat(81)}&utm_term=private`,
    ),
    {},
  );
});

test('analytics requires consent, records no contact values, and stops after withdrawal', () => {
  class Control {
    hidden = true;
    listeners = new Map<string, () => void>();
    addEventListener(name: string, callback: () => void) {
      this.listeners.set(name, callback);
    }
    querySelector() {
      return { focus() {} };
    }
    click() {
      this.listeners.get('click')?.();
    }
  }
  const panel = new Control();
  const accept = new Control();
  const decline = new Control();
  const settings = new Control();
  const scripts: unknown[] = [];
  const storage = new Map<string, string>();
  const analyticsWindow: {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  } = {};
  let reloads = 0;
  const fakeDocument = {
    title: 'Kontakt | APIXEL',
    referrer: 'https://example.com/private?email=test@example.com',
    cookie: '_ga=old',
    querySelector: (selector: string) =>
      ({
        '[data-consent-panel]': panel,
        '[data-consent-accept]': accept,
        '[data-consent-decline]': decline,
      })[selector],
    querySelectorAll: () => [settings],
    createElement: () => ({}),
    head: { append: (script: unknown) => scripts.push(script) },
    addEventListener() {},
  };
  const originals = new Map(
    ['window', 'document', 'localStorage', 'location'].map((key) => [
      key,
      Object.getOwnPropertyDescriptor(globalThis, key),
    ]),
  );
  Object.defineProperties(globalThis, {
    window: { configurable: true, value: analyticsWindow },
    document: { configurable: true, value: fakeDocument },
    localStorage: {
      configurable: true,
      value: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
      },
    },
    location: {
      configurable: true,
      value: {
        origin: 'https://www.apixel.pl',
        pathname: '/kontakt/',
        hostname: 'www.apixel.pl',
        search: '?email=test@example.com&utm_source=google',
        reload: () => reloads++,
      },
    },
  });
  try {
    initAnalytics('invalid');
    assert.equal(scripts.length, 0);
    initAnalytics('G-TEST123');
    assert.equal(panel.hidden, false);
    track('form_start');
    assert.equal(scripts.length, 0);
    decline.click();
    assert.equal(storage.get('apixel-analytics-consent'), 'declined');
    assert.equal(scripts.length, 0);
    settings.click();
    assert.equal(panel.hidden, false);
    accept.click();
    assert.equal(scripts.length, 1);
    assert.equal(panel.hidden, true);
    const config = analyticsWindow.dataLayer?.find(
      (args) => args[0] === 'config',
    )?.[2] as Record<string, unknown>;
    assert.equal(config.page_location, 'https://www.apixel.pl/kontakt/');
    assert.equal(config.send_page_view, false);
    assert.equal(config.campaign_source, 'google');
    const page = analyticsWindow.dataLayer?.find(
      (args) => args[1] === 'page_view',
    )?.[2] as Record<string, unknown>;
    assert.equal(page.page_referrer, 'https://example.com');
    assert.doesNotMatch(
      JSON.stringify(analyticsWindow.dataLayer),
      /test@example|private/,
    );
    track('generate_lead', { service: 'strona-seo' });
    assert.ok(
      analyticsWindow.dataLayer?.some((args) => args[1] === 'generate_lead'),
    );
    const count = analyticsWindow.dataLayer!.length;
    decline.click();
    track('generate_lead');
    assert.equal(analyticsWindow.dataLayer!.length, count);
    assert.equal(reloads, 1);
  } finally {
    for (const [key, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  }
});
