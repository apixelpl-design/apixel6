export interface ProcessStep {
  title: string;
  description: string;
  summary?: string;
}
export const workflows = {
  collaboration: [
    {
      title: 'Ustalamy zakres',
      summary:
        'Poznajemy Twoją firmę i cele strony. Ustalamy strukturę, potrzebne materiały, koszt oraz termin, żebyś wiedział, co zamawiasz.',
      description:
        'Ustalamy usługi, odbiorców i cel strony. Otrzymujesz propozycję z liczbą podstron, zakresem treści, ceną, terminem i zasadami poprawek.',
    },
    {
      title: 'Budujemy i uruchamiamy',
      summary:
        'Zatwierdzasz projekt, a my wdrażamy stronę i konfigurujemy pomiar zapytań. Sprawdzamy widok mobilny, uruchamiamy stronę i przekazujemy dostępy.',
      description:
        'Pokazujemy strukturę i wygląd przed budową. Następnie wdrażamy stronę, sprawdzamy kontakt i przygotowanie techniczne do SEO oraz przekazujemy uzgodnione dostępy.',
    },
    {
      title: 'Rozwijamy widoczność',
      summary:
        'W opcjonalnym abonamencie rozwijamy treści i widoczność w Google. Co miesiąc otrzymujesz plan działań, pomiar zapytań i raport wykonanych prac.',
      description:
        'Jeśli wybierasz SEO, ustalamy abonament, plan prac oraz sposób raportowania. Mierzymy zapytania i przekazujemy miesięczny raport.',
    },
  ],
  website: [
    {
      title: 'Ustalamy zakres',
      description:
        'Rozmawiamy o firmie, usługach i materiałach. Ustalamy strukturę, koszt oraz termin.',
    },
    {
      title: 'Zatwierdzasz projekt',
      description:
        'Pokazujemy układ strony i sposób prezentacji oferty. Uzgadniamy poprawki przed wdrożeniem.',
    },
    {
      title: 'Uruchamiamy stronę',
      description:
        'Wdrażamy projekt i sprawdzamy widok mobilny, kontakt oraz podstawy SEO. Przekazujemy uzgodnione dostępy.',
    },
  ],
  seoMeasurement: [
    {
      title: 'Zapytania i wejścia',
      description:
        'Analizujemy wyświetlenia, kliknięcia i zapytania w Search Console, oddzielając nazwę marki od wyszukiwania usług.',
    },
    {
      title: 'Kontakt z ofertą',
      description:
        'Sprawdzamy kliknięcia w kontakt i rzeczywiście otrzymane zapytania. Kliknięcie telefonu jest osobnym sygnałem, a nie potwierdzoną rozmową.',
    },
    {
      title: 'Jakość zapytań',
      description:
        'Wspólnie oceniamy, które kontakty pasują do Twojej oferty i kończą się współpracą. Na tej podstawie ustalamy kolejne działania.',
    },
  ],
} satisfies Record<string, ProcessStep[]>;
export const collaboration = {
  rules: [
    'Osoba prowadząca projekt i sposób kontaktu wskazane w ustaleniach',
    'Własność strony, domeny i kont określona w umowie',
    'Dostępy potrzebne APIXEL do wykonania i utrzymania prac',
    'Liczba podstron, treści, poprawek i terminy zapisane w propozycji',
    'Miesięczny plan i raport dla abonamentu SEO',
    'Warunki zakończenia opieki i przekazania dostępów',
  ],
};
