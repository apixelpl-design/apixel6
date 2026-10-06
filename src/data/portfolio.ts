export type PortfolioMetricIcon = 'visibility' | 'click' | 'contact';

export interface PortfolioMetric {
  title: string;
  description: string;
  icon: PortfolioMetricIcon;
}

export interface PortfolioStory {
  headline: string;
  description: string;
  goal: string;
  tags: string[];
  services: { label: string; href: string }[];
  metrics: PortfolioMetric[];
}

// Measurement directions describe what to track, not verified project results.
export const portfolioStories: Record<string, PortfolioStory> = {
  seariders: {
    headline: 'Oferta rejsów na komputerze i telefonie.',
    description:
      'Przygotowaliśmy stronę organizatora rejsów turystycznych i ekstremalnych, w tym wycieczek do fok w ujściu Wisły. Strona przedstawia różne wycieczki i umożliwia rozwój treści. Zakres obejmował także prace nad pozycjonowaniem.',
    goal: 'Ułatwić klientowi znalezienie rejsu odpowiadającego jego planom.',
    tags: ['Oferta rejsów', 'Widok mobilny', 'Pozycjonowanie'],
    services: [
      { label: 'Tworzenie stron internetowych', href: '/uslugi/strona/' },
      { label: 'Zakres pozycjonowania', href: '/widocznosc/' },
    ],
    metrics: [
      {
        title: 'Widoczność oferty',
        description:
          'Wyświetlenia w Google na zapytania o rejsy i wycieczki. Osobno wyszukiwania nazwy Seariders.',
        icon: 'visibility',
      },
      {
        title: 'Zainteresowanie wycieczkami',
        description:
          'Kliknięcia z Google i odwiedziny stron konkretnych rejsów, z podziałem na telefon i komputer.',
        icon: 'click',
      },
      {
        title: 'Kontakt i rezerwacje',
        description:
          'Otrzymane zapytania i potwierdzone rezerwacje. Kliknięcie kontaktu to osobny sygnał zainteresowania.',
        icon: 'contact',
      },
    ],
  },
  mojadwokat: {
    headline: 'Specjalizacje kancelarii i kontakt w jednym miejscu.',
    description:
      'Strona kancelarii Martyny Kret przedstawia specjalizacje, podstrony usług i blog. Osoba szukająca pomocy prawnej w Warszawie może znaleźć odpowiednią usługę i skontaktować się z kancelarią.',
    goal: 'Pomóc odbiorcy znaleźć właściwą specjalizację i sposób kontaktu.',
    tags: ['Specjalizacje', 'Blog', 'Telefon i e-mail', 'Warszawa'],
    services: [
      { label: 'Tworzenie stron internetowych', href: '/uslugi/strona/' },
    ],
    metrics: [
      {
        title: 'Widoczność usług',
        description:
          'Wyświetlenia podstron usług i bloga na zapytania o pomoc prawną w Warszawie.',
        icon: 'visibility',
      },
      {
        title: 'Zainteresowanie ofertą',
        description:
          'Kliknięcia z Google oraz odwiedziny specjalizacji, których szukają potencjalni klienci.',
        icon: 'click',
      },
      {
        title: 'Kontakt z kancelarią',
        description:
          'Odebrane telefony i wiadomości dotyczące spraw. Osobno kliknięcia numeru i adresu e-mail.',
        icon: 'contact',
      },
    ],
  },
};

export const portfolioJourney: PortfolioMetric[] = [
  {
    title: 'Widoczność',
    description:
      'Wyświetlenia i pozycje w Google na zapytania związane z ofertą. Pomagają ocenić, czy stronę znajdują właściwi odbiorcy.',
    icon: 'visibility',
  },
  {
    title: 'Wejścia',
    description:
      'Kliknięcia z wyszukiwarki i odwiedziny podstron usług. Pokazują, które treści przyciągają zainteresowanie.',
    icon: 'click',
  },
  {
    title: 'Zapytania',
    description:
      'Rzeczywiście otrzymane zgłoszenia i ich jakość. Sprzedaż oceniamy na podstawie potwierdzonych transakcji.',
    icon: 'contact',
  },
];
