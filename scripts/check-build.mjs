import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { assertContentVisibility } from './visibility-check.mjs';

const root = path.resolve('.vercel/output/static');
const origin = 'https://www.apixel.pl';
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? walk(path.join(directory, entry.name))
          : path.join(directory, entry.name),
      ),
    )
  ).flat();
}
function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1];
}
function meta(html, name, key = 'name') {
  return html
    .match(/<meta\b[^>]*>/gi)
    ?.find((tag) => attribute(tag, key) === name);
}
const files = await walk(root);
const pages = new Map();
for (const file of files.filter((file) => file.endsWith('.html'))) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  const route =
    relative === '404.html'
      ? '/404/'
      : relative === 'index.html'
        ? '/'
        : relative.endsWith('/index.html')
          ? `/${relative.slice(0, -10)}`
          : `/${relative}`;
  pages.set(route, await readFile(file, 'utf8'));
}
assert.equal(
  pages.size,
  24,
  'Expected 24 public HTML pages; review this count when adding pages.',
);
const titles = new Set();
const indexable = [];
for (const [route, html] of pages) {
  assert.match(html, /<html lang="pl"/i, `${route}: Polish document language`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: one H1`);
  assert.equal(
    (html.match(/<main\b/g) ?? []).length,
    1,
    `${route}: one main landmark`,
  );
  assert.ok(
    attribute(meta(html, 'description') ?? '', 'content')?.length > 30,
    `${route}: description`,
  );
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title && !titles.has(title), `${route}: unique title`);
  titles.add(title);
  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*>/i)?.[0];
  assert.equal(
    attribute(canonical ?? '', 'href'),
    `${origin}${route}`,
    `${route}: canonical`,
  );
  assert.equal(
    attribute(meta(html, 'og:url', 'property') ?? '', 'content'),
    `${origin}${route}`,
    `${route}: OG URL`,
  );
  const schemas = html.match(
    /<script type="application\/ld\+json">(.*?)<\/script>/s,
  )?.[1];
  const schema = JSON.parse(schemas ?? 'null');
  assert.ok(
    Array.isArray(schema) &&
      schema.some((item) => item['@type'] === 'Organization'),
    `${route}: valid organization JSON-LD`,
  );
  if (route.startsWith('/poradnik/') && route !== '/poradnik/')
    assert.ok(
      schema.some((item) => item['@type'] === 'Article'),
      `${route}: article JSON-LD`,
    );
  assert.doesNotMatch(
    html,
    /<astro-island\b/,
    `${route}: no hydrated React pages`,
  );
  assert.doesNotMatch(
    html,
    /\bstyle="[^"]*\bopacity\s*:\s*0(?:\.0+)?%?\s*(?:!important\s*)?(?:;|")/i,
    `${route}: primary content has no inline opacity:0 gate`,
  );
  const noindex = attribute(meta(html, 'robots') ?? '', 'content')?.includes(
    'noindex',
  );
  if (!noindex) indexable.push(`${origin}${route}`);
  for (const tag of html.match(/<(?:a|img|script|link)\b[^>]*>/gi) ?? []) {
    const value = attribute(tag, 'href') ?? attribute(tag, 'src');
    if (
      !value ||
      value.startsWith('mailto:') ||
      value.startsWith('tel:') ||
      value.startsWith('data:')
    )
      continue;
    const url = new URL(value.replace(/&amp;/g, '&'), `${origin}${route}`);
    if (url.origin !== origin) continue;
    if (pages.has(url.pathname)) {
      if (url.hash)
        assert.ok(
          pages
            .get(url.pathname)
            .includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
          `${route}: missing anchor ${value}`,
        );
    } else {
      assert.ok(!url.pathname.endsWith('/'), `${route}: missing page ${value}`);
      await stat(path.join(root, url.pathname)).catch(() =>
        assert.fail(`${route}: missing asset ${value}`),
      );
    }
  }
}
const sitemap = await readFile(path.join(root, 'sitemap-0.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);
assert.deepEqual(
  locations.sort(),
  indexable.sort(),
  'Sitemap matches all and only indexable pages.',
);
assert.doesNotMatch(sitemap, /dziekujemy|\/api\/|404/);
assert.match(
  await readFile(path.join(root, 'robots.txt'), 'utf8'),
  /Sitemap: https:\/\/www\.apixel\.pl\/sitemap-index\.xml/,
);
assert.ok(
  pages.get('/kontakt/').includes('data-contact-section'),
  'Contact page uses the shared contact section.',
);
await stat('.vercel/output/functions/_render.func/.vc-config.json');
const initialSlides =
  (pages.get('/') ?? '').match(/<article\b[^>]*\bdata-project-slide[^>]*>/g) ??
  [];
const initialActive = initialSlides.filter(
  (tag) => attribute(tag, 'data-active') === 'true',
);
assert.equal(
  initialActive.length,
  1,
  'One carousel project is visible without JavaScript.',
);
assert.notEqual(attribute(initialActive[0], 'aria-hidden'), 'true');
assert.doesNotMatch(
  initialActive[0],
  /\binert(?:[=>\s])/,
  'Initial project is interactive without JavaScript.',
);
const routing = JSON.parse(
  await readFile('.vercel/output/config.json', 'utf8'),
);
for (const pathname of ['/uslugi', '/uslugi/']) {
  const firstMatch = routing.routes.find(
    (route) => route.src && new RegExp(route.src).test(pathname),
  );
  assert.equal(
    firstMatch?.status,
    301,
    `${pathname}: direct permanent redirect`,
  );
  assert.equal(
    firstMatch?.headers?.Location,
    '/uslugi/strona/',
    `${pathname}: redirect precedes slash normalization and fallback`,
  );
}
const css = (
  await Promise.all(
    files
      .filter((file) => file.endsWith('.css'))
      .map((file) => readFile(file, 'utf8')),
  )
).join('');
assertContentVisibility(css);
const js = files.filter((file) => file.endsWith('.js'));
const compressedBytes = (
  await Promise.all(
    js.map(async (file) => gzipSync(await readFile(file)).byteLength),
  )
).reduce((sum, size) => sum + size, 0);
console.log(
  `Verified ${pages.size} pages, ${indexable.length} indexable URLs, internal links, JSON-LD, contact endpoint, legacy redirects and sitemap.`,
);
console.log(
  `Client JavaScript: ${js.length} files, ${compressedBytes} bytes total gzip (excluding optional Google Analytics).`,
);
