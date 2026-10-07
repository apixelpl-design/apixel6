import { campaignParams } from './analytics-params.ts';

type AnalyticsParams = Record<string, string | number>;
interface AnalyticsWindow extends Window {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
}

let allowed = false;
let loaded = false;
let listenersReady = false;
let activeMeasurementId = '';
let lastPageViewKey = '';
let lastPagePath = '';

export function track(name: string, params: AnalyticsParams = {}) {
  if (!allowed) return;
  (window as AnalyticsWindow).gtag?.('event', name, params);
}

function consentValue() {
  try {
    return localStorage.getItem('apixel-analytics-consent');
  } catch {
    return null;
  }
}

function saveConsent(value: string) {
  try {
    localStorage.setItem('apixel-analytics-consent', value);
  } catch {
    /* Analytics stays session-only if storage is unavailable. */
  }
}

function syncConsentPanel() {
  const panel = document.querySelector<HTMLElement>('[data-consent-panel]');
  const consent = consentValue();
  if (consent === 'accepted') {
    if (panel) panel.hidden = true;
    startAnalytics();
  } else if (consent === 'declined') {
    if (panel) panel.hidden = true;
    allowed = false;
  } else if (panel) {
    panel.hidden = false;
  }
}

function startAnalytics() {
  if (!activeMeasurementId) return;
  allowed = true;
  const analyticsWindow = window as AnalyticsWindow;
  if (!loaded) {
    loaded = true;
    analyticsWindow.dataLayer = [];
    analyticsWindow.gtag = (...args) => analyticsWindow.dataLayer!.push(args);
    analyticsWindow.gtag('js', new Date());
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${activeMeasurementId}`;
    script.async = true;
    document.head.append(script);
  }

  const pageKey = `${location.pathname}${location.search}`;
  if (pageKey === lastPageViewKey) return;
  const pageLocation = `${location.origin}${location.pathname}`;
  analyticsWindow.gtag?.('config', activeMeasurementId, {
    send_page_view: false,
    page_location: pageLocation,
    page_title: document.title,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ...campaignParams(location.search),
  });
  analyticsWindow.gtag?.('event', 'page_view', {
    page_location: pageLocation,
    page_title: document.title,
    page_referrer: lastPagePath
      ? `${location.origin}${lastPagePath}`
      : document.referrer
        ? new URL(document.referrer).origin
        : '',
  });
  lastPageViewKey = pageKey;
  lastPagePath = location.pathname;
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.closest('[data-consent-accept]')) {
    saveConsent('accepted');
    syncConsentPanel();
  } else if (target.closest('[data-consent-decline]')) {
    const previouslyAllowed = allowed;
    allowed = false;
    saveConsent('declined');
    syncConsentPanel();
    if (previouslyAllowed) {
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.trim().split('=')[0];
        if (name.startsWith('_ga')) {
          for (const domain of ['', location.hostname, '.apixel.pl'])
            document.cookie = `${name}=; Max-Age=0; Path=/${domain ? `; Domain=${domain}` : ''}`;
        }
      }
      location.reload();
    }
  } else if (target.closest('[data-analytics-settings]')) {
    const panel = document.querySelector<HTMLElement>('[data-consent-panel]');
    if (panel) {
      panel.hidden = false;
      panel.querySelector<HTMLButtonElement>('button')?.focus();
    }
  }

  const link = target.closest<HTMLAnchorElement>('a');
  if (!link) return;
  if (link.dataset.cta)
    track('cta_click', {
      placement: link.dataset.cta,
      destination: new URL(link.href).pathname,
    });
  if (link.href.startsWith('tel:')) track('phone_click');
  if (link.href.startsWith('mailto:')) track('email_click');
}

export function initAnalytics(measurementId: string) {
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;
  activeMeasurementId = measurementId;
  if (!listenersReady) {
    listenersReady = true;
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('astro:page-load', syncConsentPanel);
  }
  syncConsentPanel();
}
