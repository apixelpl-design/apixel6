# Pomiar i szkic pilotażu Google Ads

## Co uznajemy za wynik

| Poziom     | Dane                                                                    | Decyzja                                                                     |
| ---------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Widoczność | Search Console: wyświetlenia, kliknięcia, CTR, zapytania i adresy       | Poprawa dopasowania treści oraz tytułów; osobno marka i zapytania bez marki |
| Kontakt    | GA4 po zgodzie: CTA, telefon i e-mail; faktycznie otrzymane zapytania   | Usunięcie problemów na drodze do zapytania                                  |
| Sprzedaż   | Wartościowe zapytania, spotkania, oferty, sprzedane strony i abonamenty | Ocena rentowności pozyskania klientów                                       |

W arkuszu lub CRM zapisywać datę zapytania, deklarowane źródło, usługę, kwalifikację, etap, sprzedaż strony, abonament i wartość współpracy. Dane osobowe pozostają w narzędziu przeznaczonym do obsługi klienta; nie przesyłać ich w zdarzeniach GA4.

Zestawiać dane co miesiąc, z podziałem na kanał, stronę wejścia i urządzenie. Porównania robić dla podobnych okresów i oznaczać zmiany reklam, oferty oraz sezonowość. Nie traktować kliknięcia telefonu jako sprzedaży. Przy małym ruchu korzystać z rozmów z klientami i poprawy zrozumiałości; testy A/B wymagają odpowiedniej liczby obserwacji.

## Warunki uruchomienia pilotażu

Poniższa kampania jest szkicem do konfiguracji po uzgodnieniu budżetu. Uruchomienie wymaga działających kanałów kontaktu, sprawdzonego pomiaru, procesu obsługi zapytań, rzeczywistej propozycji handlowej i dostępu do konta Google Ads. Nie wydano środków i nie utworzono kampanii.

## Pierwsza kampania: wykonanie strony

- Typ: reklamy w wyszukiwarce; lokalizacja Warszawa i faktycznie obsługiwane okolice. Sprawdzić ustawienie obecności użytkowników w lokalizacji.
- Cel: zapytania o wykonanie strony, z możliwością dalszej obsługi SEO.
- Strona docelowa: `https://www.apixel.pl/uslugi/strona/`.
- Początkowe grupy intencji: wykonanie nowej strony; przebudowa strony firmowej. SEO rozwijać jako osobną grupę/kampanię z docelowym `/widocznosc/`, gdy budżet i oferta to uzasadnią.
- Kandydaci słów w dopasowaniu ścisłym lub do wyrażenia: „tworzenie stron internetowych warszawa”, „strona internetowa dla firmy”, „projektowanie stron warszawa”, „przebudowa strony internetowej”. Zweryfikować wolumen, koszt i intencję w planerze.
- Kandydaci wykluczeń: praca, staż, kurs, tutorial, za darmo, darmowy kreator, szablon. Przejrzeć rzeczywiste zapytania, zanim rozszerzysz listę.
- Budżet, limity dzienne i strategię stawek ustalić na podstawie realnych kosztów, marży i wolumenu. Nie zakładać z góry konkretnego kosztu klienta ani gwarantowanej rentowności.

### Propozycje tekstów

Nagłówki do sprawdzenia w edytorze reklamy:

- Strony internetowe Warszawa
- Strona dla Twojej firmy
- Wyceń stronę i SEO
- Zobacz realizacje APIXEL
- Wdrożenie i dalszy rozwój
- Strony na telefon i komputer

Opisy:

- Projektujemy strony dla firm. Jasny zakres wdrożenia i osobny abonament SEO. Zapytaj o wycenę.
- Zobacz nasze realizacje. Opisz swoją firmę i ustalmy zakres strony oraz rozwoju w Google.

Nie dopisywać cen, terminów ani gwarancji bez zatwierdzenia. Linki dodatkowe: Realizacje, Oferta i ceny, Jak pracujemy, Kontakt.

### Pomiar pilotażu

Obecnie kontakt odbywa się przez telefon i e-mail. Kliknięć tych linków nie uznawać za potwierdzone zapytania. Jeśli formularz zostanie włączony, w GA4 oznaczyć `generate_lead` jako kluczowe zdarzenie; po połączeniu z Google Ads sprawdzić import i wybrać jedno główne źródło konwersji, aby nie zliczać tej samej wiadomości podwójnie. Telefon i e-mail obserwować oddzielnie. Zgody i blokowanie skryptów mogą powodować różnicę między GA4 a skrzynką.

Przy tagowaniu kampanii używać np. `utm_source=google`, `utm_medium=cpc`, `utm_campaign=strony_warszawa`. Nigdy nie umieszczać danych klienta w URL. Obecny kod ogranicza adres wysyłany w page_view do hosta i ścieżki; atrybucję kampanii sprawdzić w rzeczywistym GA4 przed pilotażem.

Na początku regularnie przeglądać zapytania wyszukiwania, koszty, dostępność kanałów kontaktu i jakość otrzymanych zgłoszeń. Decyzję o zwiększeniu budżetu oprzeć na opłacalnych klientach, a nie samym CTR. Przy słabych zapytaniach poprawić trafność słów, komunikat, ofertę i kwalifikację.
