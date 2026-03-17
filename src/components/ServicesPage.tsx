import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './ServicesPage.module.css';

export function ServicesPage() {
    const coreRef = useScrollReveal<HTMLDivElement>();
    const addonsRef = useScrollReveal<HTMLDivElement>({ stagger: true });
    const faqRef = useScrollReveal<HTMLDivElement>({ stagger: true });
    const ctaRef = useScrollReveal<HTMLDivElement>();

    return (
        <main className={styles.page}>
            {/* ── Dark Hero ── */}
            <header className={styles.hero}>
                <div className={styles.heroInner}>
                    <h1 className={`${styles.heroTitle} animate-fade-slide-up delay-100`}>
                        Twój marketing?
                        <br />
                        <span className={styles.heroAccent}>Bierzemy to na siebie.</span>
                    </h1>
                    <p className={`${styles.heroSub} animate-fade-slide-up delay-200`}>
                        Nie musisz wybierać pakietów ani zastanawiać się, co Ci potrzebne. Robimy wszystko — a kiedy będziesz gotowy, dokładamy więcej.
                    </p>
                </div>
            </header>

            {/* ── Trust Pillars ── */}
            <section className={styles.trustSection}>
                <div className={styles.trustInner}>
                    <h2 className={`${styles.trustHeading} animate-fade-slide-up delay-100`}>
                        Jak z nami pracujesz?
                    </h2>
                    <div className={styles.trustGrid}>
                        <div className={`${styles.trustPillar} animate-fade-slide-up delay-200`}>
                            <span className={styles.trustNumber}>01</span>
                            <h3 className={styles.trustTitle}>Tylko 10 firm na wyłączność</h3>
                            <p className={styles.trustDesc}>
                                Pracujemy tylko z ograniczoną liczbą klientów na raz. Dlaczego? Bo nie interesuje nas masówka. Wchodzimy w Twoją markę na 100%, obsługując ją tak, jakby to był nasz własny biznes.
                            </p>
                        </div>
                        <div className={`${styles.trustPillar} animate-fade-slide-up delay-300`}>
                            <span className={styles.trustNumber}>02</span>
                            <h3 className={styles.trustTitle}>Budujemy profesjonalny wizerunek</h3>
                            <p className={styles.trustDesc}>
                                Działamy po to, aby dowozić wyniki. Rośnie Twoja widoczność w sieci, ale przede wszystkim odbiór marki — klienci od pierwszego kontaktu widzą klasę, autorytet i profesjonalizm, któremu mogą zaufać.
                            </p>
                        </div>
                        <div className={`${styles.trustPillar} animate-fade-slide-up delay-400`}>
                            <span className={styles.trustNumber}>03</span>
                            <h3 className={styles.trustTitle}>Raportujemy i szukamy wzrostów</h3>
                            <p className={styles.trustDesc}>
                                Nie zostawiamy Cię z abonamentem. Regularnie pokazujemy twarde dane z naszych działań, ciągle optymalizujemy strategię i na bieżąco konsultujemy kolejne obszary, w których możesz urosnąć.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Core Section (White, dominant) ── */}
            <section className={styles.coreSection}>
                <div className={styles.coreInner}>
                    <span className={styles.coreDecoNumber}>01</span>

                    <div ref={coreRef} className={styles.coreGrid}>
                        {/* Left: Heading + Price + CTA */}
                        <div className={styles.coreLeft}>
                            <p className={styles.coreLabel}>Twój zewnętrzny dział marketingu</p>
                            <h2 className={styles.coreTitle}>
                                Prowadzimy Twoje<br />social media i widoczność
                            </h2>
                            <p className={styles.corePrice}>od 1200 zł netto / m-c</p>
                            <p className={styles.coreDesc}>
                                Wchodzimy do Twojej firmy jako Twój dział marketingu. Publikujemy posty na Facebooku, Instagramie, LinkedIn i Google Business. Ustawiamy wizytówki. Odpowiadamy na opinie za Ciebie. Pilnujemy, żebyś był widoczny tam, gdzie szukają Cię klienci.
                            </p>
                            <p className={styles.coreAntiPackage}>
                                Nie oferujemy pakietów do wyboru. <strong>Robimy wszystko</strong> — a jedyne, co możesz dodać, to usługi, które wykraczają poza codzienną obsługę.
                            </p>
                            <div className={styles.coreCtaWrapper}>
                                <Link to="/wspolpraca" className={styles.coreCta}>
                                    Jak dokładnie działacie? →
                                </Link>
                            </div>

                            <div className={styles.addonsWrapper}>
                                <h3 className={styles.addonsTitle}>Jedyne dodatki</h3>
                                <div ref={addonsRef} className={styles.addonsGrid}>
                                    <Link to="/uslugi/content" className={`${styles.addonCard} reveal-child`}>
                                        <span className={styles.addonBadge}>Wtyczka</span>
                                        <div className={styles.addonHeader}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--apx-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </svg>
                                            <h4 className={styles.addonName}>Oryginalny Content</h4>
                                        </div>
                                        <p className={styles.addonDesc}>Przyjeżdżamy z kamerą i aparatem. Tworzysz content, który jest naprawdę Twój.</p>
                                    </Link>

                                    <Link to="/uslugi/reklamy" className={`${styles.addonCard} reveal-child`}>
                                        <span className={styles.addonBadge}>Wtyczka</span>
                                        <div className={styles.addonHeader}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--apx-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <circle cx="12" cy="12" r="6" />
                                                <circle cx="12" cy="12" r="2" />
                                            </svg>
                                            <h4 className={styles.addonName}>Płatne Kampanie</h4>
                                        </div>
                                        <p className={styles.addonDesc}>Reklamy w Google i Meta — kiedy chcesz szybciej docierać do klientów.</p>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right: Benefits list with SVG icons */}
                        <div className={styles.coreRight}>
                            <ul className={styles.coreBenefitList}>
                                <li className={styles.coreBenefitItem}>
                                    <span className={styles.coreBenefitIcon}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                        </svg>
                                    </span>
                                    <span>
                                        <strong>Prowadzenie Twoich social mediów</strong>
                                        <br />Tworzymy i publikujemy posty na Facebooku, Instagramie, LinkedIn i Google Business. W Twoim imieniu, regularnie, konsekwentnie.
                                    </span>
                                </li>
                                <li className={styles.coreBenefitItem}>
                                    <span className={styles.coreBenefitIcon}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </span>
                                    <span>
                                        <strong>Wizytówki i opinie Google</strong>
                                        <br />Zakładamy lub poprawiamy Twoje wizytówki. Odpowiadamy na każdą opinię — profesjonalnie, w Twoim tonie.
                                    </span>
                                </li>
                                <li className={styles.coreBenefitItem}>
                                    <span className={styles.coreBenefitIcon}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="M21 21l-4.35-4.35" />
                                        </svg>
                                    </span>
                                    <span>
                                        <strong>Audyt Twojej sytuacji w sieci</strong>
                                        <br />Na starcie prześwietlamy wszystko: profile, opinie, pozycje, konkurencję. Dopiero potem działamy.
                                    </span>
                                </li>
                                <li className={styles.coreBenefitItem}>
                                    <span className={styles.coreBenefitIcon}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                        </svg>
                                    </span>
                                    <span>
                                        <strong>Pozycjonowanie, które działa lokalnie</strong>
                                        <br />Dbamy o to, żebyś wyskakiwał w Google tam, gdzie szukają Cię klienci. Etycznie i skutecznie.
                                    </span>
                                </li>
                                <li className={styles.coreBenefitItem}>
                                    <span className={styles.coreBenefitIcon}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <line x1="16" y1="13" x2="8" y2="13" />
                                            <line x1="16" y1="17" x2="8" y2="17" />
                                        </svg>
                                    </span>
                                    <span>
                                        <strong>Raport co miesiąc — bez ściemy</strong>
                                        <br />Dostajesz twarde dane: co rośnie, skąd przychodzą klienci, co robimy dalej.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ Section ── */}
            <section className={styles.faqSection}>
                <div className={styles.faqInner}>
                    <h2 className={`${styles.sectionTitle} animate-fade-slide-up delay-100`}>Najczęściej zadawane pytania</h2>

                    <div ref={faqRef} className={styles.faqList}>
                        <div className={`${styles.faqItem} reveal-child`}>
                            <h3 className={styles.faqQuestion}>Kiedy zobaczę pierwsze efekty?</h3>
                            <p className={styles.faqAnswer}>
                                To zależy od kanału. Kampanie reklamowe Google/Meta Ads czy celowany content przynoszą efekty często już w pierwszym miesiącu. Działania organiczne, takie jak pozycjonowanie (SEO) czy budowanie społeczności, to proces długofalowy — realne wzrosty zazwyczaj widać po 3 do 6 miesiącach konsekwentnej pracy. Zawsze gramy otwarcie i nie obiecujemy cudów z dnia na dzień.
                            </p>
                        </div>

                        <div className={`${styles.faqItem} reveal-child`}>
                            <h3 className={styles.faqQuestion}>Dlaczego współpracujecie z max. 10 klientami naraz?</h3>
                            <p className={styles.faqAnswer}>
                                Jako butikowa agencja stawiamy na absolutną jakość, a nie na taśmową produkcję "odhaczanych" zadań. Zamiast zatrudniać armię juniorów, pracujesz z ekspertami z wieloletnim stażem. Limit 10 projektów oznacza, że jesteśmy w 100% skupieni na Twoim biznesie, szybko reagujemy i działamy jak Twój wewnętrzny, dedykowany dział marketingu, bez ryzyka przepalenia zespołu.
                            </p>
                        </div>

                        <div className={`${styles.faqItem} reveal-child`}>
                            <h3 className={styles.faqQuestion}>Jak wyglądają umowy długoterminowe?</h3>
                            <p className={styles.faqAnswer}>
                                Wierzymy, że w biznesie trzymać nas powinny wyniki, a nie kajdanki prawne. Po początkowym okresie testowym (zazwyczaj 3 miesiące, minimalny czas potrzebny na wdrożenie i analizę danych), przechodzimy na umowy z krótkim, miesięcznym okresem wypowiedzenia. Jesteśmy pewni tego, co robimy i chcemy, żebyś zostawał z nami dla ROI, a nie dla podpisanych papierów.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className={styles.ctaSection}>
                <div ref={ctaRef} className={`${styles.ctaInner} reveal-scale`}>
                    <h2 className={styles.ctaTitle}>Pogadajmy o Twoim biznesie.</h2>
                    <p className={styles.ctaDesc}>Bez zobowiązań, bez sprzedażowej gadki. Opowiesz, czym się zajmujesz — a my pokażemy, co możemy zrobić.</p>
                    <Link to="/kontakt" className={styles.ctaButton}>
                        Umów się na rozmowę
                    </Link>
                </div>
            </section>
        </main>
    );
}
