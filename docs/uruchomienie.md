# Uruchomienie APIXEL

## Przed publikacją

- [ ] Zatwierdzić zakres wdrożenia, abonamentu i koszty dodatkowe. Ceny i zakres są w `src/data/website-offer.ts` oraz `src/data/seo-offer.ts`.
- [ ] Jeśli publikujemy liczbowe wyniki realizacji, sprawdzić źródło, okres, porównanie i kontekst. W kodzie są rzeczywiste projekty oraz zakresy; wyniki mogą zostać uzupełnione po uzyskaniu danych.
- [ ] Dodać podpisane opinie i informacje o osobach prowadzących współpracę, jeśli są dostępne i zatwierdzone do publikacji.
- [ ] Potwierdzić dane firmy, aktualny adres, własność kont i zapisy prywatności.
- [ ] Jeśli formularz ma zostać ponownie włączony (`contact.formEnabled` w `src/data/site.ts`), skonfigurować Resend i sprawdzić prawdziwe dostarczenie wiadomości oraz odpowiedź do nadawcy.
- [ ] Skonfigurować GA4, przejrzeć ustawienia automatycznego pomiaru i sprawdzić zgodę, odmowę oraz jej wycofanie.
- [ ] Wykonać `npm run typecheck`, `npm test`, `npm run build`, `npm run check:build`.
- [ ] Obejrzeć wersję docelową na telefonie i komputerze. Sprawdzić menu, czytelność, brak obciętej treści, telefon i e-mail oraz formularz, jeśli został włączony.

## Vercel i adresy

1. Dodać opcjonalną zmienną GA4 oraz sekretne zmienne poczty, jeśli formularz zostanie włączony, do środowiska Preview/Production. Wybrać Node.js 22.
2. Utworzyć podgląd wdrożenia i sprawdzić telefon oraz e-mail we wspólnych sekcjach kontaktowych. Jeśli formularz jest włączony, sprawdzić także dostarczenie, błąd dostawcy, walidację, ponowną próbę oraz wysłanie bez JavaScript.
3. Po zatwierdzeniu opublikować wersję produkcyjną. W panelu Domains wybrać `www.apixel.pl` jako host docelowy oraz stałe przekierowanie z `apixel.pl`. Reguła w `vercel.json` uzupełnia tę konfigurację; ustawienia domeny Vercel mogą mieć pierwszeństwo.
4. Zweryfikować odpowiedzi dla HTTP, domeny bez www i ścieżek bez końcowego `/`, w tym `/uslugi` i `/uslugi/` → `/uslugi/strona/`. Integracja builda ustawia dokładne legacy redirecty przed normalizacją slash; kontroluje je `check:build`. Docelowo jeden stały redirect 301/308 prowadzi do właściwego adresu. Nie przekierowywać nieistniejących stron na homepage — mają zwracać 404.
5. Sprawdzić `/robots.txt`, `/sitemap-index.xml` i `/sitemap-0.xml`: odpowiedź 200, host www i końcowe `/`. Strona podziękowania i endpoint API nie powinny być w sitemapie.
6. Sprawdzić canonical i OG na głównych usługach oraz artykułach. Bez parametrów zapytania, zgodne z hostem www i sitemapą.

## Search Console i obecność lokalna

1. W istniejącym koncie Search Console zweryfikować własność domeny; jeśli nie ma właściwości, dodać ją i wykonać weryfikację DNS wskazaną przez Google.
2. Dodać `https://www.apixel.pl/sitemap-index.xml`.
3. Sprawdzić inspekcją adresów homepage, strony usług, SEO, realizacji i artykułu. Porównać canonical zadeklarowany z wybranym przez Google. Wnioskować o indeksację istotnych nowych adresów po publikacji.
4. Sprawdzić Profil Firmy w Google: prawdziwe dane, zasady użycia adresu/obszaru obsługi, usługi, aktualna strona i autentyczne opinie. Nie tworzyć fikcyjnych lokalizacji.
5. Nie tworzyć dodatkowych kopii oferty dla nazw dzielnic. Rozbudowywać istniejące strony i treści z odrębną wartością.

## Odbiór z użytkownikami

Poprosić 5–8 właścicieli firm z grupy docelowej o krótkie obejrzenie strony i wykonanie zadania: „Chcesz zamówić stronę i później pozyskiwać klientów z Google. Znajdź zakres, zasady ceny i rozpocznij kontakt”. Zapisz, co rozumieją, gdzie się zatrzymują i jakie mają pytania. To badanie zrozumiałości, nie prognoza konwersji.

## Wydajność po wdrożeniu

Wykonać PageSpeed Insights/Lighthouse na wersji produkcyjnej, osobno dla strony głównej, kontaktu, usługi i artykułu. Zapisać datę, urządzenie i wyniki laboratoryjne. Z czasem ocenić dane rzeczywistych użytkowników w Search Console/CrUX: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 w 75. percentylu. Wynik laboratoryjny nie potwierdza tych progów u rzeczywistych użytkowników.

Obecne wdrożenie wykorzystuje statyczny HTML, responsywne obrazy WebP z wymiarami, priorytet dla obrazu głównego, mały JavaScript oraz dostępne treści bez animacji. Nie deklaruje niezmierzonego wyniku Core Web Vitals.
