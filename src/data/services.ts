import { websiteOffer } from './website-offer.ts';
import { seoOffer } from './seo-offer.ts';

export const primaryServices = {
  strona: {
    id: 'strona',
    name: 'Strona internetowa',
    navLabel: 'Strony www',
    href: '/uslugi/strona/',
    billing: 'Jednorazowo',
    monthly: false,
    price: websiteOffer.price,
    startingPrice: false,
    scope: [
      ...websiteOffer.features.map((feature) => feature.title),
      websiteOffer.delivery,
    ],
    priceNote:
      'Stronę dopasowujemy do Twojej firmy. Dodatkowe podstrony i funkcje wyceniamy osobno. Zakres, poprawki i termin ustalamy przed rozpoczęciem.',
    detailsLabel: 'Szczegóły wykonania strony',
    quoteLabel: 'Wyceń stronę',
    quoteService: 'strona',
  },
  seo: {
    id: 'seo',
    name: 'SEO i rozwój',
    navLabel: 'Pozycjonowanie',
    href: '/widocznosc/',
    billing: 'Miesięcznie',
    monthly: true,
    price: seoOffer.price,
    startingPrice: true,
    scope: seoOffer.features.map((feature) => feature.scope),
    priceNote:
      'Liczbę treści, miesięczny zakres prac i zasady opieki zapisujemy w propozycji.',
    detailsLabel: 'Szczegóły pozycjonowania',
    quoteLabel: 'Wyceń stronę i SEO',
    quoteService: 'strona-seo',
  },
};

export const additionalServices = {
  reklamy: {
    id: 'reklamy',
    name: 'Reklamy Google i Meta',
    href: '/uslugi/reklamy/',
    summary:
      'Kampanie kierujące do właściwej oferty. Osobna opłata za obsługę i osobny budżet mediowy.',
    detailsLabel: 'Poznaj reklamy',
  },
  content: {
    id: 'content',
    name: 'Zdjęcia i filmy',
    href: '/uslugi/content/',
    summary:
      'Materiały pokazujące Twoje usługi, produkty i firmę. Zakres sesji, dojazdy i montaż ustalamy w wycenie.',
    detailsLabel: 'Poznaj produkcję materiałów',
  },
  automatyzacja: {
    id: 'automatyzacja',
    name: 'Automatyzacje',
    href: '/uslugi/automatyzacja/',
    summary:
      'Połączenie formularzy z narzędziami i usprawnienie powtarzalnych zadań. Każde wdrożenie ma osobny zakres.',
    detailsLabel: 'Poznaj automatyzacje',
  },
};
export const services = { ...primaryServices, ...additionalServices };
export type PrimaryServiceId = keyof typeof primaryServices;
export type AdditionalServiceId = keyof typeof additionalServices;

export function priceLabel(
  amount: number,
  monthly = false,
  starting = true,
): string {
  return `${starting ? 'od ' : ''}${new Intl.NumberFormat('pl-PL').format(amount)} zł netto${monthly ? ' / miesiąc' : ''}`;
}

export const serviceLabels: Record<string, string> = {
  'strona-seo': 'Strona i SEO',
  ...Object.fromEntries(
    Object.entries(services).map(([id, service]) => [id, service.name]),
  ),
};
