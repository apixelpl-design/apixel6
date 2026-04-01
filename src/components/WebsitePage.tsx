/* ═══════════════════════════════════════════════════════
   WebsitePage — /uslugi/strona
   "Tworzenie stron internetowych" service detail page
   ═══════════════════════════════════════════════════════ */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './VisibilityPage.module.css';

const deliverables = [
    {
        icon: '🎨',
        title: 'Projekt i design',
        desc: 'Indywidualny projekt graficzny dopasowany do Twojej marki. Żadnych szablonów — każda strona wygląda i działa inaczej, bo każda firma jest inna.',
    },
    {
        icon: '📱',
        title: 'Responsywność (RWD)',
        desc: 'Strona działa perfekcyjnie na telefonie, tablecie i komputerze. Ponad 60% ruchu pochodzi z mobile — Twoja strona musi wyglądać tam świetnie.',
    },
    {
        icon: '⚡',
        title: 'Szybkość i wydajność',
        desc: 'Optymalizacja Core Web Vitals, cache, kompresja obrazów. Każda sekunda opóźnienia kosztuje konwersje — u nas ładujesz się błyskawicznie.',
    },
    {
        icon: '🔍',
        title: 'SEO od podstaw',
        desc: 'Struktura URL, meta tagi, schema.org, sitemap, mapy witryny. Budujemy stronę pod standardy Google już na etapie kodu.',
    },
    {
        icon: '🔒',
        title: 'Bezpieczeństwo',
        desc: 'Certyfikat SSL, regularne aktualizacje, ochrona przed atakami. Twoja strona i dane klientów są bezpieczne.',
    },
    {
        icon: '📊',
        title: 'Analityka i śledzenie',
        desc: 'Google Analytics 4, Google Search Console, integracja z pikselami reklamowymi. Wiesz, kto odwiedza Twoją stronę i co robi.',
    },
];

const processSteps = [
    {
        title: '1. Brief i strategia (Poznajemy Twój biznes)',
        content: 'Zaczynamy od rozmowy o Twojej firmie, klientach i celach. Sprawdzamy konkurencję i analizujemy, jak powinna wyglądać strona, która naprawdę sprzedaje w Twojej branży.',
    },
    {
        title: '2. Projekt i prototyp (Zatwierdzasz zanim kodujemy)',
        content: 'Tworzymy makiety (wireframes) i projekt graficzny. Widzisz, jak strona będzie wyglądać zanim napisany zostanie pierwszy wiersz kodu. Możesz swobodnie zgłaszać poprawki.',
    },
    {
        title: '3. Wdrożenie i testy (Budujemy i dopieszczamy)',
        content: 'Kodujemy stronę z dbałością o szczegóły — wydajność, SEO i dostępność. Testujemy na różnych urządzeniach i przeglądarkach. Strona trafia do Ciebie dopiero kiedy jest idealna.',
    },
];

export function WebsitePage() {
    const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(0);
    const problemRef = useScrollReveal<HTMLDivElement>();
    const problemTextRef = useScrollReveal<HTMLDivElement>();
    const processRef = useScrollReveal<HTMLDivElement>();
    const processTextRef = useScrollReveal<HTMLDivElement>();
    const delLabelRef = useScrollReveal<HTMLDivElement>();
    const delGridRef = useScrollReveal<HTMLDivElement>({ stagger: true });
    const ctaRef = useScrollReveal<HTMLElement>();

    return (
        <main className={styles.page}>
            {/* ── Hero ── */}
            <header className={styles.hero}>
                <div className={styles.heroInner}>
                    <Link to="/uslugi" className={styles.backLink}>
                        ← Usługi
                    </Link>
                    <span className={`${styles.heroLabel} animate-fade-slide-up delay-100`}>04 / STRONA INTERNETOWA</span>
                    <h1 className={`${styles.heroTitle} animate-fade-slide-up delay-200`}>
                        Strona, która
                        <br />
                        <span className={styles.accent}>pracuje dla Ciebie.</span>
                    </h1>
                    <p className={`${styles.heroDesc} animate-fade-slide-up delay-400`}>
                        Twoja strona to najważniejszy pracownik handlowy.
                        Pracuje 24/7, obsługuje setki klientów jednocześnie
                        i nigdy nie bierze urlopu. Tylko musi być dobra.
                    </p>
                </div>
            </header>

            {/* ── Problem section ── */}
            <section className={styles.problemSection}>
                <div className={styles.sectionInner}>
                    <div className={styles.problemGrid}>
                        <div ref={problemRef} className={`${styles.problemLeft} reveal-left`}>
                            <h2 className={styles.sectionHeading}>
                                Dlaczego warto
                                <br />
                                <span className={styles.accent}>nam zaufać?</span>
                            </h2>
                        </div>
                        <div ref={problemTextRef} className={`${styles.problemRight} reveal`}>
                            <p className={styles.bodyText}>
                                Większość stron internetowych to ładne wizytówki, które nic nie robią.
                                Wyglądają dobrze, ale nie sprzedają, nie pojawiają się w Google
                                i nie zbierają leadów. To <strong>zmarnowana inwestycja</strong>.
                            </p>
                            <p className={styles.bodyText}>
                                My projektujemy strony z myślą o konwersji — każdy element,
                                od nagłówka po przycisk CTA, ma swoje strategiczne miejsce.
                                Do tego optymalizujemy pod SEO od pierwszego dnia, bo
                                <strong> widoczność i sprzedaż</strong> to dwie strony tej samej monety.
                            </p>
                            <p className={styles.bodyText}>
                                Nie używamy szablonów. Każda strona jest projektem tworzonym od zera,
                                dopasowanym do Twojej marki, branży i grupy docelowej.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Process section ── */}
            <section className={styles.processSection}>
                <div className={styles.sectionInner}>
                    <div className={styles.problemGrid}>
                        <div ref={processRef} className={`${styles.problemLeft} reveal-left`}>
                            <h2 className={styles.sectionHeading}>
                                Jak tworzymy
                                <br />
                                <span className={styles.accent}>Twoją stronę?</span>
                            </h2>
                        </div>
                        <div ref={processTextRef} className={`${styles.problemRight} reveal`}>
                            <p className={styles.bodyText}>
                                Mamy <strong>sprawdzony, trzystopniowy proces</strong>, który gwarantuje,
                                że otrzymasz dokładnie to, czego potrzebujesz — i nic czego nie chcesz.
                            </p>

                            <div className={styles.accordion}>
                                {processSteps.map((step, index) => {
                                    const isOpen = openAccordionIndex === index;
                                    return (
                                        <div
                                            key={index}
                                            className={`${styles.accordionItem} ${isOpen ? styles.isOpen : ''}`}
                                        >
                                            <button
                                                className={styles.accordionHeader}
                                                onClick={() => setOpenAccordionIndex(isOpen ? null : index)}
                                                aria-expanded={isOpen}
                                            >
                                                <span className={styles.accordionTitle}>{step.title}</span>
                                                <span className={styles.accordionIcon}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M6 9l6 6 6-6" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <div
                                                className={styles.accordionBody}
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                                                    transition: 'grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                                                }}
                                            >
                                                <div style={{ overflow: 'hidden' }}>
                                                    <div className={styles.accordionContent}>
                                                        {step.content}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Deliverables ── */}
            <section className={styles.deliverablesSection}>
                <div className={styles.sectionInner}>
                    <span ref={delLabelRef} className={`${styles.sectionLabel} reveal`}>CO DOSTAJESZ</span>
                    <h2 className={styles.sectionHeading}>
                        Kompletna strona <span className={styles.accent}>bez kompromisów.</span>
                    </h2>

                    <div ref={delGridRef} className={styles.delGrid}>
                        {deliverables.map((d) => (
                            <div key={d.title} className={`${styles.delCard} reveal-child`}>
                                <span className={styles.delIcon}>{d.icon}</span>
                                <h3 className={styles.delTitle}>{d.title}</h3>
                                <p className={styles.delDesc}>{d.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Współpraca Banner ── */}
            <section className={styles.bannerSection}>
                <div className={styles.bannerCard}>
                    <div className={styles.bannerContent}>
                        <h3 className={styles.bannerTitle}>
                            Chcesz wiedzieć, jak wygląda współpraca z nami?
                        </h3>
                        <p className={styles.bannerDesc}>
                            Zobacz nasz proces krok po kroku — od briefu przez projekt, aż po wdrożenie i przekazanie strony.
                        </p>
                    </div>
                    <Link to="/wspolpraca" className={styles.bannerButton}>
                        Jak działamy? →
                    </Link>
                </div>
            </section>

            {/* ── CTA ── */}
            <section ref={ctaRef} className={`${styles.ctaSection} reveal-scale`}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.ctaTitle}>
                        Gotowy na stronę,
                        <br />
                        <span className={styles.accent}>która naprawdę sprzedaje?</span>
                    </h2>
                    <p className={styles.ctaDesc}>
                        Bezpłatna wycena i konsultacja. Powiedz nam o swoim projekcie
                        — wrócimy z propozycją w 24 godziny.
                    </p>
                    <a href="mailto:kontakt@apixel.pl" className={styles.ctaButton}>
                        DARMOWA WYCENA →
                    </a>
                </div>
            </section>
        </main>
    );
}
