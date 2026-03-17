/* ═══════════════════════════════════════════════════════
   ContactPage — /kontakt
   ═══════════════════════════════════════════════════════ */
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './ContactPage.module.css';

export function ContactPage() {
    const listRef = useScrollReveal<HTMLUListElement>({ stagger: true });
    const ctaRef = useScrollReveal<HTMLElement>();

    return (
        <main className={styles.page}>
            {/* ── Hero ── */}
            <header className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={`${styles.heroLabel} animate-fade-slide-up delay-100`}>KONTAKT</span>
                    <h1 className={`${styles.heroTitle} animate-fade-slide-up delay-200`}>
                        Porozmawiajmy
                        <br />
                        <span className={styles.accent}>o Twoim projekcie.</span>
                    </h1>
                    <p className={`${styles.heroDesc} animate-fade-slide-up delay-400`}>
                        Nie musisz mieć gotowego briefu. Wystarczy dobry pomysł —
                        resztą zajmiemy się razem.
                    </p>
                </div>
            </header>

            {/* ── Contact body ── */}
            <section className={styles.body}>
                <div className={styles.bodyInner}>
                    <p className={styles.intro}>
                        Zadzwoń, napisz lub po prostu wyślij maila.
                        Odpowiadamy w ciągu 24 godzin.
                    </p>

                    <ul ref={listRef} className={styles.contactList}>
                        <li className={`${styles.contactItem} reveal-child`}>
                            <span className={styles.contactLabel}>TELEFON</span>
                            <a href="tel:+48732737786" className={styles.contactValue}>
                                732 737 786
                            </a>
                        </li>
                        <li className={`${styles.contactItem} reveal-child`}>
                            <span className={styles.contactLabel}>E-MAIL</span>
                            <a href="mailto:kontakt@apixel.pl" className={styles.contactValue}>
                                kontakt@apixel.pl
                            </a>
                        </li>
                        <li className={`${styles.contactItem} reveal-child`}>
                            <span className={styles.contactLabel}>ADRES</span>
                            <span className={styles.contactValue}>
                                Karmelicka 17a<br />
                                00-168 Warszawa
                            </span>
                        </li>
                        <li className={`${styles.contactItem} reveal-child`}>
                            <span className={styles.contactLabel}>OBSZAR</span>
                            <span className={styles.contactValue}>
                                Cała Polska
                                <span className={styles.contactSub}>
                                    Pracujemy zdalnie i dojeżdżamy do klienta.
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* ── CTA strip ── */}
            <section ref={ctaRef} className={`${styles.cta} reveal`}>
                <div className={styles.ctaInner}>
                    <p className={styles.ctaText}>
                        Wolisz zacząć od e-maila?
                    </p>
                    <a href="mailto:kontakt@apixel.pl" className={styles.ctaButton}>
                        NAPISZ DO NAS →
                    </a>
                </div>
            </section>
        </main>
    );
}
