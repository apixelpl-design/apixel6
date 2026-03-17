/* ═══════════════════════════════════════════════════════
   Navbar — Fixed top navigation
   Logo left, links + CTA right
   ═══════════════════════════════════════════════════════ */
import { Link, useLocation } from 'react-router-dom';
import logoUrl from '../assets/pixel-logo.png';
import styles from './Navbar.module.css';

const NAV_LINKS = [
    { label: 'Home', to: '/' },
    { label: 'Usługi & Ceny', to: '/uslugi' },
    { label: 'Jak działamy', to: '/wspolpraca' },
    { label: 'Kontakt', to: '/kontakt' },
];

export function Navbar() {
    const { pathname } = useLocation();

    return (
        <nav className={styles.navbar}>
            <div className={styles.inner}>
                {/* Logo — left */}
                <Link to="/" className={styles.logoLink} aria-label="pixel — strona główna">
                    <img src={logoUrl} alt="pixel logo" className={styles.logoImage} />
                </Link>

                {/* Links — right */}
                <ul className={styles.links}>
                    {NAV_LINKS.map((link) => (
                        <li key={link.label}>
                            <Link
                                to={link.to}
                                className={`${styles.link} ${pathname === link.to ||
                                    (link.to !== '/' && pathname.startsWith(link.to))
                                    ? styles.linkActive
                                    : ''
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
        </nav>
    );
}
