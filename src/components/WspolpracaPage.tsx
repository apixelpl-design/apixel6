/* ═══════════════════════════════════════════════════════
   WspolpracaPage — /wspolpraca
   "Jak dokładnie działamy" — storytelling page
   ═══════════════════════════════════════════════════════ */
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './WspolpracaPage.module.css';

const steps = [
    {
        number: '01',
        title: 'Audyt marketingu i technologii',
        subtitle: 'Sprawdzamy, gdzie dziś stoisz',
        desc: 'Zanim cokolwiek zdefiniujemy, musimy poznać Twój biznes. Nie zaczynamy od gotowych szablonów — audytujemy Twoją faktyczną sytuację, by znaleźć największe dźwignie wzrostu.',
        details: [
            'Prześwietlamy cyfrową obecność: profile w social mediach, Google Business oraz aktualną stronę internetową',
            'Analizujemy wydajność witryny pod kątem UX (wygody klienta) oraz optymalizacji SEO',
            'Mapujemy ręczne, powtarzalne procesy operacyjne w Twojej firmie pod kątem możliwości automatyzacji i wdrożenia AI',
            'Rozmawiamy o DNA Twojej marki — Twoich przewagach, grupie docelowej i tym, jak chcesz być odbierany na rynku',
            'Zebrane dane zamieniamy w konkretny plan na marketing, technologię i widoczność',
        ],
    },
    {
        number: '02',
        title: 'Wdrożenie i aktywna obsługa',
        subtitle: 'Budujemy fundamenty i regularnie działamy',
        desc: 'Bierzemy technologię i marketing na siebie. Dostarczamy skrojone na miarę rozwiązania, prowadząc Twoje projekty tak, byś mógł skupić się wyłącznie na prowadzeniu biznesu.',
        details: [
            'Tam gdzie to potrzebne, projektujemy i wdrażamy szybkie strony internetowe oraz systemy rezerwacji/sprzedaży',
            'Automatyzujemy uciążliwe procesy i tworzymy dedykowane aplikacje webowe odciążające zespół',
            'Obejmujemy pełne zarządzanie profilami w mediach społecznościowych i moderację wizytówek (np. odpowiadanie na opinie)',
            'Regularnie (co 2 lub 4 tygodnie) zjawiamy się u Ciebie z kamerą, by nagrywać autentyczny materiał foto/wideo dla Twoich profili',
            'Tworzymy merytoryczne i branżowe publikacje, budując Twój autorytet w sieci',
            'Dbamy o jednolitą, spójną architekturę całego przekazu na każdym polu styku z nowym klientem',
        ],
    },
    {
        number: '03',
        title: 'Raportowanie i skalowanie',
        subtitle: 'Mierzymy, wyciągamy wnioski, rośniemy',
        desc: 'Nie zostawiamy Cię z obietnicami. Co cykl pokazujemy rzetelne liczby, wspólnie omawiamy efekty rynkowe i od razu planujemy, jak wygenerować jeszcze więcej wartości.',
        details: [
            'Dostarczamy comiesięczny raport bez ściemy — co zostało zrobione, co zyskaliśmy, co ulepszamy dalej',
            'Proaktywnie wskazujemy nowe obszary do optymalizacji i potencjał na nowe automatyzacje oszczędzające koszty',
            'Reagujemy na najnowsze trendy społecznościowe, aktualizując formaty i komunikację w locie',
            'Jesteśmy dostępnymi, szybkimi w reakcji partnerami — bez barier korporacyjnych',
            'Wyznaczamy nowe cele biznesowe. Pracujemy na mierzalny rozwój Twojej bazy klientów.',
        ],
    },
];

export function WspolpracaPage() {
    const timelineLabelRef = useScrollReveal<HTMLDivElement>();
    const stepsRef = useScrollReveal<HTMLDivElement>({ stagger: true });
    const bridgeRef = useScrollReveal<HTMLDivElement>();
    const ctaRef = useScrollReveal<HTMLDivElement>();

    return (
        <main>
            {/* ── Hero ── */}
            <header className={styles.hero}>
                <div className={styles.heroInner}>
                    <Link to="/uslugi" className={styles.backLink}>
                        ← Usługi
                    </Link>
                    <span className={`${styles.heroLabel} animate-fade-slide-up delay-100`}>
                        WSPÓŁPRACA KROK PO KROKU
                    </span>
                    <h1 className={`${styles.heroTitle} animate-fade-slide-up delay-200`}>
                        Jak dokładnie
                        <br />
                        <span className={styles.accent}>działamy?</span>
                    </h1>
                    <p className={`${styles.heroDesc} animate-fade-slide-up delay-400`}>
                        Nie wierzysz w agencje, które obiecują cuda? My też nie.
                        Dlatego gramy w otwarte karty. Tak wygląda z nami współpraca
                        — od audytu IT i marketingu, po wdrażanie rozwiązań i ich rozwój.
                    </p>
                </div>
            </header>

            {/* ── Timeline / Storytelling ── */}
            <section className={styles.timelineSection}>
                <div className={styles.timelineInner}>
                    <div ref={timelineLabelRef} className="reveal">
                        <span className={styles.timelineLabel}>Twoja droga z nami</span>
                        <h2 className={styles.timelineHeading}>
                            Trzy etapy, które budują
                            <br />
                            <span className={styles.accent}>Twój biznes w sieci.</span>
                        </h2>
                        <p className={styles.timelineSubhead}>
                            Każda współpraca zaczyna się od zrozumienia, w jakim miejscu jesteś. Zabezpieczamy fundamenty 
                            technologiczne, automatyzujemy pracę i prowadzimy marketing. To proces, 
                            który zdejmuje z Ciebie ciężar operacyjny i przyspiesza wzrost.
                        </p>
                    </div>

                    <div ref={stepsRef} className={styles.timelineSteps}>
                        {steps.map((step) => (
                            <div key={step.number} className={`${styles.timelineStep} reveal-child`}>
                                <div className={styles.stepNumberWrapper}>
                                    <span className={styles.stepNumber}>{step.number}</span>
                                </div>
                                <div className={styles.stepContent}>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                    <p className={styles.stepDesc}>
                                        <strong style={{ color: 'var(--apx-black)', display: 'block', marginBottom: '8px', fontSize: '15px' }}>
                                            {step.subtitle}
                                        </strong>
                                        {step.desc}
                                    </p>
                                    <ul className={styles.stepDetails}>
                                        {step.details.map((detail, i) => (
                                            <li key={i} className={styles.stepDetailItem}>
                                                <span className={styles.stepBullet} />
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Bridge "Co dalej?" ── */}
            <section className={styles.bridgeSection}>
                <div ref={bridgeRef} className={`${styles.bridgeInner} reveal`}>
                    <h2 className={styles.bridgeTitle}>
                        I tak co miesiąc — <span className={styles.accent}>rosniesz.</span>
                    </h2>
                    <p className={styles.bridgeDesc}>
                        W pierwszym kwartale stawiamy fundamenty i organizujemy chaos. Piszemy kod, 
                        układamy procesy, kręcimy wideo. Po 3 do 6 miesiącach pracy widzisz już na liczbach, 
                        że Twoja firma funkcjonuje sprawniej, a marketing po prostu działa.
                    </p>
                    <p className={styles.bridgeDesc}>
                        Nie trzymamy Cię umową — trzymamy wynikami.
                    </p>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className={styles.ctaSection}>
                <div ref={ctaRef} className={`${styles.ctaInner} reveal-scale`}>
                    <h2 className={styles.ctaTitle}>
                        Porozmawiajmy
                        <br />
                        <span className={styles.accent}>o Twoim biznesie.</span>
                    </h2>
                    <p className={styles.ctaDesc}>
                        Bez zobowiązań, bez sprzedażowej gadki. Opowiesz, czym się
                        zajmujesz — a my pokażemy, co możemy zrobić.
                    </p>
                    <Link to="/kontakt" className={styles.ctaButton}>
                        Umów się na rozmowę
                    </Link>
                </div>
            </section>
        </main>
    );
}
