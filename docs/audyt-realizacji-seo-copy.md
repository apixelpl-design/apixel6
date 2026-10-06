# Audyt SEO i copy strony realizacji APIXEL

Data: 6 października 2026 r.

## Zakres i cel

Audyt obejmuje aktualną lokalną stronę `/portfolio/`, jej komponenty, dane projektów, wygenerowany HTML i sitemapę oraz szablon podstron realizacji. Sprawdzono wyrenderowane metadane i JSON-LD w przeglądarce, a także układ przy szerokości 375 px.

Odbiorca: właściciel firmy porównujący wykonawców stron i pozycjonowania. Główny cel strony: pokazać jakość wykonanych prac i skłonić do rozmowy o podobnym wdrożeniu.

Nie badano produkcyjnego indeksowania, pozycji ani ruchu. Brak danych Search Console, analityki i potwierdzonych zapytań klientów. Ocena wydajności dotyczy sposobu przygotowania zasobów; nie jest pomiarem Core Web Vitals.

## Podsumowanie

Podstawa techniczna jest poprawna w sprawdzonym zakresie. Strona ma czytelny temat, rzeczywiste widoki projektów na komputerze i telefonie oraz działające ścieżki do opisów realizacji. Nie znaleziono lokalnej blokady indeksowania.

Największa szansa na poprawę to treść przy projektach. Obecnie wiele miejsca zajmuje opis drogi od widoczności do kontaktu. Mniej uwagi poświęcono decyzjom projektowym i konkretnym wdrożeniom, które klient może ocenić na pokazanej stronie.

Najważniejsze zmiany:

1. Wyraźnie nazwać cel projektu, wykonany zakres i plan pomiaru.
2. Dodać kontakt przy wyróżnionych realizacjach.
3. Opisać konkretne rozwiązania Seariders i MojAdwokat.
4. Rozwinąć ich podstrony oraz opisać linki do nich.
5. Połączyć realizacje z odpowiednimi ofertami stron i SEO.

## 1. Indeksowalność i techniczne SEO

| Obszar | Potwierdzony stan | Ocena |
| --- | --- | --- |
| Canonical | W DOM: `https://www.apixel.pl/portfolio/` | Spójny z docelową domeną i adresem strony |
| Robots | Brak `noindex` w sprawdzonym HTML i DOM; `robots.txt` pozwala na indeksowanie | Nie znaleziono lokalnej blokady |
| Sitemap | W wygenerowanej mapie jest portfolio i pięć publicznych podstron projektów | Publiczne projekty są uwzględnione; poufny projekt nie ma publicznej podstrony |
| Nagłówki | Jeden H1; projekty i sekcje korzystają z H2/H3 | Logiczna struktura |
| Język i viewport | `lang="pl"`, poprawna deklaracja viewport | Poprawna konfiguracja |
| Dane strukturalne | W wyrenderowanym DOM: Organization, WebSite, BreadcrumbList | Dane są obecne; nie wykonywano walidacji Rich Results Test |
| Obrazy | 12 podglądów WebP, alt, wymiary i responsive srcset/sizes | Dobra podstawa; 10 obrazów ładowanych lazy |
| Animacja | Zatrzymuje się poza ekranem i przy ukrytej karcie; respektuje reduced motion | Dobra podstawa dla wydajności i dostępności |
| Widok telefonu | Przy 375 px brak poziomego przepełnienia; treści i podglądy mieszczą się w kolumnie | Układ czytelny w sprawdzonym widoku |

Domyślne źródła 12 podglądów mają łącznie około 271 KB. Nie jest to pomiar całego transferu: przeglądarka dobiera warianty obrazów, a strona pobiera także fonty, CSS i JavaScript.

Core Web Vitals należy ocenić po publikacji na podstawie danych użytkowników lub pomiarów produkcyjnych. Sam dobór WebP i lazy loading nie potwierdza dobrych wyników LCP, INP i CLS. [Dokumentacja Web Vitals](https://web.dev/articles/vitals).

Dowody: [BaseLayout.astro](/Users/antoniptasznik/Projekty/apixel6/src/layouts/BaseLayout.astro:34), [robots.txt](/Users/antoniptasznik/Projekty/apixel6/public/robots.txt), [konfiguracja Astro](/Users/antoniptasznik/Projekty/apixel6/astro.config.mjs), [animacja podglądów](/Users/antoniptasznik/Projekty/apixel6/src/scripts/site-previews.ts:43).

## 2. Ustalenia dotyczące treści i konwersji

Priorytet określa kolejność pracy nad stroną. Nie oznacza potwierdzonego wpływu na pozycję ani zmierzonego wzrostu konwersji.

### P1. Cel projektu potrzebuje jednoznacznej etykiety

**Problem:** „Co daje ta strona” poprzedza opis celu. Blok wskaźników jest prawidłowo oznaczony jako obszary pomiaru, jednak całość może sprawiać wrażenie opisu osiągniętych efektów.

**Wpływ:** istotny dla zaufania i rozumienia oferty. Brak potwierdzonego błędu technicznego SEO.

**Dowód:** [PortfolioShowcase.astro:73](/Users/antoniptasznik/Projekty/apixel6/src/components/PortfolioShowcase.astro:73), [PortfolioMetrics.astro:13](/Users/antoniptasznik/Projekty/apixel6/src/components/PortfolioMetrics.astro:13). Żaden projekt nie ma obecnie zapisanych wyników liczbowych.

**Zmiana:** użyć etykiet „Cel projektu”, „Co wdrożyliśmy” i „Co warto mierzyć po uruchomieniu”. Udokumentowane wyniki mogą stanowić osobny blok, gdy pojawią się dane.

### P1. Kontakt jest zbyt daleko od realizacji

**Problem:** hero kieruje do projektów, a wyróżnione karty do podstron i witryn klientów. W treści portfolio nie ma wcześniejszego CTA do rozmowy. Kontakt pozostaje w nagłówku na komputerze i na końcu strony; na telefonie główne menu jest zwinięte.

**Wpływ:** wysoka szansa na poprawę wygody kontaktu. Wielkość wpływu na konwersję wymaga danych.

**Dowód:** [hero i odnośniki](/Users/antoniptasznik/Projekty/apixel6/src/pages/portfolio.astro:61), [linki przy projekcie](/Users/antoniptasznik/Projekty/apixel6/src/components/PortfolioShowcase.astro:84). Przy widoku 375 × 812 px sekcja kontaktu zaczyna się około 6927 px od góry dokumentu, czyli po ponad ośmiu wysokościach ekranu.

**Zmiana:** dodać przy wyróżnionych projektach „Porozmawiajmy o podobnej stronie” prowadzące do `#wycena`. Zachować skoki do projektów, które pomagają obejrzeć prace.

### P1. Dostępne fakty są ciekawsze niż ogólne hasła

**Problem:** „Projektujemy drogę do klienta” i „Od szukania pomocy do kontaktu” są szerokimi obietnicami. Strona ma już dane pozwalające pokazać konkretną pracę.

**Wpływ:** istotny dla wiarygodności i porównania wykonawców; umiarkowana szansa na poprawę użyteczności treści dla wyszukiwania.

**Dowód:** [opis Seariders](/Users/antoniptasznik/Projekty/apixel6/src/data/projects.ts:62), [zakres MojAdwokat](/Users/antoniptasznik/Projekty/apixel6/src/data/projects.ts:84).

**Zmiana:** opisać ofertę różnych rejsów Seariders oraz podstrony specjalizacji, blog i kontakt kancelarii. Przy każdej realizacji wskazać rozwiązanie i funkcję, którą odbiorca może zobaczyć. Nie dopisywać skrócenia czasu, wzrostu sprzedaży czy liczby klientów bez dowodu.

### P2. Podstrony projektów są krótkimi opisami

**Problem:** H1 zawiera samą nazwę marki, a kolejne sekcje wykorzystują wspólny szablon i krótkie opisy. Nie wyjaśniają jeszcze szerzej decyzji projektowych.

**Wpływ:** umiarkowany dla jasności tematu, wartości treści i zaufania. Strony pozostają dostępne do indeksowania.

**Dowód:** [H1 podstrony](/Users/antoniptasznik/Projekty/apixel6/src/pages/portfolio/[slug].astro:35), [sekcje opisu](/Users/antoniptasznik/Projekty/apixel6/src/pages/portfolio/[slug].astro:72).

**Zmiana:** zacząć od Seariders i MojAdwokat. Nadać opisowe H1, np. „Strona internetowa organizatora rejsów Seariders” oraz „Strona kancelarii adwokackiej MojAdwokat”. Rozwinąć potrzebę klienta, potwierdzony zakres i zastosowane rozwiązania. Dodać datę wdrożenia i materiały przed/po, jeśli są dostępne.

### P2. Linki potrzebują wyraźniejszych nazw i kontekstu

**Problem:** wyróżnione projekty mają takie samo „Poznaj projekt”, a pozostałe kafle wizualnie pokazują opis realizacji pod strzałką. Strzałki mają dostępne nazwy ARIA, więc problem dotyczy głównie widocznej etykiety. W głównej treści portfolio brakuje linków do ofert stron i SEO.

**Wpływ:** niski do umiarkowanego dla SEO; istotny dla zrozumienia następnego kroku.

**Dowód:** [linki showcase](/Users/antoniptasznik/Projekty/apixel6/src/components/PortfolioShowcase.astro:85), [link kafla](/Users/antoniptasznik/Projekty/apixel6/src/components/PortfolioTile.astro:39). Usługi są obecnie dostępne przez wspólną nawigację i stopkę.

**Zmiana:** rozróżnić „Zobacz zakres projektu Seariders” i „Otwórz stronę Seariders”. Dodać kontekstowe odnośniki „Tworzenie stron internetowych” → `/uslugi/strona/` oraz „Zakres pozycjonowania” → `/widocznosc/`, przy opisach odpowiednich prac. Opisowy tekst linku ułatwia użytkownikom i Google zrozumienie strony docelowej. [Google: tekst odnośników](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

### P3. Opis meta i blok o pomiarze można uprościć

**Problem:** meta description opisuje m.in. „sposób mierzenia widoczności oraz zapytań”. Ogólny blok o pomiarze powtarza schemat pokazany wcześniej i zawiera komentarz o zasadach publikacji danych.

**Wpływ:** niski dla SEO, umiarkowany dla jasności przekazu. Aktualny title prawidłowo określa temat.

**Dowód:** [metadane](/Users/antoniptasznik/Projekty/apixel6/src/pages/portfolio.astro:18), [blok pomiaru](/Users/antoniptasznik/Projekty/apixel6/src/pages/portfolio.astro:88).

**Zmiana:** w opisie meta wymienić prawdziwe realizacje i zaprosić do obejrzenia zakresu. Blok pomiaru skrócić lub włączyć do opisów wskaźników przy projektach.

Aktualny tytuł ma 57 znaków, a opis 169. Sama długość nie jest błędem. Google nie wyznacza sztywnego limitu znaków opisu; fragment może być skrócony i dobrany do zapytania. [Google: opisy i fragmenty wyników](https://developers.google.com/search/docs/appearance/snippet).

## 3. Proponowane copy

Poniższe teksty powstały jako propozycja w audycie. Zmiany wdrożone po jego zatwierdzeniu opisano na końcu dokumentu.

### Hero

**H1:** Realizacje stron internetowych dla firm.

**Drugi wiersz:** Zobacz, co wdrożyliśmy.

**Lead:** Oferta rejsów Seariders, specjalizacje kancelarii MojAdwokat i formularz wyceny OkRemovals. Zobacz strony na komputerze i telefonie oraz zakres wykonanych prac.

**Nawigacja po pracach:** Seariders / MojAdwokat / Pozostałe realizacje.

**CTA kontaktowe:** Porozmawiajmy o Twojej stronie.

Uzasadnienie: pierwsza linia określa temat, a lead pokazuje konkretne przykłady. Portfolio obsługuje intencję oglądania realizacji. Frazy dotyczące zamawiania strony w Warszawie pozostają głównym tematem strony usługi.

Alternatywy:

| Wariant H1 | Zastosowanie |
| --- | --- |
| Realizacje stron internetowych dla firm. | Zalecany: jasny temat i odbiorca |
| Portfolio stron internetowych APIXEL. | Krótki wariant skupiony na pracach marki |
| Strony internetowe, które zaprojektowaliśmy i wdrożyliśmy. | Mocniej podkreśla wykonany zakres |

### Seariders

**Nagłówek:** Oferta rejsów na komputerze i telefonie.

**Opis:** Przygotowaliśmy stronę organizatora rejsów turystycznych i ekstremalnych, w tym wycieczek do fok w ujściu Wisły. Strona przedstawia różne wycieczki i umożliwia dalszy rozwój treści. Zakres obejmował także prace nad pozycjonowaniem.

**Zakres:** Projekt i wdrożenie / Prezentacja rejsów / Widok mobilny / Pozycjonowanie.

**Cel projektu:** Ułatwić klientowi znalezienie rejsu odpowiadającego jego planom.

**Co warto mierzyć po uruchomieniu:**

- Widoczność oferty: wyświetlenia w Google na zapytania o rejsy i wycieczki.
- Zainteresowanie wycieczkami: kliknięcia z Google i odwiedziny stron konkretnych rejsów.
- Kontakt i rezerwacje: otrzymane zapytania oraz potwierdzone rezerwacje.

### MojAdwokat

**Nagłówek:** Specjalizacje kancelarii i kontakt w jednym miejscu.

**Opis:** Strona kancelarii Martyny Kret przedstawia specjalizacje, podstrony usług i blog. Osoba szukająca pomocy prawnej w Warszawie może znaleźć odpowiednią usługę i skontaktować się z kancelarią.

**Zakres:** Prezentacja kancelarii / Podstrony specjalizacji / Blog / Telefon i e-mail.

**Cel projektu:** Pomóc odbiorcy znaleźć właściwą specjalizację i sposób kontaktu.

**Co warto mierzyć po uruchomieniu:**

- Widoczność usług: wyświetlenia specjalizacji i bloga na zapytania o pomoc prawną.
- Zainteresowanie ofertą: kliknięcia z Google i odwiedziny podstron usług.
- Kontakt z kancelarią: otrzymane wiadomości i odebrane telefony.

Uzasadnienie opisów: funkcje są widoczne w projektach. Cele pozostają nazwane jako cele. Kliknięcia numeru telefonu i e-mail należy liczyć osobno od otrzymanych zapytań.

### Pozostałe realizacje

**H2:** Strony dla firm transportowych, pracowni i kancelarii.

**Lead:** Formularz wyceny przeprowadzki, katalog ceramiki i prezentacja usług logistycznych. Zobacz kolejne zastosowania naszych stron.

### Linki i CTA

| Miejsce | Zalecany tekst | Cel |
| --- | --- | --- |
| Opis realizacji | Zobacz zakres projektu Seariders | `/portfolio/seariders/` |
| Działająca witryna | Otwórz stronę Seariders | Zewnętrzna strona klienta |
| Kontakt przy case | Porozmawiajmy o podobnej stronie | `#wycena` |
| Alternatywa CTA | Omówmy stronę dla Twojej firmy | `#wycena` |
| Alternatywa CTA | Poproś o wycenę swojej strony | `#wycena` |

### Metadane

**Title:** Realizacje stron internetowych dla firm | APIXEL

**Meta description:** Zobacz strony Seariders, MojAdwokat i innych firm. Poznaj zakres wdrożeń, obejrzyj widoki na komputerze i telefonie i porozmawiajmy o Twojej stronie.

Aktualny title również jest poprawny. Propozycja ma ujednolicić komunikat z nowym H1. Google zaleca opisowe, zwięzłe tytuły dopasowane do treści. [Google: tytuły wyników](https://developers.google.com/search/docs/appearance/title-link).

## 4. Jak uzupełnić dowody efektów

Do pokazania wzrostu potrzebne są dane pozwalające rzetelnie porównać okresy. Dla Seariders ważna jest sezonowość rejsów; prosty wzrost między zimą a latem nie dowodzi efektu wdrożenia.

| Obszar | Źródło | Co udokumentować |
| --- | --- | --- |
| Wyświetlenia i kliknięcia | Search Console | Okresy, zapytania, podstrony, rozdzielenie marki i fraz usługowych |
| Pozycje | Search Console lub potwierdzony monitoring | Te same frazy, region i zakres porównania; średnia pozycja wymaga kontekstu |
| Zapytania | Analityka połączona z potwierdzeniem klienta lub CRM | Faktyczne wiadomości i odebrane telefony; osobno kliknięcia kontaktu |
| Rezerwacje lub sprzedaż | System rezerwacji lub dane klienta | Potwierdzone transakcje i sposób przypisania do ruchu na stronie |
| Konwersja | Potwierdzone zdarzenia i odpowiedni mianownik | Definicja konwersji, źródło ruchu i porównywalne okresy |

W każdym opublikowanym wyniku powinny znaleźć się źródło, okres, punkt odniesienia i kontekst. Sam wzrost po wdrożeniu nie ustala przyczyny; kampanie reklamowe, sezon i zmiany oferty mogą wpływać na wynik.

Bez danych liczbowych materiałem potwierdzającym pracę są rzeczywiste widoki, zakres wdrożenia, konkretne rozwiązania oraz zatwierdzona opinia klienta. Do zebrania pozostają daty realizacji, materiały przed/po i zgody na publikację wyników.

## 5. Kolejność wdrożenia

1. **Szybkie poprawki:** etykiety celu i pomiaru, CTA przy projektach, opisowe nazwy linków.
2. **Treść głównej strony:** nowe hero, konkretne opisy wyróżnionych realizacji i krótszy blok o pomiarze.
3. **Linkowanie:** powiązania z ofertą tworzenia stron oraz pozycjonowania w kontekście wykonanych prac.
4. **Podstrony projektów:** opisowe H1 i rozbudowane case studies Seariders oraz MojAdwokat.
5. **Po publikacji:** sprawdzenie indeksowania i wydajności na produkcji; uzupełnienie portfolio o zatwierdzone dowody wyników.

W sprawdzonym zakresie nie ma krytycznej poprawki blokującej indeksowanie. Najpierw warto wzmocnić konkretność treści i drogę do kontaktu.

## Wdrożenie po zatwierdzeniu audytu

6 października 2026 r. wdrożono nowe H1 i metadane portfolio, konkretne opisy wyróżnionych projektów, CTA w hero i przy realizacjach, widoczne nazwy odnośników oraz linkowanie do usług. Usunięto powtarzający się ogólny blok o pomiarze.

Podstrony Seariders i MojAdwokat otrzymały opisowe nagłówki i metadane, rozwinięte opisy potrzeb oraz wykonanych prac, wspólne cele i wskaźniki pomiaru oraz CTA do kontaktu. Pozostałe publiczne realizacje mają opisowe H1 i tytuły. Do zebrania pozostają potwierdzone dane wyników, daty realizacji i materiały przed/po. Ocena produkcyjnego indeksowania i Core Web Vitals wymaga publikacji oraz danych.
