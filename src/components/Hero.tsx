/* ═══════════════════════════════════════════════════════
   Hero Section
   Full-width, black background, text left-aligned
   Now without top bar (moved to Navbar)
   ═══════════════════════════════════════════════════════ */
import styles from './Hero.module.css';

export function Hero() {
    return (
        <section className={styles.hero}>
            {/* Main content — left aligned */}
            <div className={styles.content}>

                <h1 className={`${styles.heading} animate-fade-slide-up delay-200`}>
                    Twoja widoczność
                    <br />
                    <span className={styles.headingAccent}>w internecie.</span>
                </h1>

                <div className={`${styles.accentBar} animate-fade-slide-up delay-300`} />

                <p className={`${styles.subtitle} animate-fade-slide-up delay-400`}>
                    Pomagamy małym i średnim firmom zaistnieć w sieci.
                    <br />
                    Prosto, skutecznie i bez zbędnego żargonu.
                </p>

                <a href="#uslugi" className={`${styles.cta} animate-fade-slide-up delay-500`}>
                    Poznaj nasze usługi
                    <span className={styles.ctaArrow}>→</span>
                </a>
            </div>

            {/* Decorative bottom gradient strip */}
            <div className={styles.gradientStrip} />
        </section>
    );
}
