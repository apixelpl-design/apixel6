/* ═══════════════════════════════════════════════════════
   Services Section (homepage)
   3 square cards: Black, White, Red
   ═══════════════════════════════════════════════════════ */
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Services.module.css';

export function Services() {
    const labelRef = useScrollReveal<HTMLDivElement>();
    const headingRef = useScrollReveal<HTMLDivElement>();
    const gridRef = useScrollReveal<HTMLDivElement>({ stagger: true });

    return (
        <section id="uslugi" className={styles.section}>
            {/* Section label */}
            <div ref={labelRef} className={`${styles.sectionLabel} reveal-left`}>
                <span className={styles.labelNumber}>01</span>
                <div className={styles.labelLine} />
                <span className={styles.labelText}>Nasze usługi</span>
            </div>

            {/* Heading */}
            <div ref={headingRef} className={`${styles.headerRow} reveal`}>
                <h2 className={styles.heading}>
                    Zespół marketingowców
                    <br />
                    <span style={{ color: 'var(--apx-red)' }}>na wyłączność</span>
                </h2>
                <p className={styles.headerDesc}>
                    Kupujesz cały dział marketingu w jednej usłudze. Nie musisz wybierać pakietów — robimy wszystko.
                </p>
            </div>

            {/* Intro copy */}
            <div className={`${styles.introBlock} animate-fade-slide-up delay-300`}>
                <p className={styles.introText}>
                    Współpracujemy wyłącznie z <strong>maksymalnie 10 firmami naraz</strong> — bo nie chcemy odhaczać zadań, tylko realnie odpowiadać za Twój wizerunek w sieci. Prowadzimy Twoje social media, publikujemy posty, odpowiadamy na opinie, pilnujemy wizytówek i dbamy o pozycjonowanie. Bierzemy na siebie cały marketing internetowy Twojej firmy, żebyś Ty mógł skupić się na tym, co robisz najlepiej.
                </p>
            </div>

            {/* Cards grid */}
            <div ref={gridRef} className={styles.grid}>
                {services.map((service) => (
                    <Link
                        key={service.number}
                        to={service.href}
                        className={`${styles.card} ${styles[service.variant]} reveal-child`}
                    >
                        {/* Top accent strip */}
                        <div className={styles.cardStrip} />

                        <div className={styles.cardContent}>
                            <div className={styles.cardTopRow}>
                                <span className={styles.cardNumber}>{service.number}</span>
                                {service.badge && (
                                    <span className={styles.cardBadge}>{service.badge}</span>
                                )}
                            </div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardSubtitle}>{service.subtitle}</p>

                            <div className={styles.cardBridge}>
                                <div className={styles.bridgeLine} />
                                <span className={styles.bridgeText}>Pomożemy Ci:</span>
                            </div>

                            <ul className={styles.cardList}>
                                {service.items.map((item, i) => (
                                    <li key={i} className={styles.cardItem}>
                                        <span className={styles.cardBullet}>▪</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <span className={styles.cardLink}>
                                dowiedz się więcej →
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
