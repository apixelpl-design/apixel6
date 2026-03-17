/* ═══════════════════════════════════════════════════════
   VisibilityPage — /widocznosc
   "Widoczność w sieci" service detail page
   ═══════════════════════════════════════════════════════ */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './VisibilityPage.module.css';

const deliverables = [
    {
        icon: '🔍',
        title: 'Pozycjonowanie SEO',
        desc: 'Audyt techniczny, optymalizacja on-site, strategia treści i budowa autorytetu domeny, by Twoja strona pojawiała się tam, gdzie szukają Twoi klienci.',
    },
    {
        icon: '📍',
        title: 'Wizytówka Google Business',
        desc: 'Profesjonalnie prowadzony profil w Google — zdjęcia, opinie, posty, godziny otwarcia. Pierwszy punkt kontaktu z klientem lokalnym.',
    },
    {
        icon: '📱',
        title: 'Profile w social mediach',
        desc: 'Obsługa kont na Facebooku, Instagramie, LinkedIn i Google Business. Regularne publikacje, jednolita identyfikacja wizualna.',
    },
    {
        icon: '🔗',
        title: 'Backlinki i autorytet',
        desc: 'Pozyskiwanie jakościowych linków z branżowych katalogów, portali i serwisów tematycznych. Wzmacnianie pozycji Twojej domeny.',
    },
    {
        icon: '🌐',
        title: 'Strona internetowa',
        desc: 'Nie masz strony? Zaprojektujemy ją od zera — szybką, responsywną, zoptymalizowaną pod wyszukiwarki. Masz stronę? Zrobimy audyt i wdrożymy poprawki.',
    },
    {
        icon: '📊',
        title: 'Raportowanie miesięczne',
        desc: 'Co miesiąc otrzymujesz przejrzysty raport: pozycje fraz, ruch organiczny, nowe leady. Żadnych ukrytych danych — pełna transparentność.',
    },
];

const processSteps = [
    {
        title: '1. Zaczynamy od faktów (Audyt i strategia)',
        content: 'Prześwietlamy Twoją stronę i działania konkurencji. Sprawdzamy, jakich słów kluczowych rzeczywiście używają Twoi klienci. Zamiast działać na oślep, budujemy plan oparty na liczbach.'
    },
    {
        title: '2. Naprawiamy fundamenty (Optymalizacja On-Site)',
        content: 'Google musi bez problemu czytać Twoją witrynę. Eliminujemy błędy techniczne, przyspieszamy ładowanie i przebudowujemy treści tak, by naturalnie odpowiadały na intencje wyszukujących.'
    },
    {
        title: '3. Skalujemy zaufanie (Link Building & Off-Site)',
        content: 'Sama dobra strona to za mało. Krok po kroku zdobywamy dla Ciebie mocne linki z zewnętrznych, zaufanych portali. Tym samym dajemy algorytmom wyraźny sygnał, że jesteś liderem w swojej branży.'
    }
];

export function VisibilityPage() {
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
                    <span className={`${styles.heroLabel} animate-fade-slide-up delay-100`}>01 / WIDOCZNOŚĆ W SIECI</span>
                    <h1 className={`${styles.heroTitle} animate-fade-slide-up delay-200`}>
                        Klient, który Cię
                        <br />
                        nie znajdzie — <span className={styles.accent}>nie kupi.</span>
                    </h1>
                    <p className={`${styles.heroDesc} animate-fade-slide-up delay-400`}>
                        97% konsumentów szuka lokalnych firm w internecie.
                        Jeśli Twoja firma nie pojawia się w wynikach — tracisz klientów
                        na rzecz konkurencji, która tam jest.
                    </p>
                </div>
            </header>

            {/* ── Problem section ── */}
            <section className={styles.problemSection}>
                <div className={styles.sectionInner}>
                    <div className={styles.problemGrid}>
                        <div ref={problemRef} className={`${styles.problemLeft} reveal-left`}>
                            <h2 className={styles.sectionHeading}>
                                Dlaczego widoczność
                                <br />
                                jest <span className={styles.accent}>fundamentem?</span>
                            </h2>
                        </div>
                        <div ref={problemTextRef} className={`${styles.problemRight} reveal`}>
                            <p className={styles.bodyText}>
                                Nie chodzi o to, żeby „być w internecie". Chodzi o to, żeby być
                                <strong> tam, gdzie klient podejmuje decyzję</strong> — w wynikach
                                Google, na mapach, w social mediach .
                            </p>
                            <p className={styles.bodyText}>
                                Budowanie widoczności to proces: analiza fraz kluczowych,
                                optymalizacja strony, regularne publikacje i systematyczne
                                wzmacnianie autorytetu domeny. Efekty nie przychodzą z dnia na
                                dzień — ale kiedy się pojawią, pracują na Ciebie non-stop.
                            </p>
                            <p className={styles.bodyText}>
                                Twoja konkurencja już to robi. Pytanie brzmi: czy pozwolisz
                                im być przed Tobą?
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
                                Jak budujemy
                                <br />
                                <span className={styles.accent}>widoczność?</span>
                            </h2>
                        </div>
                        <div ref={processTextRef} className={`${styles.problemRight} reveal`}>
                            <p className={styles.bodyText}>
                                Nie wierzymy w czary ani w "szybkie wyniki". Wierzymy w
                                <strong> sprawdzony, powtarzalny proces</strong>, który krok po kroku
                                zwiększa Twój udział w rynku.
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
                    <span ref={delLabelRef} className={`${styles.sectionLabel} reveal`}>CO ROBIMY DLA CIEBIE</span>
                    <h2 className={styles.sectionHeading}>
                        Kompletny zakres <span className={styles.accent}>działań.</span>
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
            <section style={{
                background: 'var(--apx-white)',
                padding: '80px 80px',
            }}>
                <div style={{
                    maxWidth: '1440px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '40px',
                    padding: '48px 56px',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderLeft: '4px solid var(--apx-red)',
                }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '22px',
                            fontWeight: 700,
                            color: 'var(--apx-black)',
                            marginBottom: '8px',
                        }}>
                            Chcesz wiedzieć, jak wygląda współpraca z nami?
                        </h3>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '15px',
                            lineHeight: 1.6,
                            color: '#555',
                            margin: 0,
                        }}>
                            Zobacz nasz proces krok po kroku — od audytu Twojej obecności, przez aktywne prowadzenie, aż po comiesięczne raporty.
                        </p>
                    </div>
                    <Link
                        to="/wspolpraca"
                        style={{
                            flexShrink: 0,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '48px',
                            padding: '0 32px',
                            background: 'var(--apx-black)',
                            color: 'var(--apx-white)',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            fontWeight: 600,
                            textTransform: 'uppercase' as const,
                            letterSpacing: '0.1em',
                            transition: 'background 0.2s ease, transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--apx-red)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--apx-black)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        Jak działamy? →
                    </Link>
                </div>
            </section>

            {/* ── CTA ── */}
            <section ref={ctaRef} className={`${styles.ctaSection} reveal-scale`}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.ctaTitle}>
                        Gotowy, żeby Twoi klienci
                        <br />
                        <span className={styles.accent}>Cię znaleźli?</span>
                    </h2>
                    <p className={styles.ctaDesc}>
                        Porozmawiajmy o widoczności Twojej firmy.
                        Bezpłatna konsultacja, bez zobowiązań.
                    </p>
                    <a href="mailto:kontakt@apixel.pl" className={styles.ctaButton}>
                        DARMOWA WYCENA →
                    </a>
                </div>
            </section>
        </main>
    );
}
