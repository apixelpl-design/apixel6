import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Kolumna 1: Brand */}
                <div className={styles.col}>
                    <img src="/src/assets/logo-red.png" alt="APIXEL Logo" className={styles.logo} />
                    <div className={styles.brandInfo}>
                        <p>Proste, szczere i skuteczne.</p>
                        <p className={styles.legalInfo}>
                            NIP: 000-000-00-00<br />
                            REGON: 000000000
                        </p>
                    </div>
                </div>

                {/* Kolumna 2: Ekspertyza */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>EKSPERTYZA</h4>
                    <ul className={styles.linkList}>
                        <li><Link to="/widocznosc">Widoczność w sieci</Link></li>
                        <li><Link to="/uslugi/content">Content w internecie</Link></li>
                        <li><Link to="/uslugi/reklamy">Płatne kampanie</Link></li>
                    </ul>
                </div>

                {/* Kolumna 3: Agencja */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>AGENCJA</h4>
                    <ul className={styles.linkList}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/uslugi">Usługi</Link></li>
                        <li><Link to="/kontakt">Kontakt</Link></li>
                    </ul>
                </div>

                {/* Kolumna 4: Kontakt */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>KONTAKT</h4>
                    <ul className={styles.linkList}>
                        <li><a href="mailto:kontakt@apixel.pl">kontakt@apixel.pl</a></li>
                        <li><a href="tel:+48123456789">+48 123 456 789</a></li>
                        <li className={styles.socialSpacer}></li>
                        <li><a href="#linkedin">LinkedIn</a></li>
                        <li><a href="#instagram">Instagram</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottomBar}>
                <div className={styles.bottomContainer}>
                    <span className={styles.copyright}>
                        © {currentYear} APIXEL. Wszelkie prawa zastrzeżone.
                    </span>
                    <Link to="/polityka-prywatnosci" className={styles.privacyLink}>
                        Polityka prywatności
                    </Link>
                </div>
            </div>
        </footer>
    );
}
