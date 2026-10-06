import { carouselMotion } from '../data/motion';

export function initProjectCarousels() {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document
    .querySelectorAll<HTMLElement>('[data-project-carousel]')
    .forEach((carousel) => {
      if (carousel.dataset.carouselReady === 'true') return;
      const slides = [
        ...carousel.querySelectorAll<HTMLElement>('[data-project-slide]'),
      ];
      const pages = [
        ...carousel.querySelectorAll<HTMLButtonElement>('[data-carousel-page]'),
      ];
      const controls = carousel.querySelector<HTMLElement>(
        '.project-carousel-controls',
      );
      const status = carousel.querySelector<HTMLElement>(
        '[data-carousel-status]',
      );
      if (!slides.length) return;
      carousel.dataset.carouselReady = 'true';
      // Homepage screenshots stay still; only user-selected transitions move.
      carousel.dataset.carouselRunning = 'false';
      let active = 0;
      let animations: Animation[] = [];

      const clearTransition = () => {
        animations.forEach((animation) => animation.cancel());
        animations = [];
        slides.forEach((slide) => delete slide.dataset.exiting);
      };
      const resetPreviews = () => {
        carousel
          .querySelectorAll<HTMLElement>('[data-site-preview]')
          .forEach((preview) =>
            preview.dispatchEvent(
              new CustomEvent('site-preview-state', {
                detail: { reset: true },
              }),
            ),
          );
      };
      const show = (index: number, direction = 1) => {
        const selected = (index + slides.length) % slides.length;
        if (selected === active) return;
        clearTransition();
        const outgoing = slides[active];
        const moveFocus = outgoing.contains(document.activeElement);
        active = selected;
        slides.forEach((slide, index) => {
          const current = index === active;
          slide.dataset.active = String(current);
          slide.inert = !current;
          if (current) slide.removeAttribute('aria-hidden');
          else slide.setAttribute('aria-hidden', 'true');
        });
        pages.forEach((page, index) =>
          page.setAttribute('aria-pressed', String(index === active)),
        );
        if (status)
          status.textContent = slides[active].getAttribute('aria-label');
        if (moveFocus) pages[active]?.focus({ preventScroll: true });
        resetPreviews();
        if (motion.matches) return;

        const offset = direction * carouselMotion.offsetPx;
        const timing = {
          duration: carouselMotion.transitionMs,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        };
        outgoing.dataset.exiting = 'true';
        const exit = outgoing.animate(
          [
            { opacity: 1, transform: 'translate3d(0, 0, 0)' },
            { opacity: 0, transform: `translate3d(${-offset}px, 0, 0)` },
          ],
          timing,
        );
        exit.onfinish = () => delete outgoing.dataset.exiting;
        const enter = slides[active].animate(
          [
            { opacity: 0, transform: `translate3d(${offset}px, 0, 0)` },
            { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          ],
          timing,
        );
        animations = [exit, enter];
      };

      carousel
        .querySelector<HTMLButtonElement>('[data-carousel-prev]')
        ?.addEventListener('click', () => show(active - 1, -1));
      carousel
        .querySelector<HTMLButtonElement>('[data-carousel-next]')
        ?.addEventListener('click', () => show(active + 1, 1));
      pages.forEach((page, index) =>
        page.addEventListener('click', () =>
          show(index, index > active ? 1 : -1),
        ),
      );
      controls?.addEventListener('keydown', (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          const direction = event.key === 'ArrowLeft' ? -1 : 1;
          show(active + direction, direction);
        }
      });
      motion.addEventListener('change', () => {
        if (motion.matches) clearTransition();
      });
      resetPreviews();
    });
}
