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
        title: 'Audyt obecności',
        subtitle: 'Sprawdzamy, gdzie dziś stoisz',
        desc: 'Zanim cokolwiek zrobimy, musimy wiedzieć, z czym pracujemy. Nie zaczynamy od szablonu — zaczynamy od Twojej rzeczywistości.',
        details: [
            'Prześwietlamy wszystkie Twoje profile w mediach społecznościowych — Facebook, Instagram, LinkedIn, Google Business',
            'Analizujemy Twoją wizytówkę Google: zdjęcia, opinie, kompletność danych',
            'Sprawdzamy ranking Twojej domeny i pozycje na kluczowe frazy — gdzie jesteś, a gdzie powinieneś być',
            'Oceniamy jakość materiałów wizualnych: zdjęcia, logo, spójność wizerunkowa',
            'Rozmawiamy o Twoim „pomyśle na markę" (brand DNA) — kim jesteś, jak chcesz być postrzegany, czym się wyróżniasz',
            'Wszystko dokumentujemy i analizujemy w kontekście widoczności, słów kluczowych i SEO',
        ],
    },
    {
        number: '02',
        title: 'Aktywne prowadzenie obecności',
        subtitle: 'Działamy — codziennie, konsekwentnie',
        desc: 'W pełni obsługujemy Twoją stronę marketingową — całą obecność w internecie. Nie działamy na szablonach. Wszystko jest dostosowane do typu i rodzaju Twojego biznesu, jak i osób, które go tworzą.',
        details: [
            'Prowadzimy profile na wszystkich potrzebnych dla Twojego biznesu mediach społecznościowych',
            'Aktualizujemy i optymalizujemy wizytówki Google i branżowe katalogi',
            'Raz na 2 tygodnie lub raz na miesiąc przyjeżdżamy do Twojego miejsca pracy — robimy profesjonalne zdjęcia i filmy, z których tworzymy content',
            'Tworzymy filmy promujące Twój brand — pokazujemy Ciebie, Twój zespół i to, co robicie najlepiej',
            'Tworzymy profesjonalne artykuły — wizerunkowe i branżowe — i publikujemy je na portalach i blogach',
            'Odpowiadamy na opinie Google i Facebook w Twoim imieniu — profesjonalnie, w Twoim tonie',
            'Dbamy o spójność Twojego przekazu na każdym kanale, w każdym punkcie kontaktu z klientem',
        ],
    },
    {
        number: '03',
        title: 'Raportowanie i optymalizacja',
        subtitle: 'Mierzymy, uczymy się, rośniemy dalej',
        desc: 'Nie zostawiamy Cię z abonamentem i nadzieją. Co miesiąc pokazujemy twarde dane i wspólnie planujemy kolejne kroki.',
        details: [
            'Comiesięczny raport z naszych działań — co zrobiliśmy, co zadziałało, co rośnie',
            'Wskazujemy miejsca do poprawy i proponujemy konkretne rozwiązania',
            'Proponujemy nowe formaty i kierunki na podstawie aktualnych trendów na social mediach',
            'Konsultujemy strategię na bieżąco — jesteśmy dostępni, reagujemy szybko',
            'Wspólnie wyznaczamy cele na kolejny miesiąc — bo współpraca to partnerstwo, nie usługa „na autopilocie"',
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
                        Dlatego pokazujemy dokładnie, jak wygląda z nami współpraca
                        — od pierwszego dnia do comiesięcznych raportów.
                    </p>
                </div>
            </header>

            {/* ── Timeline / Storytelling ── */}
            <section className={styles.timelineSection}>
                <div className={styles.timelineInner}>
                    <div ref={timelineLabelRef} className="reveal">
                        <span className={styles.timelineLabel}>Twoja droga z nami</span>
                        <h2 className={styles.timelineHeading}>
                            Trzy etapy, które zmieniają
                            <br />
                            <span className={styles.accent}>Twoją widoczność.</span>
                        </h2>
                        <p className={styles.timelineSubhead}>
                            Każda współpraca zaczyna się od zrozumienia. Potem działamy.
                            Na koniec mierzymy i planujemy dalej. To nie sprint — to proces,
                            który krok po kroku buduje Twoją pozycję w sieci.
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
                        I tak co miesiąc — <span className={styles.accent}>dalej.</span>
                    </h2>
                    <p className={styles.bridgeDesc}>
                        Po pierwszym miesiącu masz pełen obraz sytuacji. Po trzecim — widzisz
                        realne efekty. Po szóstym — Twoja widoczność w sieci jest na zupełnie
                        innym poziomie. A my cały czas jesteśmy obok, szukając kolejnych
                        obszarów do wzrostu.
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
