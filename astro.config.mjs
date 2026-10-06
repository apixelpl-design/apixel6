import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.apixel.pl',
  trailingSlash: 'always',
  redirects: {
    '/uslugi/': { status: 301, destination: '/uslugi/strona/' },
  },
  compressHTML: true,
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (url) =>
        !url.includes('/dziekujemy/') &&
        !url.includes('/api/') &&
        !url.includes('/404/') &&
        new URL(url).pathname !== '/uslugi/',
    }),
  ],
  devToolbar: { enabled: false },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      CONTACT_FROM: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      CONTACT_TO: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
});
