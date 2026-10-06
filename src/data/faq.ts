export const faq = {
  billing: {
    question: 'Czy strona i pozycjonowanie to jedna opłata?',
    answer:
      'To dwa etapy jednej współpracy. Za projekt i uruchomienie strony płacisz jednorazowo. Późniejsze SEO i rozwój rozliczamy miesięcznie, według uzgodnionego zakresu. Oba koszty poznajesz przed rozpoczęciem prac.',
  },
  websiteOnly: {
    question: 'Czy mogę zamówić samą stronę?',
    answer:
      'Tak. Stronę przygotowujemy z podstawami technicznego SEO. Jeśli chcesz rozwijać treści i widoczność w Google, proponujemy osobny abonament. Nie jest on warunkiem wykonania strony.',
  },
  seoTiming: {
    question: 'Kiedy strona zacznie pojawiać się w Google?',
    answer:
      'Samo uruchomienie strony nie oznacza wysokiej pozycji. Efekty zależą m.in. od konkurencji, jakości treści i historii domeny. Ustalamy plan działań i mierzymy zmiany; nie obiecujemy konkretnego miejsca ani terminu.',
  },
  extras: {
    question: 'Co jest dodatkowo płatne?',
    answer:
      'Budżet reklamowy, produkcja zdjęć i filmów, płatne narzędzia oraz funkcje wykraczające poza ustalony zakres wyceniamy osobno. W propozycji rozdzielamy opłatę za stronę, abonament oraz koszty zewnętrzne.',
  },
  area: {
    question: 'Czy pracujecie tylko w Warszawie?',
    answer:
      'Koncentrujemy się na firmach z Warszawy i okolic. Współpracę możemy prowadzić również zdalnie. Sposób spotkań i ewentualne dojazdy ustalamy przed rozpoczęciem projektu.',
  },
  brief: {
    question: 'Czy muszę przygotować gotowy brief?',
    answer:
      'Nie. Opisz, czym zajmuje się Twoja firma i czego oczekujesz od strony. Podczas rozmowy ustalimy strukturę, potrzebne materiały i zakres współpracy.',
  },
  seoScope: {
    question: 'Co obejmuje abonament SEO?',
    answer:
      'Audyt i plan pracy, rozwój treści, poprawę techniczną strony oraz działania nad wyświetleniami, kliknięciami i konwersją. Liczbę treści i miesięczny zakres prac dopasowujemy do firmy i zapisujemy w propozycji.',
  },
  seoReporting: {
    question: 'Jak mierzycie efekty pozycjonowania?',
    answer:
      'W miesięcznym raporcie pokazujemy wykonane prace, wyświetlenia, kliknięcia, pozycje i zapytania. Rozróżniamy wejście na stronę, kliknięcie kontaktu i rzeczywiście otrzymane zgłoszenie.',
  },
  websiteTiming: {
    question: 'Ile trwa wykonanie strony?',
    answer:
      'Termin ustalamy po określeniu liczby podstron, funkcji i dostępnych materiałów. Podajemy go w propozycji przed rozpoczęciem prac.',
  },
  websiteMaterials: {
    question: 'Co muszę przygotować?',
    answer:
      'Przekaż nam informacje o firmie i usługach oraz dostępne zdjęcia. Copywriting i teksty na podstrony są w cenie strony. W razie potrzeby osobno ustalimy zakres sesji zdjęciowej.',
  },
  websiteRebuild: {
    question: 'Czy możecie przebudować obecną stronę?',
    answer:
      'Tak. Najpierw sprawdzamy jej strukturę i cel zmian. Potem ustalamy zakres przebudowy.',
  },
};
export const commonFaq = [
  faq.billing,
  faq.websiteOnly,
  faq.seoTiming,
  faq.extras,
  faq.area,
  faq.brief,
];
export const serviceFaq = {
  strona: [
    faq.websiteTiming,
    faq.websiteMaterials,
    faq.websiteRebuild,
    faq.billing,
    faq.websiteOnly,
    faq.extras,
  ],
  seo: [
    faq.seoScope,
    faq.seoReporting,
    faq.billing,
    faq.seoTiming,
    faq.extras,
    faq.area,
  ],
};
