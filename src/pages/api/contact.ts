import type { APIRoute } from 'astro';
import { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } from 'astro:env/server';
import { handleContact, createRateLimiter } from '../../lib/contact';
import { contact, site } from '../../data/site';
export const prerender = false;
const rateLimit = createRateLimiter();
export const ALL: APIRoute = ({ request, clientAddress }) =>
  contact.formEnabled
    ? handleContact(request, clientAddress, {
        rateLimit,
        config: {
          apiKey: RESEND_API_KEY,
          from: CONTACT_FROM,
          to: CONTACT_TO || site.email,
        },
      })
    : new Response(null, { status: 404 });
