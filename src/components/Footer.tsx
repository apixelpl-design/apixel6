import styles from './Footer.module.css';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                {/* Kolumna 1: Ekspertyza */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>EKSPERTYZA</h4>
                    <ul className={styles.linkList}>
                        <li><a href="/widocznosc">Widoczność w sieci</a></li>
                        <li><a href="/uslugi/content">Content w internecie</a></li>
                        <li><a href="/uslugi/reklamy">Płatne kampanie</a></li>
                        <li><a href="/uslugi/strona">Strony internetowe</a></li>
                        <li><a href="/uslugi/automatyzacja">Automatyzacja i aplikacje</a></li>
                    </ul>
                </div>

                {/* Kolumna 2: Agencja */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>AGENCJA</h4>
                    <ul className={styles.linkList}>
                        <li><a href="/">Home</a></li>
                        <li><a href="/uslugi">Usługi</a></li>
                        <li><a href="/kontakt">Kontakt</a></li>
                    </ul>
                </div>

                {/* Kolumna 3: Kontakt */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>KONTAKT</h4>
                    <ul className={styles.linkList}>
                        <li><a href="mailto:kontakt@apixel.pl">kontakt@apixel.pl</a></li>
                        <li><a href="tel:+48798343712">798 343 712</a></li>
                        <li className={styles.addressBlock}>
                            Karmelicka 17a<br />
                            00-168 Warszawa
                        </li>
                    </ul>
                </div>

                {/* Kolumna 4: Social Media */}
                <div className={styles.col}>
                    <h4 className={styles.colTitle}>SOCIAL MEDIA</h4>
                    <ul className={styles.linkList}>
                        <li><a href="https://www.instagram.com/apixel.pl?igsh=MTFoN3owbDV1djVnYg==" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://linkedin.com/company/apixel-pl" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        <li><a href="https://www.facebook.com/apixelpl" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://www.tiktok.com/@apixel.pl" target="_blank" rel="noopener noreferrer">TikTok</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottomBar}>
                <div className={styles.bottomContainer}>
                    <span className={styles.copyright}>
                        © {currentYear} APIXEL. Wszelkie prawa zastrzeżone.
                    </span>
                    <a href="/polityka-prywatnosci" className={styles.privacyLink}>
                        Polityka prywatności
                    </a>
                </div>
            </div>
        </footer>
    );
}
