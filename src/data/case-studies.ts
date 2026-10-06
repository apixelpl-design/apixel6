export interface CaseStudySolution {
  title: string;
  description: string;
}

export interface CaseStudy {
  heading: string;
  title: string;
  description: string;
  lead: string;
  needHeading: string;
  need: string[];
  implementationIntro: string;
  solutions: CaseStudySolution[];
  measurementIntro: string;
  measurementNote: string;
}

// Expand the confirmed scope of projects. Goals and measurement directions
// are shared with the portfolio; verified results remain in projects.ts.
export const caseStudies: Record<string, CaseStudy> = {
  seariders: {
    heading: 'Strona internetowa organizatora rejsów Seariders',
    title: 'Strona organizatora rejsów Seariders | APIXEL',
    description:
      'Zobacz realizację strony Seariders z ofertą rejsów. Poznaj zakres projektu, widoki na telefonie i prace nad pozycjonowaniem.',
    lead: 'Zaprojektowaliśmy i wdrożyliśmy stronę z ofertą rejsów turystycznych i ekstremalnych. Zakres prac obejmował prezentację wycieczek, widok mobilny i pozycjonowanie.',
    needHeading: 'Pokazać różne rejsy i pomóc wybrać wycieczkę',
    need: [
      'Seariders organizuje rejsy motorówkami, w tym wycieczki do fok w ujściu Wisły. Firma potrzebowała strony, na której można przedstawić różne rodzaje rejsów.',
      'Osoba planująca wycieczkę potrzebuje poznać ofertę i znaleźć rejs odpowiadający jej planom. To był punkt wyjścia dla prezentacji usług.',
    ],
    implementationIntro:
      'Przygotowaliśmy stronę od podstaw. Połączyliśmy ofertę rejsów z układem dostosowanym do telefonu i możliwością dalszego rozwoju treści.',
    solutions: [
      {
        title: 'Prezentacja rejsów',
        description:
          'Strona przedstawia ofertę wycieczek turystycznych i ekstremalnych, w tym rejsów do fok. Odbiorca może poznać rodzaje wycieczek przed kontaktem z organizatorem.',
      },
      {
        title: 'Oferta na telefonie',
        description:
          'Dostosowaliśmy układ strony do urządzeń mobilnych. Rejsy można przeglądać na telefonie oraz komputerze.',
      },
      {
        title: 'Rozwój treści i pozycjonowanie',
        description:
          'Wdrożenie pozwala rozwijać treści dotyczące oferty. Zakres projektu obejmował również prace nad pozycjonowaniem strony.',
      },
    ],
    measurementIntro:
      'Warto śledzić, jak odbiorcy znajdują ofertę, które wycieczki przeglądają i ile zapytań trafia do organizatora.',
    measurementNote:
      'Kliknięcie kontaktu sygnalizuje zainteresowanie. Zapytania i potwierdzone rezerwacje warto liczyć osobno, a porównania uwzględniać sezonowość rejsów.',
  },
  mojadwokat: {
    heading: 'Strona kancelarii adwokackiej MojAdwokat',
    title: 'Strona kancelarii MojAdwokat w Warszawie | APIXEL',
    description:
      'Zobacz stronę kancelarii Martyny Kret w Warszawie. Poznaj specjalizacje, podstrony usług, blog i kontakt w realizacji MojAdwokat.',
    lead: 'Strona kancelarii Martyny Kret w Warszawie przedstawia specjalizacje, osobne podstrony usług i blog. Osoba szukająca pomocy prawnej może znaleźć odpowiednią usługę i sposób kontaktu.',
    needHeading: 'Pomóc znaleźć właściwą specjalizację kancelarii',
    need: [
      'Osoba szukająca adwokata potrzebuje sprawdzić, czy kancelaria zajmuje się jej sprawą. Oferta MojAdwokat wymagała czytelnej prezentacji specjalizacji i usług.',
      'Obok opisów usług potrzebne były informacje o kancelarii oraz kontakt przez telefon i e-mail. Blog uzupełnia prezentację oferty o artykuły.',
    ],
    implementationIntro:
      'Strona łączy prezentację kancelarii z podstronami usług prawnych, blogiem i kontaktem. Każdy z tych elementów pomaga odbiorcy poznać ofertę przed rozmową.',
    solutions: [
      {
        title: 'Kancelaria i specjalizacje',
        description:
          'Prezentacja kancelarii Martyny Kret pokazuje obszary pomocy prawnej. Odbiorca może sprawdzić, która specjalizacja odpowiada jego potrzebie.',
      },
      {
        title: 'Osobne podstrony usług',
        description:
          'Usługi mają własne podstrony. Osoba zainteresowana konkretną pomocą może przejść do jej opisu i poznać zakres oferty.',
      },
      {
        title: 'Blog kancelarii',
        description:
          'Blog zawiera artykuły i uzupełnia treści usługowe. Kancelaria ma miejsce do publikowania kolejnych wpisów.',
      },
      {
        title: 'Kontakt przez telefon i e-mail',
        description:
          'Na stronie dostępny jest numer telefonu oraz adres e-mail. Odbiorca może wybrać sposób kontaktu po zapoznaniu się z usługą.',
      },
    ],
    measurementIntro:
      'Warto obserwować, które specjalizacje i artykuły znajdują odbiorcy oraz ile wiadomości i telefonów trafia do kancelarii.',
    measurementNote:
      'Kliknięcia numeru telefonu i adresu e-mail warto oddzielić od odebranych połączeń oraz otrzymanych wiadomości. Pozwala to dokładniej ocenić kontakt ze strony.',
  },
};

export const projectHeadings: Record<string, string> = {
  okremovals: 'Strona firmy przeprowadzkowej OkRemovals',
  'moja-pasja': 'Strona pracowni ceramicznej Moja Pasja',
  bbtrans: 'Strona firmy transportowej BBTrans',
};
