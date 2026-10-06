# APIXEL

Strona agencji APIXEL: jednorazowe wykonanie strony oraz osobny abonament na SEO i rozwój. Zachowane adresy usług, czarno-czerwona identyfikacja i rzeczywiste materiały portfolio.

## Rozwój lokalny

Wymagany Node.js 22.12 lub nowszy oraz npm.

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Podgląd: http://localhost:4321. Jeśli port jest zajęty, Astro wyświetli inny adres. Serwer ograniczony do lokalnego komputera. W Astro 7 serwer działa w tle; `npm run dev -- stop` zatrzymuje go, a `npm run dev -- status` pokazuje stan.

```sh
npm run typecheck
npm test
npm run build
npm run check:build
```

Testy formularza używają atrap dostawcy poczty i nie wysyłają wiadomości. `check:build` sprawdza wygenerowane strony, linki, metadane, sitemapę, routing starych adresów oraz widoczność treści. `npm run format` porządkuje źródła. Workflow `.github/workflows/ci.yml` wykonuje te same kontrole dla push i pull request na Node 22.

## Wspólne dane i komponenty

Kontakt, oferta, ceny, realizacje, FAQ i menu mają wspólne źródła. Instrukcja: [architektura i edycja](docs/architektura.md).

Kontakt jest obecnie **bez formularza na wszystkich stronach**. Steruje tym `contact.formEnabled: false` w `src/data/site.ts`. Ten sam `ContactSection.astro` obsługuje stronę główną, strony usług, realizacje, poradniki i `/kontakt/`; `ContactDetails.astro` udostępnia też dane w stopce. Endpoint formularza jest wyłączony razem z interfejsem.

## Opcjonalne ponowne włączenie formularza

Zmień `contact.formEnabled` na `true` dopiero po skonfigurowaniu wysyłki poniżej. Ustawienie włącza formularz we wszystkich sekcjach kontaktowych, odpowiednie opisy prywatności i endpoint.

1. Skopiuj `.env.example` do `.env.local`. Plik lokalny jest ignorowany przez Git.
2. W Resend zweryfikuj domenę nadawcy, dodając wskazane przez tę usługę rekordy DNS.
3. Wpisz w `.env.local` klucz `RESEND_API_KEY`, zatwierdzonego nadawcę `CONTACT_FROM` i docelową skrzynkę `CONTACT_TO`. Klucz pozostaje po stronie serwera; nie używaj prefiksu `PUBLIC_`.
4. Ustaw `contact.formEnabled: true` w `src/data/site.ts` i uruchom ponownie serwer. Wyślij własne zgłoszenie i potwierdź odebranie wiadomości w docelowej skrzynce oraz możliwość odpowiedzi do zgłaszającego.
5. W Vercel dodaj te same trzy zmienne dla odpowiedniego środowiska i wykonaj ponowne wdrożenie. Formularz wymaga funkcji serwerowej adaptera Vercel. Sam hosting plików statycznych nie obsłuży `/api/contact/`.

Bez konfiguracji poczty formularz pokazuje błąd i zachowuje tekst. Potwierdzenie pojawia się wyłącznie po potwierdzeniu przyjęcia wiadomości przez Resend. Przyjęcie przez dostawcę nie potwierdza dostarczenia do skrzynki: sprawdź je po konfiguracji.

Endpoint ma walidację po stronie serwera, limit rozmiaru, kontrolę pochodzenia, pole przeciw automatom, identyfikator ponownych prób i ograniczenie liczby prób w jednej instancji. Po uruchomieniu produkcji ustaw także odpowiedni limit dla `/api/contact/` w Vercel Firewall. Nie zapisujemy treści zapytań w logach aplikacji.

## Ceny i dane realizacji

Cena strony to **2000 zł netto jednorazowo**, a pozycjonowanie zaczyna się **od 800 zł netto miesięcznie**. Cenę i zakres strony edytuj w `src/data/website-offer.ts`, a SEO w `src/data/seo-offer.ts`. `src/data/services.ts` udostępnia te same dane pozostałym komponentom. Korzystają z nich homepage, oferty usług i odpowiedź cenowa w poradniku. Ceny nie mają nadpisania przez zmienne środowiskowe. Zmiana wymaga nowej kompilacji.

Pakiet strony obejmuje do 10 podstron, projekt mobilny i komputerowy, teksty, formularz i blog, nowe lub zmodyfikowane logo oraz szybkość i podstawy SEO. Dodatkowe funkcje i miesięczny zakres pozycjonowania ustalamy osobno. Zmiany zakresu powinny odpowiadać rzeczywistej propozycji handlowej.

Portfolio edytuj w `src/data/projects.ts`. Dla każdego zatwierdzonego wyniku `results` podaj wszystkie pola: `label`, `value`, `period`, `source`, `context`. Nie dodawaj wartości bez źródła, okresu, kontekstu porównania i zgody na publikację. Nie przypisuj całego wzrostu sprzedaży stronie, jeśli równocześnie zmieniały się reklamy lub oferta. Projekt objęty poufnością nie ma szczegółowej podstrony.

Nie dodano fikcyjnych opinii, osób ani wyników. Sekcje mogą otrzymać autentyczne dane po ich przekazaniu. Przed publikacją zatwierdź dane firmy, opis współpracy i politykę prywatności, w tym faktycznego administratora danych i okresy ich przechowywania.

## Pomiar GA4

1. Utwórz lub wybierz strumień witryny GA4 dla `https://www.apixel.pl`.
2. Ustaw `PUBLIC_GA_MEASUREMENT_ID` na rzeczywisty identyfikator `G-…` i zbuduj stronę ponownie.
3. Wyłącz automatyczne zdarzenia formularzy oraz pomiar wyszukiwania w ustawieniach Enhanced Measurement. W tej wersji mierzymy własne zdarzenia. Sprawdź ustawienia pozostałych automatycznych zdarzeń, aby nie zbierały pól formularza, adresów e-mail ani parametrów adresu z danymi osobowymi.
4. Sprawdź brak żądań do Google po odmowie oraz własne zdarzenia po zgodzie. Skrypt GA uruchamia się dopiero po zgodzie; można ją zmienić w stopce.
5. Jeśli ponownie włączysz formularz, oznacz `generate_lead` jako kluczowe zdarzenie. Jest wysyłane po rzeczywistym potwierdzeniu API, nie przy kliknięciu przycisku ani samym otwarciu strony podziękowania.

Przy wyłączonym formularzu zdarzenia `form_start` i `generate_lead` nie są wysyłane. Zdarzenia: `cta_click` (miejsce i docelowa ścieżka), `phone_click`, `email_click`, `form_start` (usługa), `generate_lead` (usługa). Nie przesyłamy wpisanych danych kontaktowych. Kliknięcia telefonu i maila są osobnymi sygnałami, nie potwierdzonymi zapytaniami. Pomiar wymaga zgody i może być blokowany przez przeglądarkę; skuteczność biznesową zestawiaj z rzeczywiście otrzymanymi zgłoszeniami. Natywne wysłanie formularza bez JavaScript nie wysyła zdarzenia GA4.

Kody kampanii UTM mogą zawierać litery ASCII, cyfry, `_` i `-` (do 80 znaków). Przekazujemy tylko źródło, medium, nazwę, identyfikator i wariant kampanii. Inne parametry URL, w tym dane wpisane w formularzu, nie są przekazywane przez nasz pomiar. Atrybucję reklam potwierdź na rzeczywistym strumieniu GA4.

Zależność `path-to-regexp` adaptera Vercel ma poprawkę `6.3.0` przypiętą przez `overrides`. Przy aktualizacji adaptera sprawdź, czy ta poprawka jest jeszcze potrzebna, oraz ponownie uruchom kompilację i kontrolę tras.

## Treści i struktura

- Strona główna: hero z karuzelą realizacji, wspólny blok oferty z zakresem i cenami, trzy kroki współpracy, kompaktowe FAQ oraz kontakt przez telefon i e-mail. Oferta oraz ceny korzystają z tych samych danych co podstrona usług.
- `/uslugi/strona/`: główna oferta tworzenia stron dla Warszawy i okolic.
- `/widocznosc/`: abonament SEO.
- `/portfolio/`: sześć realizacji; pięć ma publiczne opisy, jedna pozostaje poufna.
- `/poradnik/`: sześć materiałów w `src/content/guides`, natywny spis przed artykułem w widoku mobilnym i tematyczne rekomendacje `relatedGuides`. `offerSummary: true` dodaje odpowiedź cenową ze wspólnych danych.
- `/kontakt/`: wspólny blok kontaktu — telefon i e-mail.

Astro generuje publiczne strony statycznie. JavaScript obsługuje menu, formularz, przewijanie podglądów realizacji i opcjonalną analitykę; treść i podstawowa nawigacja nie zależą od animacji. Fonty Manrope i Space Grotesk są hostowane lokalnie, z zestawem polskich znaków.

Podglądy stron korzystają ze wspólnego komponentu `SitePreview.astro`. Poza homepage obraz może przesuwać się w dół i z powrotem, gdy jest widoczny. Wspólny przycisk „Zatrzymaj podglądy” / „Wznów podglądy” steruje wszystkimi obrazami na stronie i pojawia się przy przewijanych podglądach. Najechanie lub fokus zatrzymują dany podgląd, a systemowe ograniczenie ruchu wyłącza automat. Bez JavaScript widoczny jest statyczny fragment obrazu. Gesty na obrazie przewijają całą stronę.

Widget „Wybrane realizacje” w hero (`ProjectCarousel.astro`) jest ręczny: strzałki i paginacja wybierają Seariders, BBTrans i OkRemovals. Podglądy w home pozostają statyczne. Pierwszy slajd ładuje obrazy od razu; pozostałe przechowują je w inertnych `template` do wyboru projektu. Bez JavaScript kontrolki są ukryte, a pierwszy projekt i link do pełnego portfolio działają.

Panel ma czarne tło i podglądy bez ramek. Nazwa projektu, branża oraz opis są oddzielone od obrazu. Podgląd i „Zobacz projekt” prowadzą do strony klienta. Zmiana slajdu płynnie przenika i przesuwa cały projekt; ograniczenie ruchu wyłącza przejście.

Stałe przekierowania Astro są po kompilacji umieszczane przed normalizacją slash przez integrację `scripts/vercel-static-redirects.mjs`. Walidator sprawdza, że `/uslugi` i `/uslugi/` prowadzą bezpośrednio do `/uslugi/strona/`. Przy aktualizacji adaptera ponownie sprawdź wynikowy routing.

## Wdrożenie i rozwój

Zobacz [listę uruchomienia](docs/uruchomienie.md) oraz [plan pomiaru i pilotażu Google Ads](docs/pomiar-i-google-ads.md). Kod nie tworzy kont zewnętrznych, nie uruchamia płatnej kampanii i nie zastępuje weryfikacji danych właściciela. Zmiany przygotowane lokalnie należy opublikować w uzgodnionym procesie wdrożenia.
