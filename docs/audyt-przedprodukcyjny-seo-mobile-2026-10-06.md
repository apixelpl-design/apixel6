# Audyt przedprodukcyjny, SEO i mobile-first APIXEL

Data: 6 października 2026 r.  
Wersja kodu: commit `31a5e78` na `main`.

## Stan po wdrożeniu poprawek — 6 października 2026 r.

Poprawki aplikacji i narzędzi odbiorowych opisane w audycie zostały wdrożone lokalnie. Poniższe pierwotne ustalenia dokumentują stan sprzed poprawek.

| Kontrola końcowa         | Wynik                                                                           |
| ------------------------ | ------------------------------------------------------------------------------- |
| `npm run typecheck`      | PASS; 67 plików, 0 błędów i ostrzeżeń                                           |
| `npm test`               | PASS; 14/14 testów                                                              |
| `npm run build`          | PASS; 24 HTML, 52 warianty WebP                                                 |
| `npm run check:build`    | PASS; 22 indeksowalne URL, linki, JSON-LD, sitemap i stare adresy               |
| Powtórna kontrola mobile | 66 widoków 320/375/430 px; 0 poziomych przepełnień, błędów H1 i odczytu JSON-LD |

Wdrożone zmiany:

- Obie wersje `/uslugi` prowadzą w artefakcie Vercel bezpośrednio przez 301 do `/uslugi/strona/`, przed normalizacją slasha. Są testy regresji.
- Testy kontaktu działają; walidator uwzględnia poprawne stany FAQ, ikony i karuzeli. Dodano workflow CI.
- W widoku 320 × 568 px CTA oferty strony zaczyna się około 486 px i kończy około 538 px, więc cały przycisk mieści się w pierwszym ekranie.
- Spis poradnika jest przed artykułem na mobile, a w bocznej kolumnie na desktop. Natywne `details` działa bez JS i nie zmienia początkowego stanu po renderowaniu.
- Wspólny przycisk pauzy zatrzymuje wszystkie podglądy i zachowuje pozycję obrazu. Na telefonie pozostaje przy obrazie. Przy zbyt małym widocznym fragmencie ruch zostaje zatrzymany.
- W home początkowo są dwa żywe obrazy i cztery inertne szablony; po wyborze następnego slajdu doładowują się jego dwa obrazy. Kontrolki są ukryte i wyłączone przed inicjalizacją.
- Poradnik kosztowy pokazuje cenę i limit podstron ze wspólnych danych. Dodatkowe usługi mają opisowe H1, nagłówki ofert poprawną hierarchię, a poradniki tematyczne rekomendacje i kontekst redakcji.
- Zwiększono mobilne cele dotykowe stopki i zaktualizowano instrukcje edycji cen, zakresu i karuzeli.

Pomiary po poprawkach: [mobile-check-after-fixes-2026-10-06.json](/Users/antoniptasznik/Projekty/apixel6/docs/mobile-check-after-fixes-2026-10-06.json). Kontrole wymagające docelowego hostingu, GSC i danych użytkowników pozostają w końcowej liście odbioru. CI został dodany, ale jego wykonanie na GitHubie wymaga wypchnięcia zmian.

## Ocena gotowości — stan przed poprawkami

Witryna kompiluje się poprawnie, ma spójną strukturę SEO i działa w sprawdzonych widokach mobilnych. Odbiór techniczny wymaga jeszcze naprawy przekierowania starego adresu oraz dwóch problemów w narzędziach walidujących.

**Priorytety przed zamknięciem odbioru:**

1. Naprawić routing `/uslugi` i `/uslugi/` w artefakcie Vercel.
2. Przywrócić uruchamianie testów kontaktu.
3. Poprawić zbyt szeroką asercję widoczności w `check:build`.
4. Ułatwić dostęp do CTA na małych telefonach i przenieść mobilny spis treści przed artykuł.
5. Dodać zatrzymanie automatycznych podglądów portfolio albo pokazywać je domyślnie statycznie.

Nie znaleziono P0, czyli awarii uniemożliwiającej kompilację lub odczyt podstawowej treści. P1 oznacza istotną poprawkę przed odbiorem, P2 ważne ulepszenie, a P3 dalsze dopracowanie.

## Zakres i metoda

- Świeży build Vercel, kontrola typów, istniejące testy, walidator builda i audyt zależności.
- Przegląd źródeł, konfiguracji hostingu oraz wszystkich 24 wygenerowanych dokumentów HTML.
- W przeglądarce: 22 strony indeksowalne przy szerokościach **320, 375 i 430 px**, łącznie **66 odczytów layoutu i DOM**.
- Dodatkowe oględziny małego ekranu 320 × 568 px, menu, Escape, kontaktu, ręcznej karuzeli i ruchu podglądów portfolio.
- JSON-LD wykrywano w wyrenderowanym DOM; sprawdzono obecność i możliwość odczytu JSON, nie wykonywano Rich Results Test.
- Skille: `seo-audit` i `ui-ux-pro-max`. Wykorzystano także oficjalne materiały Google oraz W3C.

Widoki mobilne są symulowanymi viewportami przeglądarki. Nie zastępują testów na fizycznym iPhonie i Androidzie. Pasek przewijania może pomniejszać dostępny obszar layoutu; zapisano zarówno viewport, jak i szerokość layoutu.

Nie badano aktualnej domeny produkcyjnej ani kont GSC/GA4. Nie wysyłano wiadomości, nie uruchamiano kampanii i nie wdrażano zmian. Kod aplikacji pozostał bez zmian; powstał raport i materiały audytu.

## 1. Audyt przedprodukcyjny

### Wyniki poleceń

| Kontrola                            | Wynik | Co potwierdzono                                                                   |
| ----------------------------------- | ----- | --------------------------------------------------------------------------------- |
| `npm run build`                     | PASS  | Kompilacja Vercel, 24 HTML, 49 wariantów WebP                                     |
| `npm run typecheck`                 | PASS  | 65 plików, 0 błędów i ostrzeżeń                                                   |
| `npm test`                          | FAIL  | Dwa testy analityki przeszły; plik testów kontaktu nie uruchomił się              |
| `npm run check:build`               | FAIL  | Kontrole stron, linków, metadanych i sitemap przeszły; zatrzymanie na asercji CSS |
| `npm audit --json --ignore-scripts` | PASS  | 0 zgłoszonych podatności w 488 zależnościach w momencie audytu                    |

### P1. Konflikt przekierowania starej strony `/uslugi/`

**Dowód:** [astro.config.mjs:10](/Users/antoniptasznik/Projekty/apixel6/astro.config.mjs:10) deklaruje stałe przekierowanie na `/uslugi/strona/`. W wygenerowanych trasach Vercel reguła dodająca slash jest wcześniejsza niż redirect dopasowany wyłącznie do `^/uslugi$`.

| Żądanie    | Interpretacja wygenerowanej konfiguracji                             |
| ---------- | -------------------------------------------------------------------- |
| `/uslugi`  | Najpierw 308 do `/uslugi/`                                           |
| `/uslugi/` | Nie pasuje do `^/uslugi$`; brak pliku strony; pozostaje fallback 404 |

Artefakt: [.vercel/output/config.json:8](/Users/antoniptasznik/Projekty/apixel6/.vercel/output/config.json:8) oraz [:22](/Users/antoniptasznik/Projekty/apixel6/.vercel/output/config.json:22). Potwierdzono także sposób generowania reguł przez adapter.

**Wpływ:** stary link lub adres zapisany w Google może prowadzić do 404 mimo zaplanowanego przekierowania.

**Poprawka:** jawnie obsłużyć oba warianty starego adresu przed normalizacją slasha. Po kompilacji sprawdzić wynikowy routing oraz rzeczywiste odpowiedzi HTTP na Preview Vercel. Hosting może scalać dodatkową konfigurację, dlatego nie przedstawiamy tego jako zmierzonej odpowiedzi obecnej produkcji. Trwałe przekierowania powinny mapować stare adresy na odpowiadające im nowe strony. [Google: migracja adresów](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

### P1. Runner nie uruchamia testów kontaktu

**Dowód:** importy `./website-offer` i `./seo-offer` w [services.ts:1](/Users/antoniptasznik/Projekty/apixel6/src/data/services.ts:1). Runner Node z `--experimental-strip-types` kończy się `ERR_MODULE_NOT_FOUND` na imporcie bez rozszerzenia. Testy z [contact.test.ts:37](/Users/antoniptasznik/Projekty/apixel6/tests/contact.test.ts:37) nie zostały wykonane.

**Wpływ:** pełny zestaw testów odbiorowych nie przechodzi. To awaria ścieżki testowej; build Astro poprawnie rozwiązuje importy. Nie znaleziono na tej podstawie awarii formularza w aplikacji, a formularz jest obecnie wyłączony.

**Poprawka:** dostosować importy i konfigurację TS albo runner. Następnie uruchomić cały zestaw testów.

### P2. Walidator builda odrzuca poprawne stany CSS

**Dowód:** [check-build.mjs:151](/Users/antoniptasznik/Projekty/apixel6/scripts/check-build.mjs:151) odrzuca dowolne `opacity:0` poza slajdami. Trafia na zawartość zamkniętego FAQ i dekoracyjną środkową kreskę ikony otwartego menu: [motion.css:109](/Users/antoniptasznik/Projekty/apixel6/src/styles/motion.css:109), [:152](/Users/antoniptasznik/Projekty/apixel6/src/styles/motion.css:152).

**Wpływ:** fałszywy alarm zatrzymuje kontrolę odbioru. Nie znaleziono domyślnie ukrytej podstawowej treści oczekującej na animację. Otwarte FAQ było czytelne w podglądzie.

**Poprawka:** sprawdzać widoczność głównej treści i konkretne stany interakcji. Uwzględnić poprawne wyjątki dla zamkniętych disclosure i dekoracji.

### P2. Sterowanie karuzeli nie ma fallbacku bez JS

**Dowód:** [ProjectCarousel.astro:92](/Users/antoniptasznik/Projekty/apixel6/src/components/ProjectCarousel.astro:92) zawsze pokazuje strzałki i paginację. Obsługa kliknięć jest wyłącznie w [project-carousel.ts:91](/Users/antoniptasznik/Projekty/apixel6/src/scripts/project-carousel.ts:91). Style nie uzależniają widoczności sterowania od inicjalizacji.

**Wpływ:** przy niedostępnym JS pierwszy projekt i jego link pozostają dostępne, ale widoczne przyciski nie reagują. To ustalenie ze źródła; nie emulowano wyłączenia JavaScript w przeglądarce.

**Poprawka:** ujawniać kontrolki po inicjalizacji i udostępnić prosty link do pełnego portfolio jako fallback.

### P2. Dokumentacja edycji jest nieaktualna

[README.md:47](/Users/antoniptasznik/Projekty/apixel6/README.md:47) i [architektura.md:22](/Users/antoniptasznik/Projekty/apixel6/docs/architektura.md:22) nadal podają „od 2000” oraz starszą lokalizację edycji cen. Aktualna cena strony to **2000 zł netto**, a kwoty źródłowe są w `website-offer.ts` i `seo-offer.ts`; `services.ts` je udostępnia.

[README.md:74](/Users/antoniptasznik/Projekty/apixel6/README.md:74) opisuje starszą liczbę realizacji, a [:82](/Users/antoniptasznik/Projekty/apixel6/README.md:82) karuzelę zmieniającą projekt co 7 sekund. Aktualnie jest sześć rekordów projektów, pięć publicznych opisów i ręczna karuzela.

**Poprawka:** ujednolicić instrukcje edycji, ceny, liczbę projektów i opis sterowania. W repo nie ma także widocznej konfiguracji `.github/` z bramką CI dla kontroli odbiorowych; warto dodać ją po naprawie diagnostyk.

### Potwierdzone podstawy produkcyjne

- Node 22 jest zadeklarowany w projekcie i wynikowej funkcji Vercel.
- Formularz APIXEL jest globalnie wyłączony; endpoint ma w źródle odpowiedź 404 przed wywołaniem dostawcy poczty.
- Git nie śledzi lokalnych plików `.env`; przykład konfiguracji nie zawiera klucza.
- W badanym buildzie GA jest nieaktywne. Test mechanizmu zgody, odmowy i jej wycofania przeszedł.
- Routing zawiera fallback ze statusem 404 i długie cache dla zasobów `_astro`.
- Łączny rozmiar siedmiu wygenerowanych plików JS to około **7353 B gzip**. To suma artefaktów, nie pomiar transferu pojedynczej wizyty ani wyniku LCP.

## 2. Audyt SEO

### Potwierdzone wyniki techniczne

| Obszar              | Wynik                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| Dokumenty HTML      | 24; 22 indeksowalne, 404 i podziękowanie z `noindex`                                                   |
| Title i description | Unikalne we wszystkich 24 dokumentach                                                                  |
| H1 i main           | Po jednym na dokument                                                                                  |
| Canonical i OG URL  | Zgodne z docelowymi adresami na `https://www.apixel.pl`                                                |
| Sitemap             | Wszystkie 22 adresy indeksowalne, bez zbędnych adresów                                                 |
| Linki i kotwice     | 0 niedziałających odnośników wewnętrznych w nowym buildzie                                             |
| Obrazy              | 0 obrazów bez alt lub wymiarów                                                                         |
| Dostępność stron    | Wszystkie indeksowalne adresy osiągalne z home w najwyżej 2 kliknięciach                               |
| JSON-LD w DOM       | Poprawnie odczytany na 22 stronach; Organization, WebSite, BreadcrumbList, Article tam, gdzie właściwe |

Nie znaleziono lokalnej blokady indeksowania. Konflikt starego `/uslugi/` opisany w części przedprodukcyjnej jest równocześnie najważniejszą poprawką SEO migracji.

### P2. Poradnik o cenie nie podaje ceny

Materiał [ile-kosztuje-strona-firmowa.md:10](/Users/antoniptasznik/Projekty/apixel6/src/content/guides/ile-kosztuje-strona-firmowa.md:10) wyjaśnia czynniki wyceny, lecz nie daje bezpośredniej odpowiedzi kwotowej. Czytelnik musi przejść do oferty, żeby poznać cenę APIXEL.

**Poprawka:** na początku podać własną cenę **2000 zł netto jednorazowo**, zakres oraz informację o dodatkowych funkcjach i późniejszym SEO. Kwotę pobierać ze wspólnego źródła; nie wpisywać nowej niezależnej kopii. To poprawa odpowiedzi na intencję czytelnika. [Google: pomocne treści](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

### P2. H1 usług dodatkowych nie nazywa usługi

| Adres                    | Obecne H1                                       | Zalecany temat H1                           |
| ------------------------ | ----------------------------------------------- | ------------------------------------------- |
| `/uslugi/reklamy/`       | Dotrzyj do odbiorców. Mierz jakość zapytań.     | Reklamy Google Ads i Meta dla firm          |
| `/uslugi/content/`       | Pokaż, jak pracujesz. Własnymi materiałami.     | Zdjęcia i filmy dla Twojej firmy            |
| `/uslugi/automatyzacja/` | Mniej powtarzalnej pracy. Sprawniejsza obsługa. | Automatyzacja procesów i aplikacje dla firm |

Nazwa usługi jest w title i eyebrow, dlatego nie jest to blokada indeksowania. Doprecyzowanie głównego nagłówka ułatwi rozpoznanie oferty. Drugą część można zachować jako korzyść. [Google: opisowe tytuły](https://developers.google.com/search/docs/appearance/title-link).

### P3. Dalsze dopracowanie

- **Hierarchia nagłówków:** oferty przechodzą od H1 do H3 w [ServiceOffer.astro:38](/Users/antoniptasznik/Projekty/apixel6/src/components/ServiceOffer.astro:38). Warto nadać tytułowi pakietu poziom H2, a cechom H3. To semantyka i nawigacja czytnika; nie stwierdzamy kary rankingowej.
- **Powiązane poradniki:** [poradnik/[id].astro:24](/Users/antoniptasznik/Projekty/apixel6/src/pages/poradnik/[id].astro:24) wybiera pierwsze trzy materiały przez `slice(0,3)`. Dopasować relacje do tematu i dodać kontekstowe linki z usług do poradników o SEO i konwersji.
- **Autorzy:** byline „Zespół APIXEL” można uzupełnić prawdziwą informacją o redakcji i jej doświadczeniu. Nie dopisywać kwalifikacji ani opinii bez potwierdzenia.

Główne oferty stron i SEO mają spójne tematy Warszawa/okolice. Portfolio poprawnie oddziela wykonane prace, cele i potencjalny pomiar; nie publikuje wymyślonych wyników. Długość title i description nie została użyta jako automatyczny powód zgłoszenia błędu.

## 3. Audyt mobile-first

### Wyniki w przeglądarce

| Szerokość viewportu | Liczba stron | Poziome przepełnienie dokumentu |
| ------------------- | ------------ | ------------------------------- |
| 320 px              | 22           | 0                               |
| 375 px              | 22           | 0                               |
| 430 px              | 22           | 0                               |

Surowe pomiary: [mobile-audit-2026-10-06.json](/Users/antoniptasznik/Projekty/apixel6/docs/mobile-audit-2026-10-06.json). Brak przepełnienia nie oznacza pełnej certyfikacji dostępności ani gwarancji działania na każdym urządzeniu.

### P2. CTA oferty stron jest za daleko na małym ekranie

W emulowanym widoku **320 × 568 px** pierwszy przycisk kontaktu w karcie oferty zaczyna się około **787 px od góry widoku**, a H1 zajmuje około 134 px. Dostępny obszar layoutu wynosił 305 px. Tytuł czarnej karty łamie się na kilka wierszy; cena i CTA znajdują się poniżej pierwszego ekranu.

Przy **375 × 812 px** CTA zaczyna się około 723 px i mieści się w pierwszym ekranie. Problem dotyczy zwłaszcza mniejszych lub niższych viewportów.

**Poprawka:** w mobilnej karcie pokazać cenę i CTA wcześniej, skrócić odstępy i dopasować rozmiar tytułu do małego ekranu. Dłuższy opis dopasowania może znaleźć się pod CTA. To poprawa wygody kontaktu; nie zmierzono wpływu na konwersję.

Dowód wizualny: [pierwszy ekran oferty 320 px](/Users/antoniptasznik/Projekty/apixel6/docs/previews/audit-offer-first-screen-320.jpg).

### P2. Spis treści poradnika jest za artykułem

W źródle `<aside>` występuje po `<article>`, a mobilny breakpoint zmienia układ na jedną kolumnę bez zmiany kolejności: [poradnik/[id].astro:76](/Users/antoniptasznik/Projekty/apixel6/src/pages/poradnik/[id].astro:76), [site.css:1633](/Users/antoniptasznik/Projekty/apixel6/src/styles/site.css:1633).

W odczycie przy 375 px artykuł o cenie zaczynał się około 570 px, miał około 3397 px wysokości, a „W tym poradniku” zaczynało się dopiero około **4007 px**. Spis nie pomaga więc wybrać rozdziału przed czytaniem.

**Poprawka:** umieścić mobilny spis przed tekstem, np. w natywnym rozwijanym `details`. Na komputerze może pozostać boczna kolumna.

### P2. Automatyczne podglądy portfolio nie mają pauzy

Podglądy poza homepage nadal przewijają obrazy w pętli. Potwierdzono zmieniający się transform obrazu w wyrenderowanym portfolio oraz brak przycisku zatrzymania w karcie. Źródła: [site-previews.ts:28](/Users/antoniptasznik/Projekty/apixel6/src/scripts/site-previews.ts:28), [SitePreview.astro](/Users/antoniptasznik/Projekty/apixel6/src/components/SitePreview.astro), [motion.ts:1](/Users/antoniptasznik/Projekty/apixel6/src/data/motion.ts:1).

**Poprawka:** udostępnić dostępne zatrzymanie ruchu, najlepiej wspólne dla podglądów na stronie, albo pozostawić je statyczne do aktywacji użytkownika. Obsługa `prefers-reduced-motion` jest obecna, ale nie zastępuje wygodnego sterowania w samej galerii. Automatyczny ruch trwający ponad 5 sekund obok treści wymaga oceny mechanizmu pauzy według [WCAG 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). Nie wykonywano pełnego audytu zgodności WCAG.

### P2/P3. Obrazy ukrytych slajdów są ładowane od razu

[ProjectCarousel.astro:48](/Users/antoniptasznik/Projekty/apixel6/src/components/ProjectCarousel.astro:48) oraz :62 ustawiają `eager` dla wszystkich sześciu obrazów. Cztery dotyczą niewidocznych slajdów; ich domyślne źródła mają łącznie około 137 kB.

**Poprawka:** zachować eager/high dla pierwszego widocznego podglądu, pozostałe doładowywać przed pokazaniem. Dopasować `sizes` do faktycznej szerokości podglądu. Nie zmierzono czasu pobierania ani wpływu na LCP; to ustalenie o strategii ładowania.

### P3. Drobne cele dotykowe w stopce

Linki Instagram, LinkedIn i polityki prywatności miały w DOM około **20 px wysokości**. Główne linki stopki mają minimum 26 px. Warto dodać większy obszar dotykowy do drobnych odnośników.

**44 px** to wygodne zalecenie UI/UX. Formalne minimum WCAG 2.5.8 to **24 CSS px** z wyjątkami dotyczącymi m.in. odstępów i linków w tekście. Sam pomiar 20 px nie dowodzi naruszenia bez oceny wyjątków i rozmieszczenia. [W3C: wielkość celu](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

### Potwierdzone pozytywy mobilne

- Menu ma linki o wysokości około 54 px; Escape zamyka je i przywraca fokus na `summary`.
- Ręczna zmiana realizacji działa; kontrolki mają 44 × 44 px, a autoplay homepage jest wyłączone.
- Karty telefonu i e-maila mają około 96 px wysokości, prawidłowe `tel:` i `mailto:`; długi e-mail może się zawijać.
- Kontakt pozostawał czytelny w oględzinach 320 px. Nie potwierdzono wcześniejszego podejrzenia, że rzeczywisty tekst opisu nachodzi na czerwony skos.
- Biały tekst na czerwonym ma kontrast około 5,15:1. Czerwony na czarnym około 3,89:1, odpowiedni dla obecnych dużych nagłówków.
- FAQ zachowuje natywne sterowanie. Podstawowa treść jest dostępna przed uruchomieniem wejść animowanych.
- W odczytanych logach podglądu nie było błędów ani ostrzeżeń konsoli.
- Metadane, główna treść i JSON-LD są obecne w wersji mobilnej. Google wykorzystuje mobilną wersję treści do indeksowania. [Google: mobile-first indexing](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing).

## 4. Kolejność poprawek i odbiór hostingu

1. **Routing:** poprawić oba stare adresy i potwierdzić HTTP na Preview.
2. **Diagnostyki:** naprawić runner testów i asercję widoczności; uzyskać komplet przechodzących kontroli.
3. **Mobile:** wcześniejsze CTA na małych ekranach, spis treści przed artykułem, kontrola ruchu podglądów.
4. **SEO treści:** bezpośrednia odpowiedź cenowa w poradniku, nazwy usług w H1, tematyczne linkowanie.
5. **Utrzymanie:** poprawić dokumentację źródeł danych i dodać CI.

Na docelowym hostingu pozostaje potwierdzić:

- HTTP → HTTPS, apex → www, trailing slash, oba `/uslugi` oraz rzeczywiste 404.
- Ochronę i indeksowalność środowiska Preview oraz nagłówki odpowiedzi.
- Robots, sitemap i canonical po publikacji; następnie inspekcję istotnych URL w GSC.
- GA4 i zgodę, jeśli pomiar ma zostać włączony w produkcji.
- Dane właściciela, faktyczny odbiór telefonu/e-maila oraz konfigurację i dostarczenie wiadomości, jeśli formularz kiedyś wróci.
- Lighthouse/PageSpeed oraz dane rzeczywistych użytkowników na produkcji. Nie podajemy niezmierzonych wyników LCP, INP i CLS.

Powyższe punkty wymagające hostingu są listą odbioru, a nie stwierdzonymi awariami produkcji.
