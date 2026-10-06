const phoneNumber = '+48798343712';
const address = {
  street: 'Karmelicka 17a',
  postalCode: '00-168',
  city: 'Warszawa',
  country: 'PL',
};
const area = 'Warszawa i okolice';
const email = 'kontakt@apixel.pl';

export const site = {
  name: 'APIXEL',
  url: 'https://www.apixel.pl',
  email,
  emailHref: `mailto:${email}`,
  phoneNumber,
  phone: phoneNumber.replace(/^\+48(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3'),
  phoneHref: `tel:${phoneNumber}`,
  address,
  addressText: `${address.street}, ${address.postalCode} ${address.city}`,
  area,
  areaText: `${area} · współpraca zdalna`,
  socialLinks: [
    { label: 'Instagram', href: 'https://www.instagram.com/apixel.pl/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/apixel-pl' },
  ],
  sharingImage: '/og-image.png',
  sharingDescription:
    'APIXEL — strony internetowe i rozwój widoczności w Google',
  logo: '/brand-logo.png',
  logoWidth: 386,
  logoHeight: 144,
  footerDescription:
    'Projektujemy i wdrażamy strony dla firm. Dbamy o ich pozycjonowanie oraz stały rozwój.',
};

const contactHeading = {
  lead: 'Porozmawiajmy',
  accent: 'o Twojej stronie.',
};

export const contact = {
  formEnabled: false,
  heading: contactHeading,
  title: `${contactHeading.lead} ${contactHeading.accent}`,
  description:
    'Zadzwoń lub napisz e-mail. Opisz swoją firmę, potrzebne funkcje i obecną stronę, jeśli ją masz. Ustalimy zakres i przygotujemy wycenę.',
  formDescription:
    'Opisz, czym zajmuje się Twoja firma i czego potrzebujesz. Ustalimy zakres i przygotujemy wycenę.',
};

export function contactHref(service = 'strona-seo') {
  return contact.formEnabled
    ? `/kontakt/?usluga=${encodeURIComponent(service)}`
    : '/kontakt/';
}
