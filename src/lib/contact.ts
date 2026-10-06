import { site } from '../data/site.ts';
import { serviceLabels } from '../data/services.ts';
export { serviceLabels };
export interface ContactData {
  name: string;
  email: string;
  phone: string;
  website: string;
  message: string;
  service: string;
  requestId: string;
}
export type FieldErrors = Partial<Record<keyof ContactData, string>>;
export function validateContact(form: FormData): {
  data: ContactData;
  errors: FieldErrors;
} {
  const read = (key: string) => {
    const value = form.get(key);
    return typeof value === 'string' ? value.trim() : '';
  };
  const data: ContactData = {
    name: read('name'),
    email: read('email'),
    phone: read('phone'),
    website: read('website'),
    message: read('message'),
    service: read('service') || 'strona-seo',
    requestId: read('requestId'),
  };
  const errors: FieldErrors = {};
  if (data.name.length < 2 || data.name.length > 80 || /[\r\n]/.test(data.name))
    errors.name = 'Podaj imię (od 2 do 80 znaków).';
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Podaj poprawny adres e-mail.';
  if (data.message.length < 10 || data.message.length > 4000)
    errors.message = 'Opisz potrzebę w 10–4000 znakach.';
  if (
    data.phone &&
    (!/^[+\d\s()\-]{7,30}$/.test(data.phone) ||
      data.phone.replace(/\D/g, '').length < 7 ||
      data.phone.replace(/\D/g, '').length > 15)
  )
    errors.phone = 'Podaj poprawny numer telefonu lub pozostaw pole puste.';
  if (data.website) {
    try {
      const url = new URL(
        /^https?:\/\//i.test(data.website)
          ? data.website
          : `https://${data.website}`,
      );
      if (
        !['http:', 'https:'].includes(url.protocol) ||
        !url.hostname.includes('.') ||
        url.username ||
        url.password ||
        data.website.length > 300 ||
        /\s/.test(data.website)
      )
        throw new Error();
      data.website = url.href;
    } catch {
      errors.website =
        'Podaj adres strony, np. twojafirma.pl, lub pozostaw pole puste.';
    }
  }
  if (!Object.hasOwn(serviceLabels, data.service)) data.service = 'strona-seo';
  if (
    data.requestId &&
    !/^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i.test(
      data.requestId,
    )
  )
    errors.requestId = 'Odśwież stronę i spróbuj ponownie.';
  return { data, errors };
}

export interface MailConfig {
  apiKey?: string;
  from?: string;
  to?: string;
}
interface ContactDependencies {
  config: MailConfig;
  send?: typeof fetch;
  rateLimit?: (key: string) => boolean;
  id?: () => string;
}
const headers = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};
const unavailable = `Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na ${site.email} albo zadzwoń: ${site.phone}.`;
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ]!,
  );

// Preserve native form values on errors; JavaScript is an enhancement, not a requirement.
function result(
  request: Request,
  status: number,
  message: string,
  data?: ContactData,
  fields?: FieldErrors,
): Response {
  if (request.headers.get('accept')?.includes('application/json'))
    return Response.json(
      { ok: status === 200, message, ...(fields ? { fields } : {}) },
      { status, headers },
    );
  if (status === 200)
    return new Response(null, {
      status: 303,
      headers: { ...headers, Location: '/dziekujemy/' },
    });
  const input = (
    name: keyof ContactData,
    label: string,
    type = 'text',
    required = false,
  ) =>
    `<label>${label}<input name="${name}" type="${type}" value="${escapeHtml(data?.[name] || '')}" ${required ? 'required' : ''} maxlength="${name === 'email' ? 254 : name === 'name' ? 80 : name === 'phone' ? 30 : 300}"${fields?.[name] ? ' aria-invalid="true"' : ''}></label>${fields?.[name] ? `<p class="error">${escapeHtml(fields[name]!)}</p>` : ''}`;
  return new Response(
    `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Twoje zapytanie | APIXEL</title><style>body{font:16px/1.7 system-ui;max-width:650px;margin:40px auto;padding:0 22px;color:#222}label{display:block;margin-top:18px}input,textarea{display:block;box-sizing:border-box;width:100%;padding:12px;font:inherit;border:1px solid #888}button{margin-top:20px;background:#d22828;color:white;padding:14px 25px;font:inherit;border:0}a{color:#a91d1d}.error{color:#961919}</style></head><body><a href="/kontakt/">← Kontakt APIXEL</a><h1>Sprawdź swoje zapytanie</h1><p role="alert">${escapeHtml(message)}</p><form method="post" action="/api/contact/"><input type="hidden" name="service" value="${escapeHtml(data?.service || 'strona-seo')}"><input type="hidden" name="requestId" value="${escapeHtml(data?.requestId || '')}">${input('name', 'Imię *', 'text', true)}${input('email', 'E-mail *', 'email', true)}${input('phone', 'Telefon — opcjonalnie', 'tel')}${input('website', 'Obecna strona — opcjonalnie')}<label>Opis potrzeby *<textarea name="message" rows="5" required minlength="10" maxlength="4000">${escapeHtml(data?.message || '')}</textarea></label>${fields?.message ? `<p class="error">${escapeHtml(fields.message)}</p>` : ''}<p>Dane wykorzystamy do odpowiedzi na zapytanie. <a href="/polityka-prywatnosci/">Polityka prywatności</a>.</p><button type="submit">Wyślij ponownie</button></form><p>Możesz też <a href="${escapeHtml(site.phoneHref)}">zadzwonić: ${escapeHtml(site.phone)}</a> lub <a href="${escapeHtml(site.emailHref)}">napisać e-mail</a>.</p></body></html>`,
    {
      status,
      headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' },
    },
  );
}

async function limitedBody(
  request: Request,
  maxBytes = 16000,
): Promise<Uint8Array<ArrayBuffer>> {
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw new Error('too_large');
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

export async function handleContact(
  request: Request,
  ip: string,
  dependencies: ContactDependencies,
): Promise<Response> {
  if (request.method !== 'POST')
    return new Response('Method not allowed', {
      status: 405,
      headers: { ...headers, Allow: 'POST' },
    });
  const origin = request.headers.get('origin');
  if (origin !== new URL(request.url).origin)
    return result(
      request,
      403,
      'Wyślij formularz bezpośrednio ze strony APIXEL.',
    );
  let form: FormData;
  try {
    const bytes = await limitedBody(request);
    form = await new Response(bytes, {
      headers: { 'Content-Type': request.headers.get('content-type') || '' },
    }).formData();
  } catch (error) {
    return result(
      request,
      error instanceof Error && error.message === 'too_large' ? 413 : 400,
      'Nie udało się odczytać formularza. Sprawdź dane i spróbuj ponownie.',
    );
  }
  if (form.get('company_url'))
    return result(request, 400, 'Sprawdź formularz i spróbuj ponownie.');
  const { data, errors } = validateContact(form);
  if (Object.keys(errors).length)
    return result(
      request,
      400,
      'Sprawdź zaznaczone pola. Twoje dane pozostają w formularzu.',
      data,
      errors,
    );
  if (dependencies.rateLimit && !dependencies.rateLimit(ip))
    return result(
      request,
      429,
      'Zbyt wiele prób wysłania. Odczekaj chwilę lub skontaktuj się telefonicznie.',
      data,
    );
  const { apiKey, from, to } = dependencies.config;
  if (!apiKey || !from || !to) return result(request, 503, unavailable, data);
  try {
    const send = dependencies.send ?? fetch;
    const response = await send('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `contact-${data.requestId || (dependencies.id ?? (() => crypto.randomUUID()))()}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Zapytanie APIXEL: ${serviceLabels[data.service]}`,
        text: `Usługa: ${serviceLabels[data.service]}\nImię: ${data.name}\nE-mail: ${data.email}\nTelefon: ${data.phone || 'Nie podano'}\nStrona: ${data.website || 'Nie podano'}\n\nOpis potrzeby:\n${data.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return result(request, 502, unavailable, data);
    const receipt = (await response.json()) as { id?: unknown };
    if (typeof receipt.id !== 'string' || !receipt.id)
      return result(request, 502, unavailable, data);
    return result(
      request,
      200,
      'Otrzymaliśmy Twoje zapytanie. Odezwiemy się w sprawie kolejnych kroków.',
    );
  } catch {
    return result(request, 502, unavailable, data);
  }
}

// Per-instance protection. Configure Vercel Firewall for a distributed production limit.
export function createRateLimiter(limit = 6, interval = 60000) {
  const attempts = new Map<string, { count: number; expires: number }>();
  return (key: string) => {
    const now = Date.now();
    if (attempts.size > 2000)
      for (const [ip, attempt] of attempts)
        if (attempt.expires <= now) attempts.delete(ip);
    const previous = attempts.get(key);
    if (!previous || previous.expires <= now) {
      if (attempts.size >= 5000) return false;
      attempts.set(key, { count: 1, expires: now + interval });
      return true;
    }
    if (previous.count >= limit) return false;
    previous.count += 1;
    return true;
  };
}
