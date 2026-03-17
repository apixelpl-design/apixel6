/* ═══════════════════════════════════════════════════════
   Shared service card data
   Used by both homepage Services and /uslugi ServicesPage
   ═══════════════════════════════════════════════════════ */

export interface ServiceCard {
    number: string;
    badge: string;
    title: string;
    subtitle: string;
    items: string[];
    variant: 'black' | 'white' | 'red';
    href: string;
}

export const services: ServiceCard[] = [
    {
        number: '01',
        badge: 'PODSTAWA',
        title: 'CHCĘ BYĆ',
        subtitle: 'WIDOCZNY W INTERNECIE',
        items: [
            'Zbudujemy wizerunek w social mediach, który budzi zaufanie',
            'Sprawimy, że klienci szybko znajdą Cię w wynikach Google',
            'Zmienimy profil w Google w magnes na zapytania',
            'Udowodnimy wyniki dzięki przejrzystym raportom',
        ],
        variant: 'black',
        href: '/widocznosc',
    },
    {
        number: '02',
        badge: 'DODATKOWO',
        title: 'CHCĘ ORYGINALNY',
        subtitle: 'CONTENT',
        items: [
            'Stworzymy zdjęcia, które skutecznie sprzedają Twoje produkty',
            'Nagramy wideo, które zatrzymuje uwagę i buduje zaufanie',
            'Pokażemy profesjonalne i ludzkie oblicze Twojej marki',
            'Zdobędziemy nowe zasięgi dzięki dynamicznym Rolkom i TikTokom',
        ],
        variant: 'white',
        href: '/uslugi/content',
    },
    {
        number: '03',
        badge: 'DODATKOWO',
        title: 'CHCĘ PŁATNE',
        subtitle: 'KAMPANIE REKLAMOWE',
        items: [
            'Umieścimy Cię na szczycie wyników wyszukiwania Google',
            'Precyzyjnie dotrzemy do Twojej grupy docelowej w Google oraz Meta (Facebook/Instagram)',
            'Zamienimy niezdecydowanych odwiedzających w kupujących klientów',
            'Zadbamy o to, by każda złotówka z budżetu pracowała na zysk',
        ],
        variant: 'red',
        href: '/uslugi/reklamy',
    },
];
