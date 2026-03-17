/* ═══════════════════════════════════════════════════════
   Navbar — Fixed top navigation
   Logo left, links + CTA right
   Hamburger menu on mobile (≤900 px)
   ═══════════════════════════════════════════════════════ */
import { useState, useEffect } from 'react';
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
    const [menuOpen, setMenuOpen] = useState(false);

    /* Close menu whenever the route changes */
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    /* Prevent body scroll when menu is open */
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.inner}>
                {/* Logo — left */}
                <Link to="/" className={styles.logoLink} aria-label="pixel — strona główna">
                    <img src={logoUrl} alt="pixel logo" className={styles.logoImage} />
                </Link>

                {/* Hamburger toggle — mobile only */}
                <button
                    className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
                    aria-expanded={menuOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>

                {/* Links — right (desktop) / dropdown (mobile) */}
                <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
                    {NAV_LINKS.map((link) => (
                        <li key={link.label}>
                            <Link
                                to={link.to}
                                className={`${styles.link} ${pathname === link.to ||
                                    (link.to !== '/' && pathname.startsWith(link.to))
                                    ? styles.linkActive
                                    : ''
                                    }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Backdrop overlay — mobile only */}
                {menuOpen && (
                    <div
                        className={styles.backdrop}
                        onClick={() => setMenuOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </div>
        </nav>
    );
}
