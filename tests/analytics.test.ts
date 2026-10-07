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
  const documentListeners = new Map<
    string,
    (event: { target: Control }) => void
  >();
  class Control {
    hidden = true;
    selector: string;
    constructor(selector: string) {
      this.selector = selector;
    }
    closest(selector: string) {
      return selector === this.selector ? this : null;
    }
    querySelector() {
      return { focus() {} };
    }
    click() {
      documentListeners.get('click')?.({ target: this });
    }
  }
  const panel = new Control('[data-consent-panel]');
  const accept = new Control('[data-consent-accept]');
  const decline = new Control('[data-consent-decline]');
  const settings = new Control('[data-analytics-settings]');
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
    createElement: () => ({}),
    head: { append: (script: unknown) => scripts.push(script) },
    addEventListener: (
      name: string,
      callback: (event: { target: Control }) => void,
    ) => documentListeners.set(name, callback),
  };
  const fakeLocation = {
    origin: 'https://www.apixel.pl',
    pathname: '/kontakt/',
    hostname: 'www.apixel.pl',
    search: '?email=test@example.com&utm_source=google',
    reload: () => reloads++,
  };
  const originals = new Map(
    ['window', 'document', 'localStorage', 'location', 'Element'].map((key) => [
      key,
      Object.getOwnPropertyDescriptor(globalThis, key),
    ]),
  );
  Object.defineProperties(globalThis, {
    Element: { configurable: true, value: Control },
    window: { configurable: true, value: analyticsWindow },
    document: { configurable: true, value: fakeDocument },
    localStorage: {
      configurable: true,
      value: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
      },
    },
    location: { configurable: true, value: fakeLocation },
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
    fakeLocation.pathname = '/poradnik/';
    fakeLocation.search = '?email=another@example.com';
    fakeDocument.title = 'Poradnik | APIXEL';
    documentListeners.get('astro:page-load')?.({ target: panel });
    const pageViews = analyticsWindow.dataLayer?.filter(
      (args) => args[1] === 'page_view',
    );
    assert.equal(pageViews?.length, 2);
    assert.deepEqual(pageViews?.[1]?.[2], {
      page_location: 'https://www.apixel.pl/poradnik/',
      page_title: 'Poradnik | APIXEL',
      page_referrer: 'https://www.apixel.pl/kontakt/',
    });
    assert.doesNotMatch(JSON.stringify(analyticsWindow.dataLayer), /@example/);
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
