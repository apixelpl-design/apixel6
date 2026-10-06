import { siteMotion } from '../data/motion';

// Shared component groups keep the movement consistent across every page.
// Everything is readable by default; animation never gates access to content.
const revealSelectors = [
  '[data-motion="reveal"]',
  'main h1',
  '.home-hero .lead',
  '.home-hero .actions',
  '.hero-meta',
  '.hero-project',
  '.page-hero .eyebrow',
  '.page-hero .lead',
  '.page-hero .actions',
  '.page-hero .article-meta',
  '.portfolio-intro-copy',
  '.hero-route',
  '.portfolio-jumps',
  '.section-heading',
  '.home-compact-heading',
  '.single-offer-heading',
  '.other-heading',
  '.showcase-heading',
  '.split > div:not(.faq-list)',
  '.price-card',
  '.service-card',
  '.scope-item',
  '.article-card',
  '.portfolio-tile',
  '.project-card',
  '.offer-price-content',
  '.offer-features > li',
  '.offer-delivery',
  '.seo-addon',
  '.portfolio-shortcut',
  '.scope-links',
  '.home-process-steps > li > div',
  '.steps > li',
  '.showcase-main',
  '.showcase-next',
  '.portfolio-metrics',
  '.case-visuals',
  '.case-section',
  '.case-goal',
  '.case-next-step',
  '.faq-item',
  '.contact-intro',
  '.contact-details--section',
  '.article-content > h2',
  '.article-aside',
  '.article-price-answer',
  '.article-editorial',
  '.privacy-content > h2',
  '.footer-top > div',
];

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const active = new Map<HTMLElement, Animation>();
let observer: IntersectionObserver | null = null;
let lifecycleReady = false;

const finishActive = () => {
  active.forEach((animation) => animation.cancel());
  active.clear();
};

const updatePreference = () => {
  document.documentElement.dataset.motionMode = reduced.matches
    ? 'reduced'
    : 'subtle';
  if (reduced.matches) finishActive();
};

export function initSiteMotion() {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  observer?.disconnect();
  finishActive();
  const mobile = window.matchMedia('(max-width: 700px)');
  const candidates = [
    ...document.querySelectorAll<HTMLElement>(revealSelectors.join(',')),
  ].filter(
    (element) => !element.closest('[data-motion="off"], [data-project-slide]'),
  );
  const candidateSet = new Set(candidates);
  // Reveal a component or its children, never both at the same time.
  const targets = candidates.filter((element) => {
    for (
      let parent = element.parentElement;
      parent;
      parent = parent.parentElement
    ) {
      if (candidateSet.has(parent)) return false;
    }
    return true;
  });

  updatePreference();

  const pageObserver = new IntersectionObserver(
    (entries) => {
      const groups = new Map<Element, number>();
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        pageObserver.unobserve(element);
        element.dataset.motionState = 'revealed';
        if (
          reduced.matches ||
          document.hidden ||
          element.contains(document.activeElement)
        )
          return;

        const group =
          element.closest(
            '.pricing-grid, .offer-features, .service-cards, .article-grid, .portfolio-grid, .footer-top',
          ) ?? element.parentElement!;
        const order = groups.get(group) ?? 0;
        groups.set(group, order + 1);
        const isHero = element.matches(
          'h1, .single-offer-heading, .portfolio-intro-copy, .hero-route, .hero-project, .home-hero .lead, .home-hero .actions, .hero-meta, .page-hero .eyebrow, .page-hero .lead, .page-hero .actions',
        );
        const distance = mobile.matches
          ? siteMotion.mobileDistancePx
          : siteMotion.distancePx;
        const animation = element.animate(
          [
            {
              opacity: siteMotion.startOpacity,
              transform: `translate3d(0, ${distance}px, 0)`,
            },
            { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          ],
          {
            duration: isHero ? siteMotion.heroMs : siteMotion.revealMs,
            delay: Math.min(
              order * siteMotion.staggerMs,
              siteMotion.maxStaggerMs,
            ),
            easing: siteMotion.easing,
            fill: 'backwards',
          },
        );
        active.set(element, animation);
        const cleanup = () => active.delete(element);
        animation.addEventListener('finish', cleanup, { once: true });
        animation.addEventListener('cancel', cleanup, { once: true });
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
  );
  observer = pageObserver;
  targets.forEach((element) => {
    element.dataset.motionState = 'ready';
    pageObserver.observe(element);
  });
  if (!lifecycleReady) {
    lifecycleReady = true;
    reduced.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) finishActive();
    });
    // Keyboard focus should land on a still, fully readable control.
    document.addEventListener('focusin', (event) => {
      active.forEach((animation, element) => {
        if (element.contains(event.target as Node)) {
          animation.cancel();
          active.delete(element);
        }
      });
    });
    window.addEventListener('pagehide', finishActive);
    document.addEventListener('astro:after-swap', initSiteMotion);
  }
}
