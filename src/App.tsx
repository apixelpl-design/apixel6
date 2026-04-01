/* ═══════════════════════════════════════════════════════
   App — APIXEL Landing Page
   ═══════════════════════════════════════════════════════ */
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Footer } from './components/Footer';
import { ServicesPage } from './components/ServicesPage';
import { VisibilityPage } from './components/VisibilityPage';
import { ContentPage } from './components/ContentPage';
import { PaidAdsPage } from './components/PaidAdsPage';
import { WebsitePage } from './components/WebsitePage';
import { AutomationPage } from './components/AutomationPage';
import { ContactPage } from './components/ContactPage';
import { WspolpracaPage } from './components/WspolpracaPage';
import { PageLoader } from './components/PageLoader';

function HomePage() {
    return (
        <>
            <Hero />
            <Services />
        </>
    );
}

export default function App() {
    return (
        <>
            <PageLoader />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/uslugi" element={<ServicesPage />} />
                <Route path="/widocznosc" element={<VisibilityPage />} />
                <Route path="/uslugi/content" element={<ContentPage />} />
                <Route path="/uslugi/reklamy" element={<PaidAdsPage />} />
                <Route path="/uslugi/strona" element={<WebsitePage />} />
                <Route path="/uslugi/automatyzacja" element={<AutomationPage />} />
                <Route path="/wspolpraca" element={<WspolpracaPage />} />
                <Route path="/kontakt" element={<ContactPage />} />
            </Routes>
            <Footer />
        </>
    );
}
