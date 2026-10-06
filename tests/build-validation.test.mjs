import test from 'node:test';
import assert from 'node:assert/strict';
import { prioritizeStaticRedirects } from '../scripts/vercel-static-redirects.mjs';
import { assertContentVisibility } from '../scripts/visibility-check.mjs';

const redirects = {
  '/uslugi/': { status: 301, destination: '/uslugi/strona/' },
};
const adapterOutput = {
  version: 3,
  routes: [
    {
      src: '^/((?:[^/]+/)*[^/\\.]+)$',
      headers: { Location: '/$1/' },
      status: 308,
    },
    { src: '^/uslugi$', headers: { Location: '/uslugi/strona/' }, status: 301 },
    { handle: 'filesystem' },
    { src: '^/.*$', dest: '/404.html', status: 404 },
  ],
};

test('legacy service routes redirect before normalization for both slash variants', () => {
  const output = prioritizeStaticRedirects(adapterOutput, redirects);
  for (const pathname of ['/uslugi', '/uslugi/']) {
    const first = output.routes.find(
      (route) => route.src && new RegExp(route.src).test(pathname),
    );
    assert.deepEqual(first, {
      src: '^/uslugi/?$',
      headers: { Location: '/uslugi/strona/' },
      status: 301,
    });
  }
  assert.equal(
    output.routes.filter(
      (route) => route.headers?.Location === '/uslugi/strona/',
    ).length,
    1,
  );
  assert.ok(!new RegExp(output.routes[0].src).test('/uslugi/strona/'));
  assert.ok(!new RegExp(output.routes[0].src).test('/uslugina/'));
  assert.deepEqual(prioritizeStaticRedirects(output, redirects), output);
  assert.equal(adapterOutput.routes[0].status, 308, 'input is not mutated');
});

test('visible default content and native interaction states pass CSS validation', () => {
  assert.doesNotThrow(() =>
    assertContentVisibility(`
    main { opacity:1 }
    .project-carousel-slide[data-astro-cid-example] { opacity:0 }
    .project-carousel-slide[data-astro-cid-example][data-active="true"] { opacity:1; visibility:visible }
    @supports (interpolate-size:allow-keywords) {
      .faq-item::details-content { opacity:0 }
      .faq-item[open]::details-content { opacity:1 }
    }
    .mobile-nav[open] .menu-line--middle { opacity:0 }
  `),
  );
});

test('CSS validation rejects hidden primary content and broad exception selectors', () => {
  for (const css of [
    'main{opacity:0}',
    '@media(max-width:700px){.offer-features{opacity:0!important}}',
    '.faq-item::details-content, main{opacity:0}',
    '.project-carousel-slide h3{opacity:0}',
    '[data-motion="ready"]{opacity:0.0}',
  ])
    assert.throws(() => assertContentVisibility(css), /unexpected opacity:0/);
});

test('hidden interaction content requires a readable active state', () => {
  assert.throws(
    () => assertContentVisibility('.project-carousel-slide{opacity:0}'),
    /active carousel/,
  );
  assert.throws(
    () => assertContentVisibility('.faq-item::details-content{opacity:0}'),
    /open FAQ/,
  );
  assert.throws(
    () =>
      assertContentVisibility(
        '.project-carousel-slide{opacity:0;visibility:hidden}.project-carousel-slide[data-active="true"]{opacity:1}',
      ),
    /active carousel/,
  );
});
