import { campaignParams } from './analytics-params.ts';
type AnalyticsParams = Record<string, string | number>;
interface AnalyticsWindow extends Window {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
}
let allowed = false;
export function track(name: string, params: AnalyticsParams = {}) {
  if (!allowed) return;
  (window as AnalyticsWindow).gtag?.('event', name, params);
}
export function initAnalytics(measurementId: string) {
  if (!/^G-[A-Z0-9]+$/.test(measurementId)) return;
  const panel = document.querySelector<HTMLElement>('[data-consent-panel]');
  const key = 'apixel-analytics-consent';
  const readConsent = () => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };
  const saveConsent = (value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* Analytics stays session-only if storage is unavailable. */
    }
  };
  let loaded = false;
  const start = () => {
    allowed = true;
    if (loaded) return;
    loaded = true;
    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.dataLayer = [];
    analyticsWindow.gtag = (...args) => analyticsWindow.dataLayer!.push(args);
    analyticsWindow.gtag('js', new Date());
    analyticsWindow.gtag('config', measurementId, {
      send_page_view: false,
      page_location: `${location.origin}${location.pathname}`,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ...campaignParams(location.search),
    });
    analyticsWindow.gtag('event', 'page_view', {
      page_location: `${location.origin}${location.pathname}`,
      page_title: document.title,
      page_referrer: document.referrer ? new URL(document.referrer).origin : '',
    });
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.append(script);
  };
  if (readConsent() === 'accepted') start();
  else if (readConsent() !== 'declined' && panel) panel.hidden = false;
  document
    .querySelector('[data-consent-accept]')
    ?.addEventListener('click', () => {
      saveConsent('accepted');
      if (panel) panel.hidden = true;
      start();
    });
  document
    .querySelector('[data-consent-decline]')
    ?.addEventListener('click', () => {
      const previouslyAllowed = allowed;
      allowed = false;
      saveConsent('declined');
      if (panel) panel.hidden = true;
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
    });
  document.querySelectorAll('[data-analytics-settings]').forEach((button) =>
    button.addEventListener('click', () => {
      if (panel) {
        panel.hidden = false;
        panel.querySelector<HTMLButtonElement>('button')?.focus();
      }
    }),
  );
  document.addEventListener('click', (event) => {
    const link = (event.target as Element)?.closest<HTMLAnchorElement>('a');
    if (!link) return;
    if (link.dataset.cta)
      track('cta_click', {
        placement: link.dataset.cta,
        destination: new URL(link.href).pathname,
      });
    if (link.href.startsWith('tel:')) track('phone_click');
    if (link.href.startsWith('mailto:')) track('email_click');
  });
}
