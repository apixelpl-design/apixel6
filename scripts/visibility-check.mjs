import assert from 'node:assert/strict';

const intentionalZeroOpacity = new Set([
  '.project-carousel-slide',
  '.faq-item::details-content',
  '.mobile-nav[open] .menu-line--middle',
  '.page-transition-progress',
  'html[data-route-loading=done] .page-transition-progress',
]);

function normalizeSelector(selector) {
  return selector
    .replace(/\[data-astro-cid-[^\]]+\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Leaf rules work across nested @media/@supports without discarding whole groups.
// Every selector sharing a declaration must be allowed; ".faq-item, main" fails.
export function assertContentVisibility(css) {
  const rules = [
    ...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]*)\}/g),
  ];
  const isZero =
    /(?:^|;)\s*opacity\s*:\s*0(?:\.0+)?%?\s*(?:!important\s*)?(?:;|$)/i;
  const hidesCarousel = rules.some(
    ([, selectors, declarations]) =>
      isZero.test(declarations) &&
      selectors
        .split(',')
        .some(
          (selector) =>
            normalizeSelector(selector) === '.project-carousel-slide',
        ),
  );
  const hidesDisclosure = rules.some(
    ([, selectors, declarations]) =>
      isZero.test(declarations) &&
      selectors
        .split(',')
        .some(
          (selector) =>
            normalizeSelector(selector) === '.faq-item::details-content',
        ),
  );

  for (const [, selectors, declarations] of rules) {
    if (!isZero.test(declarations)) continue;
    for (const selector of selectors.split(',')) {
      const normalized = normalizeSelector(selector);
      if (/^(?:from|to|\d+(?:\.\d+)?%)$/i.test(normalized)) continue;
      assert.ok(
        intentionalZeroOpacity.has(normalized),
        `Content is not hidden until animation runs: unexpected opacity:0 on ${normalized}`,
      );
    }
  }

  const hasVisibleState = (selector, checkVisibility = false) =>
    rules.some(
      ([, selectors, declarations]) =>
        selectors
          .split(',')
          .some(
            (candidate) =>
              normalizeSelector(candidate).replace(/['"]/g, '') === selector,
          ) &&
        /(?:^|;)\s*opacity\s*:\s*1\s*(?:!important\s*)?(?:;|$)/i.test(
          declarations,
        ) &&
        (!checkVisibility ||
          /(?:^|;)\s*visibility\s*:\s*visible\s*(?:!important\s*)?(?:;|$)/i.test(
            declarations,
          )),
    );
  if (hidesCarousel)
    assert.ok(
      hasVisibleState('.project-carousel-slide[data-active=true]', true),
      'The active carousel slide must be visible without JavaScript.',
    );
  if (hidesDisclosure)
    assert.ok(
      hasVisibleState('.faq-item[open]::details-content'),
      'An open FAQ disclosure must have a visible CSS state.',
    );
}
