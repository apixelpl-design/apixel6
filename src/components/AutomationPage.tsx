/* ═══════════════════════════════════════════════════════
   AutomationPage — /uslugi/automatyzacja
   "Automatyzacja procesów, AI i dedykowane aplikacje" service detail page
   ═══════════════════════════════════════════════════════ */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './VisibilityPage.module.css';

const deliverables = [
    {
        icon: '🤖',
        title: 'Chatboty i asystenci AI',
        desc: 'Wdrożymy inteligentnego asystenta, który odpowiada na pytania klientów 24/7, kwalifikuje leady i umawia spotkania — bez udziału człowieka.',
    },
    {
        icon: '🔗',
        title: 'Integracje narzędzi (no-code)',
        desc: 'Połączymy CRM, sklep, email marketing, arkusze i wszystkie narzędzia jakich używasz. Dane przepływają automatycznie, bez ręcznego przepisywania.',
    },
    {
        icon: '📧',
        title: 'Automatyzacja emaili i komunikacji',
        desc: 'Sekwencje follow-up, powiadomienia do klientów, raporty automatycznie wysyłane do Twojego zespołu. Zero ręcznego wysyłania.',
    },
    {
        icon: '📋',
        title: 'Automatyzacja procesów sprzedaży',
        desc: 'Oferty, faktury, przypomnienia, statusy zamówień — wszystko co powtarzasz codziennie, zautomatyzujemy. Twój czas wróci do Ciebie.',
    },
    {
        icon: '💻',
        title: 'Dedykowane aplikacje dla firm',
        desc: 'Gdy gotowe narzędzia nie wystarczają — projektujemy i wdrażamy aplikacje webowe szyte na miarę potrzeb Twojego biznesu. Panel dla pracowników, system zamówień, CRM — cokolwiek potrzebujesz.',
    },
    {
        icon: '📊',
        title: 'Dashboardy i raporty w czasie rzeczywistym',
        desc: 'Automatyczne raporty i dashboardy, które zbierają dane z różnych źródeł w jedno miejsce. Decyzje oparte na faktach, nie na przeczuciach.',
    },
    {
        icon: '⚙️',
        title: 'Make, n8n, Zapier i inne platformy',
        desc: 'Pracujemy z najlepszymi platformami automatyzacji. Wybierzemy rozwiązanie dopasowane do Twojego budżetu i potrzeb technicznych.',
    },
];

const processSteps = [
    {
        title: '1. Mapujemy Twoje procesy (Gdzie tracimy czas?)',
        content: 'Rozmawiamy o tym, co Ty i Twój zespół robicie codziennie ręcznie. Identyfikujemy powtarzalne zadania, które można zautomatyzować i szacujemy, ile czasu i pieniędzy to zaoszczędzi.',
    },
    {
        title: '2. Projektujemy przepływ pracy (Jak to połączyć?)',
        content: 'Tworzymy schemat automatyzacji — krok po kroku, bez technicznego żargonu. Zatwierdzasz logikę zanim cokolwiek wdrożymy. Testujemy każdy scenariusz.',
    },
    {
        title: '3. Wdrażamy i monitorujemy (Działa 24/7)',
        content: 'Uruchamiamy automatyzacje, szkolimy Cię z obsługi i monitorujemy działanie. Jeśli coś pójdzie nie tak, reakcja gwarantowana w ciągu kilku godzin.',
    },
];

export function AutomationPage() {
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
                    <span className={`${styles.heroLabel} animate-fade-slide-up delay-100`}>05 / AUTOMATYZACJA I APLIKACJE</span>
                    <h1 className={`${styles.heroTitle} animate-fade-slide-up delay-200`}>
                        Przestań robić to,
                        <br />
                        co może zrobić <span className={styles.accent}>technologia.</span>
                    </h1>
                    <p className={`${styles.heroDesc} animate-fade-slide-up delay-400`}>
                        Powtarzalne zadania kradną Twój najcenniejszy zasób — czas.
                        Automatyzujemy procesy, wdrażamy AI i tworzymy dedykowane aplikacje,
                        żebyś mógł skupić się na tym, co naprawdę ważne.
                    </p>
                </div>
            </header>

            {/* ── Problem section ── */}
            <section className={styles.problemSection}>
                <div className={styles.sectionInner}>
                    <div className={styles.problemGrid}>
                        <div ref={problemRef} className={`${styles.problemLeft} reveal-left`}>
                            <h2 className={styles.sectionHeading}>
                                Ile czasu
                                <br />
                                <span className={styles.accent}>marnujesz dziennie?</span>
                            </h2>
                        </div>
                        <div ref={problemTextRef} className={`${styles.problemRight} reveal`}>
                            <p className={styles.bodyText}>
                                Ręczne przepisywanie danych między arkuszami, wysyłanie tych samych
                                emaili, kopiowanie zamówień do systemu — to godziny pracy tygodniowo,
                                które <strong>nie generują żadnej wartości</strong>.
                            </p>
                            <p className={styles.bodyText}>
                                Automatyzacja to nie tylko oszczędność czasu. To eliminacja błędów
                                ludzkich, szybsza obsługa klientów i skalowalność bez zatrudniania
                                kolejnych osób. <strong>Robisz więcej, płacąc mniej</strong>.
                            </p>
                            <p className={styles.bodyText}>
                                Gdy gotowe narzędzia nie wystarczają, projektujemy
                                <strong> dedykowane aplikacje webowe</strong> — od paneli
                                pracowniczych, przez systemy CRM, po wewnętrzne platformy zarządzania.
                                Każde rozwiązanie szyte na miarę Twojego biznesu.
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
                                Jak wdrażamy
                                <br />
                                <span className={styles.accent}>automatyzację i aplikacje?</span>
                            </h2>
                        </div>
                        <div ref={processTextRef} className={`${styles.problemRight} reveal`}>
                            <p className={styles.bodyText}>
                                Nie wrzucamy gotowego rozwiązania i nie znikamy.
                                Przechodzimy przez <strong>trzyetapowy proces</strong>, który gwarantuje,
                                że automatyzacja naprawdę działa w Twoim konkretnym biznesie.
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
                        Automatyzacja i aplikacje, <span className={styles.accent}>które działają.</span>
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
                            Zobacz nasz proces od audytu Twojego biznesu, przez wdrożenie automatyzacji, aż po comiesięczne wsparcie.
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
                        Zacznij odzyskiwać
                        <br />
                        <span className={styles.accent}>swój czas już dziś.</span>
                    </h2>
                    <p className={styles.ctaDesc}>
                        Bezpłatna analiza procesów w Twojej firmie.
                        Pokażemy Ci, co można zautomatyzować i ile to zaoszczędzi.
                    </p>
                    <a href="mailto:kontakt@apixel.pl" className={styles.ctaButton}>
                        DARMOWA KONSULTACJA →
                    </a>
                </div>
            </section>
        </main>
    );
}
