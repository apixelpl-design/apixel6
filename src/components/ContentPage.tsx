/* ═══════════════════════════════════════════════════════
   ContentPage — /uslugi/content
   "Content w internecie" service detail page
   ═══════════════════════════════════════════════════════ */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './VisibilityPage.module.css';

const deliverables = [
    {
        icon: '📸',
        title: 'Sesje zdjęciowe',
        desc: 'Profesjonalna fotografia produktowa, wizerunkowa i reportażowa. Zdjęcia, które budują zaufanie i sprzedają — nie stockowe wypełniacze.',
    },
    {
        icon: '🎬',
        title: 'Nagrywanie i montaż wideo',
        desc: 'Reelsy, Shortsy, filmy na YouTube i materiały reklamowe. Od scenariusza, przez nagranie, po montaż gotowy do publikacji.',
    },
    {
        icon: '📝',
        title: 'Artykuły eksperckie',
        desc: 'Treści dla branż wymagających autorytetu: prawniczej, księgowej, logistycznej. Ghostwriting, który pozycjonuje Cię jako eksperta.',
    },
    {
        icon: '📱',
        title: 'Social media content',
        desc: 'Posty na Facebooka, Instagrama, LinkedIn — z grafikami, copy i harmonogramem publikacji. Kompletna obsługa, nie tylko „ładne zdjęcia".',
    },
    {
        icon: '📖',
        title: 'Stories i formaty krótkie',
        desc: 'Relacje, karuzele, ankiety i interaktywne formaty, które budują zaangażowanie i utrzymują markę w świadomości odbiorców — codziennie.',
    },
    {
        icon: '🎯',
        title: 'Strategia contentowa',
        desc: 'Audyt obecnych treści, analiza konkurencji, kalendarz publikacji i mierzalne KPI. Plan, nie chaos.',
    },
];

const contentProcessSteps = [
    {
        title: '1. Wczuwamy się w Twój biznes',
        content: 'Zanim zrobimy pierwsze zdjęcie, poznajemy Twoją firmę od środka. Rozmawiamy, obserwujemy, rozumiemy — bo content, który działa, musi oddawać autentycznego ducha Twojego biznesu. Żadnych generycznych stocków.',
    },
    {
        title: '2. Tworzymy profesjonalny content',
        content: 'Sesje zdjęciowe, nagrania wideo, montaż — wszystko realizujemy na miejscu, w warunkach Twojej firmy. Profesjonalne zdjęcia edytujemy zgodnie z identyfikacją Twojej marki, a materiały wideo montujemy tak, by oddawały charakter i klimat Twojego biznesu.',
    },
    {
        title: '3. Wzmacniamy Twoją markę wszędzie',
        content: 'Gotowy content trafia wszędzie tam, gdzie są Twoi klienci — na profile social media, wizytówkę Google, stronę internetową, artykuły eksperckie. Spójny wizerunek podnosi reputację i pozwala się wyróżnić. Co więcej, na bazie tych materiałów budujemy długoterminowe kampanie wizerunkowe.',
    },
];

export function ContentPage() {
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
                    <span className={`${styles.heroLabel} animate-fade-slide-up delay-100`}>02 / CONTENT W INTERNECIE</span>
                    <h1 className={`${styles.heroTitle} animate-fade-slide-up delay-200`}>
                        Twoja marka mówi
                        <br />
                        nawet kiedy <span className={styles.accent}>Ty milczysz.</span>
                    </h1>
                    <p className={`${styles.heroDesc} animate-fade-slide-up delay-400`}>
                        Każdy post, zdjęcie i film to punkt kontaktu z klientem.
                        Pytanie nie brzmi „czy publikować" — pytanie brzmi
                        „co publikować, żeby działało".
                    </p>
                </div>
            </header>

            {/* ── Problem section ── */}
            <section className={styles.problemSection}>
                <div className={styles.sectionInner}>
                    <div className={styles.problemGrid}>
                        <div ref={problemRef} className={`${styles.problemLeft} reveal-left`}>
                            <h2 className={styles.sectionHeading}>
                                Dlaczego content
                                <br />
                                <span className={styles.accent}>decyduje o sprzedaży?</span>
                            </h2>
                        </div>
                        <div ref={problemTextRef} className={`${styles.problemRight} reveal`}>
                            <p className={styles.bodyText}>
                                Klienci nie kupują od firm, o których nic nie wiedzą. Zanim
                                zadzwonią, zanim napiszą — <strong>sprawdzają Twoje social media,
                                    stronę, opinie</strong>. Oceniają w kilka sekund.
                            </p>
                            <p className={styles.bodyText}>
                                Brak regularnych, profesjonalnych treści to nie „neutralny stan".
                                To sygnał: ta firma albo nie działa, albo nie dba o swoich
                                klientów. A klient idzie tam, gdzie widzi aktywność i jakość.
                            </p>
                            <p className={styles.bodyText}>
                                Dobry content nie musi być „viralowy". Musi być
                                <strong> konsekwentny, autentyczny i dopasowany</strong> do
                                Twojej grupy docelowej. My to robimy.
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
                                Twój <span className={styles.accent}>content?</span>
                            </h2>
                        </div>
                        <div ref={processTextRef} className={`${styles.problemRight} reveal`}>
                            <p className={styles.bodyText}>
                                To nie jest „wrzucanie postów". To <strong>stała obsługa
                                    zdjęciowo-filmowa</strong>, dopasowana do Twojej branży i
                                celów biznesowych — od sesji, przez montaż, po dystrybucję.
                            </p>

                            <div className={styles.accordion}>
                                {contentProcessSteps.map((step, index) => {
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
                        Kompletna produkcja <span className={styles.accent}>treści.</span>
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
            <section ref={ctaRef} className={`${styles.ctaSection} reveal-scale`}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.ctaTitle}>
                        Pokaż światu,
                        <br />
                        <span className={styles.accent}>co naprawdę robisz.</span>
                    </h2>
                    <p className={styles.ctaDesc}>
                        Porozmawiajmy o treściach, które przyciągną klientów.
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
