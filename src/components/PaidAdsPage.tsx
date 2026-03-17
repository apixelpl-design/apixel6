/* ═══════════════════════════════════════════════════════
   PaidAdsPage — /uslugi/reklamy
   "Płatne Reklamy" service detail page
   ═══════════════════════════════════════════════════════ */
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './VisibilityPage.module.css';

const deliverables = [
    {
        icon: '🔍',
        title: 'Google Ads',
        desc: 'Kampanie w wyszukiwarce, displayowe i produktowe (PLA). Docieramy do klientów w momencie, gdy aktywnie szukają tego, co oferujesz.',
    },
    {
        icon: '📲',
        title: 'Meta Ads (Facebook & Instagram)',
        desc: 'Reklamy oparte na precyzyjnym targetowaniu demograficznym, zainteresowaniach i zachowaniach. Od zasięgu po konwersję.',
    },
    {
        icon: '🔁',
        title: 'Remarketing',
        desc: 'Odzyskujemy odwiedzających, którzy nie skonwertowali. Spersonalizowane komunikaty, które domykają sprzedaż.',
    },
    {
        icon: '📊',
        title: 'Analiza fraz i konkurencji',
        desc: 'Audyt słów kluczowych, analiza stawek rywali, identyfikacja luk rynkowych — zanim wydamy choćby złotówkę.',
    },
    {
        icon: '⚙️',
        title: 'Optymalizacja kampanii',
        desc: 'Regularne testy A/B kreacji i grup odbiorców, optymalizacja CPC i ROAS, pełna kontrola budżetu.',
    },
    {
        icon: '📋',
        title: 'Raportowanie miesięczne',
        desc: 'Przejrzyste raporty z kluczowymi wskaźnikami: wydatki, leady, konwersje, koszt pozyskania. Zero żargonu, same fakty.',
    },
];

export function PaidAdsPage() {
    const problemRef = useScrollReveal<HTMLDivElement>();
    const problemTextRef = useScrollReveal<HTMLDivElement>();
    const delLabelRef = useScrollReveal<HTMLDivElement>();
    const delGridRef = useScrollReveal<HTMLDivElement>({ stagger: true });
    const ctaRef = useScrollReveal<HTMLElement>();

    return (
        <main>
            {/* ── Hero ── */}
            <header className={styles.hero}>
                <div className={styles.heroInner}>
                    <Link to="/uslugi" className={styles.backLink}>
                        ← Usługi
                    </Link>
                    <span className={`${styles.heroLabel} animate-fade-slide-up delay-100`}>03 / PŁATNE REKLAMY</span>
                    <h1 className={`${styles.heroTitle} animate-fade-slide-up delay-200`}>
                        Każda złotówka
                        <br />
                        powinna <span className={styles.accent}>na siebie zarabiać.</span>
                    </h1>
                    <p className={`${styles.heroDesc} animate-fade-slide-up delay-400`}>
                        Płatne kampanie to nie loteria — to precyzja.
                        Odpowiednio ustawione, mierzone i optymalizowane
                        kampanie przynoszą przewidywalny zwrot z inwestycji.
                    </p>
                </div>
            </header>

            {/* ── Problem section ── */}
            <section className={styles.problemSection}>
                <div className={styles.sectionInner}>
                    <div className={styles.problemGrid}>
                        <div ref={problemRef} className={`${styles.problemLeft} reveal-left`}>
                            <h2 className={styles.sectionHeading}>
                                Dlaczego większość
                                <br />
                                <span className={styles.accent}>kampanii nie działa?</span>
                            </h2>
                        </div>
                        <div ref={problemTextRef} className={`${styles.problemRight} reveal`}>
                            <p className={styles.bodyText}>
                                Większość firm traci pieniądze na reklamy nie dlatego, że reklamy
                                „nie działają" — tylko dlatego, że są źle skonfigurowane.{' '}
                                <strong>Zły dobór słów kluczowych, brak grup wykluczeń,
                                    niedopasowana strona docelowa</strong> — i budżet wyparowuje
                                bez efektu.
                            </p>
                            <p className={styles.bodyText}>
                                Skuteczna kampania to ciągły proces: testowanie, analiza danych,
                                optymalizacja bidu, eliminacja nieefektywnych slotów. Bez tego
                                płacisz za kliknięcia, które nigdy nie zamieniają się w klientów.
                            </p>
                            <p className={styles.bodyText}>
                                My zarządzamy kampaniami tak, żeby każda złotówka budżetu
                                generowała <strong>mierzalny, powtarzalny wynik</strong>.
                                Nasze decyzje są oparte wyłącznie na danych.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Deliverables ── */}
            <section className={styles.deliverablesSection}>
                <div className={styles.sectionInner}>
                    <span ref={delLabelRef} className={`${styles.sectionLabel} reveal`}>CO ROBIMY DLA CIEBIE</span>
                    <h2 className={styles.sectionHeading}>
                        Kampanie, które <span className={styles.accent}>dowożą.</span>
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
                            Zobacz nasz proces krok po kroku — od audytu Twojej obecności, przez aktywne prowadzenie, aż po comiesięczne raporty.
                        </p>
                    </div>
                    <Link to="/wspolpraca" className={styles.bannerButton}>
                        Jak działamy? →
                    </Link>
                </div>
            </section>
            <section ref={ctaRef} className={`${styles.ctaSection} reveal-scale`}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.ctaTitle}>
                        Przestań przepalać budżet.
                        <br />
                        <span className={styles.accent}>Zacznij go mnożyć.</span>
                    </h2>
                    <p className={styles.ctaDesc}>
                        Bezpłatny audyt Twoich obecnych kampanii lub wycena nowych.
                        Zero zobowiązań.
                    </p>
                    <a href="mailto:kontakt@apixel.pl" className={styles.ctaButton}>
                        DARMOWA WYCENA →
                    </a>
                </div>
            </section>
        </main>
    );
}
