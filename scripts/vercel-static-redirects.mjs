import { readFile, writeFile } from 'node:fs/promises';

const escapePattern = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Vercel's Astro adapter puts slash normalization before its generated redirects.
// Exact legacy paths must match with or without a slash before that normalization.
// Source: https://vercel.com/docs/build-output-api/configuration#routes
export function prioritizeStaticRedirects(output, redirects) {
  if (output.version !== 3 || !Array.isArray(output.routes))
    throw new Error(
      'Expected Vercel Build Output API v3 routing configuration.',
    );

  const exact = Object.entries(redirects)
    .filter(([source]) => !source.includes('['))
    .map(([source, redirect]) => {
      const pathname = source.replace(/\/$/, '');
      if (!pathname.startsWith('/') || pathname === '')
        throw new Error(`Invalid static legacy redirect: ${source}`);
      return {
        src: `^${escapePattern(pathname)}/?$`,
        headers: {
          Location:
            typeof redirect === 'string' ? redirect : redirect.destination,
        },
        status: typeof redirect === 'string' ? 301 : redirect.status,
      };
    });

  // Replace equivalent adapter rules to keep this transformation idempotent.
  const sources = new Set(
    exact.flatMap((route) => [
      route.src,
      route.src.replace('/?$', '$'),
      route.src.replace('/?$', '/$'),
    ]),
  );
  return {
    ...output,
    routes: [
      ...exact,
      ...output.routes.filter(
        (route) =>
          !sources.has(route.src) || !route.headers?.Location || route.continue,
      ),
    ],
  };
}

export function vercelStaticRedirects() {
  let root;
  let redirects;
  return {
    name: 'apixel:vercel-static-redirects',
    hooks: {
      'astro:config:done': ({ config }) => {
        root = config.root;
        redirects = config.redirects;
      },
      // Astro runs its adapter before user integrations, so the artifact exists.
      // Keep this integration after the adapter when upgrading integration hooks.
      'astro:build:done': async ({ logger }) => {
        const file = new URL('./.vercel/output/config.json', root);
        const output = JSON.parse(await readFile(file, 'utf8'));
        const updated = prioritizeStaticRedirects(output, redirects);
        await writeFile(file, `${JSON.stringify(updated, null, 2)}\n`);
        logger.info('Prioritized exact legacy redirects in Vercel routing.');
      },
    },
  };
}
