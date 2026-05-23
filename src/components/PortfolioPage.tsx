/* ═══════════════════════════════════════════════════════
   PortfolioPage — /portfolio
   "Portfolio" projects overview
   ═══════════════════════════════════════════════════════ */
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { ReactNode } from 'react';
import styles from './PortfolioPage.module.css';

// Import project images
import okRemovalsDesktop from '../assets/portfolio/optimized/OkremovalsStatio.jpg';
import okRemovalsMobile from '../assets/portfolio/optimized/OkremovalsMobile.jpg';
import michalDesktop from '../assets/portfolio/optimized/MichalStatio.jpg';
import michalMobile from '../assets/portfolio/optimized/MichalMobile.jpg';
import mojapasjaDesktop from '../assets/portfolio/optimized/MojapasjaStatio.jpg';
import mojapasjaMobile from '../assets/portfolio/optimized/MojapasjaMobile.jpg';
import searidersDesktop from '../assets/portfolio/optimized/SearidersStatio.jpg';
import searidersMobile from '../assets/portfolio/optimized/SearidersMobile.jpg';
import bbDesktop from '../assets/portfolio/optimized/bbStatio.jpg';
import bbMobile from '../assets/portfolio/optimized/bbMobile.jpg';

type ImageSource = string | { src: string };

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    desktopImg?: ImageSource;
    mobileImg?: ImageSource;
    technologies: string[];
    keyFeature?: string;
}

const getImageUrl = (image?: ImageSource) =>
    typeof image === 'string' ? image : image?.src;

const TECH_MAP: Record<string, { name: string; icon: ReactNode }> = {
    astro: {
        name: 'Astro',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF5D01" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L1 21h4.5l2.5-4.5h8l2.5 4.5H23L12 2zm-3.5 12.5L12 7.8l3.5 6.7h-7z"/>
            </svg>
        )
    },
    tailwind: {
        name: 'Tailwind CSS',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#38bdf8" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624.717.731 1.644 1.676 4.624 1.676 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
            </svg>
        )
    },
    react: {
        name: 'React',
        icon: (
            <svg width="16" height="16" viewBox="-11.5 -10.23 23 20.47" fill="none" stroke="#00d8ff" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                <circle r="2.05" fill="#00d8ff"/>
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </svg>
        )
    },
    nextjs: {
        name: 'Next.js',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#000"/>
                <path d="M9 17V7h1.5l5.5 8.5V7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    },
    typescript: {
        name: 'TypeScript',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#3178C6" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0V0zm11.737 13.682c-.066-.37-.224-.716-.474-1.036-.25-.32-.59-.588-1.02-.803-.43-.215-.957-.406-1.58-.574-.622-.167-1.127-.376-1.517-.626-.39-.25-.668-.58-.834-.99-.166-.41-.248-.92-.248-1.53 0-.648.162-1.2.486-1.657.324-.457.79-.81 1.4-1.06.61-.25 1.345-.375 2.203-.375.875 0 1.62.13 2.235.39.615.26 1.09.65 1.425 1.173.335.523.513 1.168.534 1.936h-2.316c-.035-.465-.18-.82-.435-1.064-.255-.245-.63-.367-1.125-.367-.47 0-.827.108-1.07.323-.243.216-.365.492-.365.83 0 .285.097.525.29.72.195.195.496.362.905.502.41.14.887.278 1.43.41.544.133 1.034.327 1.472.582.438.254.776.605 1.014 1.05.238.447.357.983.357 1.61 0 .668-.168 1.25-.505 1.748-.337.498-.827.876-1.47 1.134-.643.258-1.42.387-2.33.387-.93 0-1.74-.132-2.43-.396-.69-.264-1.22-.676-1.59-1.236-.37-.56-.575-1.284-.615-2.17h2.314c.04.53.22 1.004.53 1.4.31.396.79.594 1.44.594.49 0 .867-.113 1.13-.34.26-.226.39-.517.39-.87 0-.317-.11-.58-.33-.788-.22-.21-.57-.384-1.05-.522l-1.4-.405zM22.05 6.22h-3.66v10.4h-2.316V6.22H12.4V4.185h9.65V6.22z"/>
            </svg>
        )
    },
    postgresql: {
        name: 'PostgreSQL',
        icon: (
            <svg width="16" height="16" viewBox="0 0 128 128" fill="#336791" xmlns="http://www.w3.org/2000/svg">
                <path d="M112.5 50.1c-1.5-6.6-6-13.8-13.4-18.7-7.4-4.8-17-7.2-26.6-6.1-9.6 1.1-17.8 5.7-23.7 12.3-5.9 6.6-9.1 15-9.1 23.3 0 5.4 1.4 10.4 3.9 14.5-4.1.3-8.2 1.4-11.7 3.5-5.7 3.4-9.6 9-10.7 15.5-.3 1.9-.4 3.9-.4 5.9 0 5.2 1.9 9.8 5 13.2 3.1 3.4 7.6 5.3 12.6 5.3h10.9v-7.1H32.4c-3.1 0-5.8-1.1-7.7-3.2-1.9-2.1-3-5.1-3-8.4 0-1.3.1-2.6.3-3.8.7-4.1 3.2-7.6 6.9-9.8 3.7-2.2 8.3-3 12.7-2.3l4.3.7 1.4-4.1c1.5-4.3 4.2-8 7.8-10.7 3.6-2.7 8-4.2 12.7-4.2h18.3c4.7 0 9.1 1.5 12.7 4.2 3.6 2.7 6.3 6.4 7.8 10.7l1.4 4.1 4.3-.7c4.4-.7 9 .1 12.7 2.3 3.7 2.2 6.2 5.7 6.9 9.8.2 1.2.3 2.5.3 3.8 0 3.3-1.1 6.3-3 8.4-1.9 2.1-4.6 3.2-7.7 3.2h-13.7v7.1h13.7c5 0 9.5-1.9 12.6-5.3 3.1-3.4 5-8 5-13.2 0-2-.1-4-.4-5.9-1.1-6.5-5-12.1-10.7-15.5-3.5-2.1-7.6-3.2-11.7-3.5 2.5-4.1 3.9-9.1 3.9-14.5 0-8.3-3.2-16.7-9.1-23.3-5.9-6.6-14.1-11.2-23.7-12.3-9.6-1.1-19.2 1.3-26.6 6.1-7.4 4.9-11.9 12.1-13.4 18.7z"/>
            </svg>
        )
    },
    nodejs: {
        name: 'Node.js',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#339933" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2c-.34 0-.67.09-.96.26L4.22 6.18c-.6.35-.97.99-.97 1.69v7.86c0 .7.37 1.34.97 1.69l6.82 3.92c.3.17.63.26.96.26s.67-.09.96-.26l6.82-3.92c.6-.35.97-.99.97-1.69V7.87c0-.7-.37-1.34-.97-1.69l-6.82-3.92C12.67 2.09 12.34 2 12 2zm-1 5.33c0-.18.15-.33.33-.33.09 0 .17.03.23.1L14 9.53V15.5c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-4.67l-2.47 1.43a.5.5 0 01-.5 0L6.56 10.8a.5.5 0 01-.25-.43v-2.2c0-.18.15-.33.33-.33s.33.15.33.33v1.82l2-1.15V7.33z"/>
            </svg>
        )
    },
    sanity: {
        name: 'Sanity CMS',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F03E2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
        )
    },
    threejs: {
        name: 'Three.js',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
        )
    },
    strapi: {
        name: 'Strapi CMS',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8C4BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
            </svg>
        )
    },
    supabase: {
        name: 'Supabase',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#3ECF8E" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
        )
    },
    vercel: {
        name: 'Vercel',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 22h20L12 2z"/>
            </svg>
        )
    },
    stripe: {
        name: 'Stripe',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#635BFF" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.962 8.475a3.4 3.4 0 0 0-2.316-.763c-1.284 0-1.916.528-1.916 1.252 0 2.062 5.12 1.636 5.12 5.368 0 2.684-2.222 3.868-4.664 3.868a6.388 6.388 0 0 1-3.692-1.076l1.05-1.968c.84.58 1.8.916 2.632.916 1.492 0 2.076-.628 2.076-1.364 0-2.272-5.122-1.748-5.122-5.26 0-2.484 2.068-3.792 4.412-3.792a5.952 5.952 0 0 1 3.1 1.024l-.702 2.1z"/>
            </svg>
        )
    }
};

const projects: Project[] = [
    {
        id: 'project-seariders',
        title: 'Seariders',
        category: 'Sporty wodne i rekreacja',
        description: 'Autorska, zoptymalizowana platforma internetowa stworzona dla firmy organizującej turystyczne i ekstremalne rejsy szybkimi motorówkami, w tym wycieczki na obserwacje dziko żyjących fok w ujściu Wisły.',
        desktopImg: searidersDesktop,
        mobileImg: searidersMobile,
        technologies: ['nextjs', 'tailwind', 'vercel'],
        keyFeature: 'Integracja strony od zera, pozycjonowanie',
    },
    {
        id: 'project-1',
        title: 'OkRemovals',
        category: 'Relokacje i Transport',
        description: 'Kompleksowa platforma dla szczecińskiej firmy przeprowadzkowej, obsługującej transport międzynarodowy. System został zaprojektowany z myślą o prostocie wyceny oraz budowaniu zaufania poprzez przejrzysty proces relokacji.',
        desktopImg: okRemovalsDesktop,
        mobileImg: okRemovalsMobile,
        technologies: ['astro', 'tailwind', 'react'],
        keyFeature: 'Nowoczesny formularz kontaktowy z automatycznym zbieraniem kluczowych informacji',
    },
    {
        id: 'project-michal',
        title: 'Kancelaria Adwokacka',
        category: 'Strona wizerunkowa',
        description: 'Nowoczesna witryna wizerunkowa dla warszawskiej kancelarii adwokackiej specjalizującej się w sprawach frankowych (kredyty walutowe CHF). Ze względu na umowę o poufności (NDA), szczegółowe dane identyfikacyjne klienta oraz marki nie są publikowane.',
        desktopImg: michalDesktop,
        mobileImg: michalMobile,
        technologies: ['astro', 'tailwind', 'vercel'],
        keyFeature: 'Pozycjonowanie na skomplikowanym, warszawskim rynku',
    },
    {
        id: 'project-mojapasja',
        title: 'Moja Pasja',
        category: 'Ceramika & Rękodzielnictwo',
        description: 'Klimatyczna witryna e-commerce oraz strona portfolio dla unikalnej pracowni rękodzielniczej zajmującej się wyrobem artystycznej ceramiki użytkowej. Wdrożenie obejmuje pełny katalog wyrobów oraz integrację z bezpiecznymi płatnościami.',
        desktopImg: mojapasjaDesktop,
        mobileImg: mojapasjaMobile,
        technologies: ['astro', 'tailwind', 'stripe', 'vercel'],
        keyFeature: 'Dodanie obsługi sklepu oraz płatności Stripe',
    },
    {
        id: 'project-bbtrans',
        title: 'BBTrans',
        category: 'Transport i Logistyka',
        description: 'Nowoczesna i w pełni responsywna strona wizytówkowa dla szczecińskiej firmy logistycznej BBTrans, oferującej profesjonalne usługi z zakresu spedycji krajowej i międzynarodowej, logistyki oraz magazynowania towarów.',
        desktopImg: bbDesktop,
        mobileImg: bbMobile,
        technologies: ['astro', 'tailwind', 'vercel'],
        keyFeature: 'Wdrożenie strony od zera, strona wizytówkowa',
    }
];

function ProjectCard({ project }: { project: Project }) {
    const cardRef = useScrollReveal<HTMLDivElement>();
    const desktopUrl = getImageUrl(project.desktopImg);
    const mobileUrl = getImageUrl(project.mobileImg);

    return (
        <div ref={cardRef} className={`${styles.projectCard} reveal`}>
            <div className={styles.projectInfo}>
                <span className={styles.projectCategory}>{project.category}</span>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p className={styles.projectDesc}>{project.description}</p>

                {project.keyFeature && (
                    <div className={styles.projectFeature}>
                        <span className={styles.featureLabel}>Główne rozwiązanie:</span>
                        <span className={styles.featureText}>{project.keyFeature}</span>
                    </div>
                )}

                <div className={styles.techStackContainer}>
                    <span className={styles.techStackLabel}>Użyte technologie:</span>
                    <div className={styles.techStack}>
                        {project.technologies.map((techKey) => {
                            const tech = TECH_MAP[techKey];
                            if (!tech) return null;

                            return (
                                <span key={techKey} className={styles.techBadge}>
                                    {tech.icon}
                                    <span>{tech.name}</span>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.projectMockups}>
                <div className={styles.laptopMockup}>
                    <div
                        className={styles.laptopScreen}
                        style={desktopUrl ? { backgroundImage: `url(${desktopUrl})` } : {}}
                    >
                        {!desktopUrl && 'Laptop mockup'}
                    </div>
                </div>
                <div className={styles.phoneMockup}>
                    <div
                        className={styles.phoneScreen}
                        style={mobileUrl ? { backgroundImage: `url(${mobileUrl})` } : {}}
                    >
                        {!mobileUrl && 'Mobile mockup'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PortfolioPage() {
    const ctaRef = useScrollReveal<HTMLElement>();

    return (
        <main className={styles.page}>
            {/* ── Hero ── */}
            <header className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={`${styles.heroLabel} animate-fade-slide-up delay-100`}>Portfolio</span>
                    <h1 className={`${styles.heroTitle} animate-fade-slide-up delay-200`}>
                        Nasze wybrane
                        <br />
                        <span className={styles.accent}>realizacje.</span>
                    </h1>
                    <p className={`${styles.heroDesc} animate-fade-slide-up delay-400`}>
                        Zobacz, jak łączymy nowoczesny design, wydajność i strategię
                        konwersji, tworząc cyfrowe produkty dla liderów w swoich branżach.
                    </p>
                </div>
            </header>

            {/* ── Portfolio Section ── */}
            <section className={styles.portfolioSection}>
                <div className={styles.sectionInner}>
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section ref={ctaRef} className={`${styles.ctaSection} reveal-scale`}>
                <div className={styles.sectionInner}>
                    <h2 className={styles.ctaTitle}>
                        Gotowy na swój
                        <br />
                        <span className={styles.accent}>własny projekt?</span>
                    </h2>
                    <p className={styles.ctaDesc}>
                        Opowiedz nam o swojej wizji, a przygotujemy dedykowaną strategię i bezpłatną wycenę w ciągu 24 godzin.
                    </p>
                    <a href="mailto:kontakt@apixel.pl" className={styles.ctaButton}>
                        Skontaktuj się z nami →
                    </a>
                </div>
            </section>
        </main>
    );
}
