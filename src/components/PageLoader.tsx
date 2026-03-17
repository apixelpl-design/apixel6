import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Komponent narzędziowy (niewidoczny), który dba o to,
 * aby po każdej nawigacji (np. z Home do Usług), 
 * strona przewijała się natychmiast na samą górę.
 */
export function PageLoader() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
