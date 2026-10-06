import seariders from '../assets/portfolio/optimized/SearidersStatio.webp';
import searidersMobile from '../assets/portfolio/optimized/SearidersMobile.webp';
import removals from '../assets/portfolio/optimized/OkremovalsStatio.webp';
import removalsMobile from '../assets/portfolio/optimized/OkremovalsMobile.webp';
import ceramics from '../assets/portfolio/optimized/MojapasjaStatio.webp';
import ceramicsMobile from '../assets/portfolio/optimized/MojapasjaMobile.webp';
import transport from '../assets/portfolio/optimized/bbStatio.webp';
import transportMobile from '../assets/portfolio/optimized/bbMobile.webp';
import law from '../assets/portfolio/optimized/MichalStatio.webp';
import lawMobile from '../assets/portfolio/optimized/MichalMobile.webp';
import mojadwokat from '../assets/portfolio/optimized/MojadwokatStatio.webp';
import mojadwokatMobile from '../assets/portfolio/optimized/MojadwokatMobile.webp';
import type { ImageMetadata } from 'astro';

export interface VerifiedResult {
  label: string;
  value: string;
  period: string;
  source: string;
  context: string;
}
export interface Project {
  slug: string;
  name: string;
  category: string;
  summary: string;
  image: ImageMetadata;
  mobile: ImageMetadata;
  challenge: string;
  scope: string[];
  outcome: string;
  technologies: string[];
  url?: string;
  results?: VerifiedResult[];
  confidential?: boolean;
  previewDescription?: string;
  featuredOrder?: number;
  showOnWebsiteOffer?: boolean;
}

export const projectWebsites = {
  seariders: { name: 'Seariders', url: 'https://www.seariders.pl/' },
  mojadwokat: { name: 'MojAdwokat', url: 'https://www.mojadwokat.pl/' },
  okremovals: { name: 'OkRemovals', url: 'https://www.okremovals.com/' },
  bbtrans: { name: 'BBTrans', url: 'https://www.bbtrans.pl/' },
};

// Only add quantified results with a measurement period, source and permission.
export const projects: Project[] = [
  {
    slug: 'seariders',
    ...projectWebsites.seariders,
    featuredOrder: 0,
    showOnWebsiteOffer: true,
    previewDescription:
      'Zaprojektowaliśmy stronę organizatora rejsów motorówkami. Czytelnie pokazuje wycieczki, działa na telefonie i stanowi podstawę dalszego pozycjonowania w Google.',
    category: 'Turystyka i rekreacja',
    summary:
      'Strona organizatora rejsów motorówkami z prezentacją wycieczek. Przygotowaliśmy ją jako podstawę dalszego rozwoju widoczności w Google.',
    image: seariders,
    mobile: searidersMobile,
    challenge:
      'Firma organizująca rejsy turystyczne i ekstremalne potrzebowała miejsca, w którym można przedstawić różne wycieczki, w tym obserwację fok w ujściu Wisły.',
    scope: [
      'Projekt i wdrożenie strony od podstaw',
      'Prezentacja oferty rejsów',
      'Dostosowanie widoku do urządzeń mobilnych',
      'Prace nad pozycjonowaniem strony',
    ],
    outcome:
      'Powstała strona prezentująca ofertę rejsów i umożliwiająca dalszy rozwój treści oraz pozycjonowanie. Na zdjęciach pokazujemy rzeczywisty projekt APIXEL.',
    technologies: ['Next.js', 'Tailwind CSS', 'Vercel'],
  },
  {
    slug: 'mojadwokat',
    ...projectWebsites.mojadwokat,
    category: 'Kancelaria adwokacka · Warszawa',
    summary:
      'Strona kancelarii Martyny Kret: specjalizacje, podstrony usług i blog. Prowadzi od znalezienia odpowiedniej pomocy do kontaktu z kancelarią.',
    image: mojadwokat,
    mobile: mojadwokatMobile,
    challenge:
      'Osoba szukająca pomocy prawnej potrzebuje szybko rozpoznać właściwą specjalizację i znaleźć sposób kontaktu z kancelarią.',
    scope: [
      'Prezentacja kancelarii i specjalizacji',
      'Osobne podstrony usług prawnych',
      'Blog z artykułami',
      'Ścieżka kontaktu przez telefon i e-mail',
    ],
    outcome:
      'Strona łączy specjalizacje, treści usługowe i blog z kontaktem do kancelarii. Klient może przejść od opisu swojej potrzeby do właściwego sposobu kontaktu.',
    // The public site establishes the visible scope; do not guess its stack.
    technologies: [],
  },
  {
    slug: 'okremovals',
    ...projectWebsites.okremovals,
    featuredOrder: 2,
    showOnWebsiteOffer: true,
    previewDescription:
      'Przygotowaliśmy stronę firmy przeprowadzkowej z prezentacją usług i formularzem wyceny. Klient przekazuje w nim informacje potrzebne do zaplanowania przeprowadzki i przygotowania oferty.',
    category: 'Przeprowadzki i transport',
    summary:
      'Strona firmy przeprowadzkowej z formularzem wyceny. Formularz zbiera informacje potrzebne do przygotowania oferty przeprowadzki.',
    image: removals,
    mobile: removalsMobile,
    challenge:
      'Szczecińska firma obsługująca przeprowadzki międzynarodowe potrzebowała czytelnej prezentacji usług i sposobu zbierania danych potrzebnych do wyceny.',
    scope: [
      'Projekt i wdrożenie strony',
      'Prezentacja usług oraz procesu przeprowadzki',
      'Formularz zbierający kluczowe informacje do wyceny',
      'Dostosowanie strony do telefonu i komputera',
    ],
    outcome:
      'Wdrożono stronę z formularzem dopasowanym do procesu wyceny przeprowadzek. Zakres pytań porządkuje informacje przekazywane przez potencjalnego klienta.',
    technologies: ['Astro', 'React', 'Tailwind CSS'],
  },
  {
    slug: 'moja-pasja',
    name: 'Moja Pasja',
    category: 'Ceramika i rękodzieło',
    summary:
      'Strona pracowni ceramicznej z katalogiem produktów i obsługą płatności.',
    image: ceramics,
    mobile: ceramicsMobile,
    challenge:
      'Pracownia rękodzieła potrzebowała miejsca do prezentacji wyrobów artystycznej ceramiki i ich sprzedaży.',
    scope: [
      'Witryna pracowni i portfolio',
      'Katalog wyrobów',
      'Obsługa sklepu',
      'Integracja płatności Stripe',
    ],
    outcome:
      'Powstała witryna łącząca prezentację pracowni z katalogiem wyrobów oraz płatnościami Stripe.',
    technologies: ['Astro', 'Tailwind CSS', 'Stripe'],
  },
  {
    slug: 'bbtrans',
    ...projectWebsites.bbtrans,
    featuredOrder: 1,
    previewDescription:
      'Stworzyliśmy stronę firmy transportowej i logistycznej. Porządkuje ofertę spedycji, magazynowania i transportu, ułatwiając znalezienie potrzebnej usługi na komputerze i telefonie.',
    category: 'Transport i logistyka',
    summary:
      'Strona firmowa przedstawiająca usługi transportu, logistyki i magazynowania.',
    image: transport,
    mobile: transportMobile,
    challenge:
      'Firma logistyczna ze Szczecina potrzebowała strony prezentującej spedycję krajową i międzynarodową, logistykę oraz magazynowanie.',
    scope: [
      'Wdrożenie strony firmowej od podstaw',
      'Prezentacja usług logistycznych',
      'Dostosowanie do urządzeń mobilnych',
    ],
    outcome:
      'Uruchomiono responsywną stronę wizytówkową z ofertą firmy i informacjami dla potencjalnych klientów.',
    technologies: ['Astro', 'Tailwind CSS', 'Vercel'],
  },
  {
    slug: 'kancelaria',
    name: 'Kancelaria adwokacka',
    category: 'Usługi prawne · Warszawa',
    summary:
      'Strona wizerunkowa i pozycjonowanie dla kancelarii zajmującej się sprawami kredytów CHF. Marka pozostaje poufna.',
    image: law,
    mobile: lawMobile,
    confidential: true,
    challenge:
      'Warszawska kancelaria potrzebowała strony wizerunkowej dla usług dotyczących kredytów walutowych CHF.',
    scope: [
      'Witryna wizerunkowa',
      'Dostosowanie do urządzeń mobilnych',
      'Pozycjonowanie na rynku warszawskim',
    ],
    outcome:
      'Ze względu na poufność nie publikujemy szczegółowych danych klienta ani osobnego studium przypadku.',
    technologies: ['Astro', 'Tailwind CSS'],
  },
];

// Public projects explicitly selected for the homepage widget.
export const featuredProjects = projects
  .filter(
    (project) =>
      project.featuredOrder !== undefined &&
      !!project.url &&
      !project.confidential,
  )
  .sort((a, b) => a.featuredOrder! - b.featuredOrder!);

export const websiteProjects = projects.filter(
  (project) => project.showOnWebsiteOffer && !project.confidential,
);
