import { services } from './services';
export const pages = {
  portfolio: { label: 'Realizacje', href: '/portfolio/' },
  process: { label: 'Jak pracujemy', href: '/wspolpraca/' },
  guides: { label: 'Poradnik', href: '/poradnik/' },
  contact: { label: 'Kontakt', href: '/kontakt/' },
  privacy: { label: 'Polityka prywatności', href: '/polityka-prywatnosci/' },
};
export const navigation = {
  main: [
    { label: services.strona.navLabel, href: services.strona.href },
    { label: services.seo.navLabel, href: services.seo.href },
    pages.portfolio,
    pages.guides,
  ],
  services: Object.values(services).map((service) => ({
    label: service.name,
    href: service.href,
  })),
  about: [pages.portfolio, pages.process, pages.guides, pages.contact],
  quoteLabel: 'Wyceń projekt',
};
