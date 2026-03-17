import { useEffect, useRef } from 'react';

/**
 * Intersection Observer hook that adds a `.revealed` class
 * when elements enter the viewport.
 *
 * Usage:
 *   const ref = useScrollReveal<HTMLElement>();
 *   <section ref={ref} className="reveal">…</section>
 *
 * Or for staggered children:
 *   const ref = useScrollReveal<HTMLDivElement>({ stagger: true });
 *   <div ref={ref} className="reveal-parent">
 *       <div className="reveal-child">…</div>
 *   </div>
 */
interface ScrollRevealOptions {
    /** Observe children with `.reveal-child` class instead of the element itself */
    stagger?: boolean;
    /** Viewport threshold (0-1). Default 0.15 */
    threshold?: number;
    /** Root margin. Default '0px 0px -60px 0px' */
    rootMargin?: string;
}

export function useScrollReveal<T extends HTMLElement>(
    opts: ScrollRevealOptions = {}
) {
    const ref = useRef<T>(null);
    const { stagger = false, threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = opts;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Respect prefers-reduced-motion
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
            // Immediately reveal everything
            if (stagger) {
                el.querySelectorAll('.reveal-child').forEach((child) =>
                    child.classList.add('revealed')
                );
            } else {
                el.classList.add('revealed');
            }
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold, rootMargin }
        );

        if (stagger) {
            el.querySelectorAll('.reveal-child').forEach((child) =>
                observer.observe(child)
            );
        } else {
            observer.observe(el);
        }

        return () => observer.disconnect();
    }, [stagger, threshold, rootMargin]);

    return ref;
}
