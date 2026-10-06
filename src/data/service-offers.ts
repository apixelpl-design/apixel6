import { websiteOffer } from './website-offer';
import { seoOffer } from './seo-offer';

export const serviceOffers = {
  strona: {
    features: websiteOffer.features,
    label: 'Jedna oferta. Twoja firma.',
    title: ['Strona gotowa', 'na Twoich klientów.'],
    fit: 'Projektujemy pod Twoją branżę, ofertę i sposób kontaktu z klientami.',
    cta: 'Porozmawiajmy o stronie',
    note: 'Możesz zamówić stronę bez abonamentu SEO.',
    featuresLabel: 'W cenie Twojej strony',
    delivery: `${websiteOffer.delivery}. Ustalamy zakres, zatwierdzasz projekt, a my wdrażamy stronę.`,
  },
  seo: {
    features: seoOffer.features,
    label: 'Stała praca. Twoja widoczność.',
    title: ['SEO nastawione', 'na Twoich klientów.'],
    fit: 'Zakres działań dobieramy do Twojej strony, branży i celów.',
    cta: 'Porozmawiajmy o SEO',
    note: 'Plan działań i miesięczny raport w abonamencie.',
    featuresLabel: 'Nad czym pracujemy w abonamencie',
    delivery: seoOffer.delivery,
  },
};
