# Wspólne dane i komponenty APIXEL

Strony składają się z komponentów Astro, które pobierają dane z `src/data`. Powtarzające się informacje edytujemy w danych, a ich wygląd w komponencie lub wspólnym CSS. Nie kopiujemy sekcji kontaktu ani kart cenowych do kolejnych podstron.

## Gdzie wprowadzać zmiany

| Zmiana                                              | Jedno miejsce edycji                                         | Gdzie pojawi się efekt                                                                                    |
| --------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Telefon, e-mail, adres, social media, logo          | `src/data/site.ts`, obiekt `site`                            | Kontakt, sekcje kontaktowe, stopka, dane strukturalne, prywatność, komunikaty serwera                     |
| Nagłówek, opis i włączenie formularza               | `src/data/site.ts`, obiekt `contact`                         | Wszystkie sekcje kontaktowe oraz `/kontakt/`; tryb kontaktu wpływa też na endpoint i opisy prywatności    |
| Cena „od”, zakres, rozliczenie, nazwa i link usługi | `src/data/services.ts`                                       | Homepage, cennik, zakres i cena na stronie usługi; nazwy i linki w menu, stopce oraz usługach dodatkowych |
| Linki do głównych podstron i układ menu             | `src/data/navigation.ts`                                     | Menu komputerowe i mobilne, stopka, odnośniki korzystające z katalogu podstron                            |
| Nazwa, domena, zdjęcia i opis realizacji            | `src/data/projects.ts`                                       | Portfolio, studium przypadku, karuzela, polecenia projektu w poradnikach i ofercie                        |
| Kolejność realizacji w hero                         | `featuredOrder` w `src/data/projects.ts`                     | Karuzela strony głównej; brak tego pola wyklucza projekt z karuzeli                                       |
| Projekty na stronie oferty stron                    | `showOnWebsiteOffer` w `src/data/projects.ts`                | Lista realizacji na `/uslugi/strona/`                                                                     |
| Pytania i odpowiedzi                                | `src/data/faq.ts`                                            | FAQ na homepage, w cenniku i na stronach usług                                                            |
| Etapy i zasady współpracy                           | `src/data/process.ts`                                        | Krótkie kroki na homepage i opis na `/wspolpraca/`; osobne procesy strony oraz pomiaru SEO                |
| Tempo animacji i zmiany slajdów                     | `src/data/motion.ts`                                         | Wszystkie animowane podglądy i karuzela hero                                                              |
| GA4                                                 | `PUBLIC_GA_MEASUREMENT_ID`; odczyt w `src/data/analytics.ts` | Analityka, panel zgody, ustawienia w stopce i opis prywatności                                            |
| Kolory, fonty, odstępy, wygląd elementów            | `src/styles/site.css`                                        | Cała witryna                                                                                              |

Kwoty to `primaryServices.strona.price` oraz `primaryServices.seo.price`. Obecnie: **od 2000 zł netto jednorazowo** i **od 800 zł netto miesięcznie**. Nie ma osobnych kopii cen w stronach ani nadpisania cen przez `.env`.

## Kontakt

`ContactSection.astro` jest jedynym układem głównego kontaktu. `/kontakt/` używa go z `asPage`, co nadaje nagłówkowi poziom H1 i pokazuje adres. Pozostałe strony używają H2. Telefon i e-mail renderuje `ContactDetails.astro`, również w stopce.

Sekcja kontaktu ma czarno-czerwone tło z ukośnym przełamaniem i duże odnośniki „Zadzwoń” oraz „Napisz e-mail”. Nagłówek korzysta z `contact.heading.lead` i `contact.heading.accent` w `src/data/site.ts`; drugi fragment jest wyróżniony kolorem. Wygląd całej sekcji jest wspólny i znajduje się w bloku `.contact-section` w CSS.

`contact.formEnabled` ma wartość `false`. Nie ma lokalnego `showForm` pozwalającego przypadkowo pozostawić formularz na jednej podstronie. Przyciski wyceny korzystają z `contactHref()`, które uwzględnia globalny tryb kontaktu.

Kod formularza pozostaje dostępny do przyszłego włączenia. Włączenie wymaga konfiguracji poczty opisanej w README; samo ustawienie flagi nie konfiguruje dostawcy. Gdy `CONTACT_TO` jest pusty, odbiorcą jest wspólny `site.email`.

## Oferta i treści

`Pricing.astro` składa karty z `OfferCard.astro`. Każda karta używa `ServicePrice.astro` i `ServiceScope.astro`; z tych samych komponentów korzystają strony usług. Wariant kompaktowy zmienia układ, a nie cenę ani zakres.

`Faq.astro` domyślnie pokazuje wspólne FAQ. Zestawy usług wybierają pytania po nazwach (`faq.billing`, `faq.extras` itd.), więc zmiana kolejności pytań nie zmienia przypadkowo ich doboru.

`ProcessSteps.astro` pokazuje ten sam proces współpracy skrótowo na homepage i szerzej na stronie współpracy. Dłuższa treść oraz skrót mają wspólny tytuł etapu i znajdują się w jednym rekordzie. Wariant kompaktowy przedstawia etapy jako trzy kwadratowe przystanki z cyframi 1, 2, 3 na kanciastej strzałce. Na komputerze ścieżka jest pozioma, a na telefonie pionowa; dekorację tworzy wspólny CSS.

Unikalne nagłówki i teksty usług pozostają na ich podstronach, a poradniki w `src/content/guides`. Wspólne dane nie zastępują odrębnych opisów oferty.

## Realizacje i obrazy

`projectWebsites` przechowuje nazwy i domeny dostępnych publicznie realizacji. Rekordy `projects` wykorzystują te dane zamiast powtarzać nazwy i adresy. Moja Pasja pozostaje w portfolio bez linku domenowego. MojAdwokat ma osobny publiczny rekord i pozostaje poza karuzelą homepage. Pasek odnośników pod hero został usunięty. Poufna kancelaria pozostaje odrębnym projektem.

Strona `/portfolio/` wyróżnia Seariders i MojAdwokat przez `PortfolioShowcase.astro`: widok na komputerze i telefonie, opis wdrożenia, zakres, cel z CTA do kontaktu i `PortfolioMetrics.astro`. Treści, cele, kierunki pomiaru oraz odnośniki do powiązanych usług są w `src/data/portfolio.ts`. Cel i wskaźniki pomiaru są wspólne dla portfolio oraz podstron wyróżnionych projektów. Rozwinięte opisy, rozwiązania i metadane case studies znajdują się w `src/data/case-studies.ts`; renderuje je wspólny szablon `src/pages/portfolio/[slug].astro`.

`PortfolioTile.astro` pokazuje pozostałe realizacje i linkuje nazwę projektu do opisu wdrożenia. Liczbowe wyniki pochodzą wyłącznie z `Project.results`, z okresem, źródłem i kontekstem. Dane nie są zastępowane przykładowymi wartościami ani wykresami.

Podglądy `MojadwokatStatio.png` i `MojadwokatMobile.png` zapisano z publicznej strony `https://www.mojadwokat.pl/` 5 października 2026. Ich warianty WebP znajdują się w `src/assets/portfolio/optimized/`. Zakres opisu odpowiada widocznym funkcjom strony; stos technologiczny pozostaje pusty, ponieważ nie jest potwierdzony. Te obrazy nie zastępują materiałów poufnej kancelarii.

Obrazy realizacji importujemy w `src/data/projects.ts` i wyświetlamy przez `SitePreview.astro`. Zmiana źródłowego obrazu działa we wszystkich podglądach danego projektu. Wspólne logo to `public/brand-logo.png`, używane w menu, stopce i metadanych organizacji; jego ścieżka i wymiary są w `site`.

Panel realizacji w hero pokazuje razem wersję komputerową i mobilną, nazwę projektu, branżę i bezpośredni link do domeny. Nagłówek „Wybrane realizacje” znajduje się wewnątrz panelu, nad nazwą projektu; branża jest pod nazwą. Czarne tło i czerwone akcenty panelu korzystają ze wspólnych zmiennych `--apx-black` i `--apx-red` w CSS.

Realizacje w hero wybiera się ręcznie przez strzałki i znaczniki paginacji. Podglądy pozostają nieruchome, a zmiana projektu płynnie przenika i przesuwa cały slajd. Czas oraz odległość przejścia określa `carouselMotion` w `src/data/motion.ts`. `project-carousel.ts` obsługuje również klawiaturę i ustawienie ograniczonego ruchu. Nie ma timera automatycznej zmiany realizacji; pozostałe podglądy w serwisie korzystają z własnego `previewMotion`.

Karuzela homepage korzysta z wariantu `frameless` w `SitePreview.astro`: podglądy nie mają obramowań, zaokrągleń, cieni ani paska przeglądarki. Sam widget również nie ma ramki, a jego zawartość jest na czarnym tle hero. Pozostałe podglądy mogą nadal korzystać z domyślnego wariantu z ramką.

## Animacje

`BaseLayout.astro` włącza na każdej podstronie wspólny `src/scripts/site-motion.ts` i `src/styles/motion.css`. Parametry są w obiekcie `siteMotion` w `src/data/motion.ts`; layout udostępnia je CSS jako zmienne.

Wejścia sekcji i komponentów mają przenikanie oraz przesunięcie 10 px na komputerze lub 6 px na telefonie. Uruchamiają się raz po wejściu w ekran. Czas wejścia treści to 380 ms, hero 440 ms; odstęp w grupie wynosi 50 ms i jest ograniczony do 100 ms. Skrypt wybiera całe komponenty albo ich części, aby uniknąć zagnieżdżonych animacji.

Przyciski, odnośniki, karty i menu mają krótkie reakcje 180 ms. FAQ korzysta z natywnego `details` i opcjonalnego rozwijania CSS 220 ms; starsze przeglądarki zachowują standardowe otwieranie z wejściem treści. Sterowanie karuzelą pozostaje ręczne.

Domyślny HTML i CSS nie ukrywają treści oczekującej na skrypt. Animacje wejścia wykorzystują `IntersectionObserver` i Web Animations API. Ustawienie `prefers-reduced-motion` wyłącza dekoracyjny ruch; zmiana preferencji, ukrycie karty lub fokus klawiatury kończą aktywne wejścia. Dodatkowy komponent można włączyć przez `data-motion="reveal"`, a fragment wyłączyć przez `data-motion="off"`.

## Dodawanie nowej podstrony

Użyj `BaseLayout.astro`, wspólnych komponentów i właściwych rekordów danych. Sekcję kontaktu dodaj przez `<ContactSection />`. Nie wpisuj ponownie telefonu, ceny czy zakresu w HTML. Po zmianach danych publikacja wymaga ponownego zbudowania i wdrożenia strony; lokalny podgląd Astro odświeża się automatycznie.

Adresy w konfiguracji hostingu (`astro.config.mjs`, `vercel.json`, `public/robots.txt`) oraz odnośniki w autorskich artykułach mają własną rolę. Zmiana domeny lub rzeczywistej ścieżki podstrony wymaga również aktualizacji tych miejsc i przekierowań.
