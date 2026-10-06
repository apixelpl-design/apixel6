import { previewMotion } from '../data/motion';
export function initSitePreviews() {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document
    .querySelectorAll<HTMLElement>('[data-site-preview]')
    .forEach((preview) => {
      const viewport = preview.querySelector<HTMLElement>(
        '[data-preview-viewport]',
      )!;
      const image = viewport.querySelector<HTMLImageElement>('img')!;
      let visible = false;
      let distance = 0;
      let offset = 0;
      let elapsed = 0;
      let previousTime = 0;
      let frame = 0;
      const hold = previewMotion.holdMs;
      let travel = previewMotion.minTravelMs;

      const render = () => {
        image.style.transform = `translate3d(0, ${-offset}px, 0)`;
      };
      const stop = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
      };
      const tick = (time: number) => {
        if (previousTime) elapsed += time - previousTime;
        previousTime = time;
        const phase = elapsed % (travel * 2 + hold * 2);
        let progress = 0;
        if (phase >= hold && phase < hold + travel)
          progress = (phase - hold) / travel;
        else if (phase >= hold + travel && phase < hold * 2 + travel)
          progress = 1;
        else if (phase >= hold * 2 + travel)
          progress = 1 - (phase - hold * 2 - travel) / travel;
        offset = (distance * (1 - Math.cos(Math.PI * progress))) / 2;
        render();
        frame = requestAnimationFrame(tick);
      };
      const update = () => {
        if (motion.matches) {
          offset = 0;
          elapsed = hold;
          render();
        }
        if (
          distance <= 2 ||
          !image.complete ||
          !image.naturalWidth ||
          !visible ||
          preview
            .closest('[data-project-slide]')
            ?.getAttribute('aria-hidden') === 'true' ||
          preview.closest<HTMLElement>('[data-project-carousel]')?.dataset
            .carouselRunning === 'false' ||
          motion.matches ||
          document.hidden
        )
          stop();
        else if (!frame) frame = requestAnimationFrame(tick);
      };
      const measure = () => {
        stop();
        distance = Math.max(0, image.offsetHeight - viewport.clientHeight);
        offset = Math.min(offset, distance);
        travel = Math.max(
          previewMotion.minTravelMs,
          (distance / previewMotion.pixelsPerSecond) * 1000,
        );
        // Keep the current image position when its frame changes size.
        elapsed =
          hold +
          (Math.acos(1 - 2 * (distance ? offset / distance : 0)) / Math.PI) *
            travel;
        render();
        update();
      };
      preview.addEventListener('site-preview-state', (event) => {
        if ((event as CustomEvent<{ reset?: boolean }>).detail.reset) {
          stop();
          offset = 0;
          elapsed = hold;
          render();
        }
        update();
      });
      image.addEventListener('load', measure);
      image.addEventListener('error', stop);
      document.addEventListener('visibilitychange', update);
      motion.addEventListener('change', update);
      const resize = new ResizeObserver(measure);
      resize.observe(viewport);
      resize.observe(image);
      new IntersectionObserver(
        (entries) => {
          visible =
            entries[0].isIntersecting &&
            entries[0].intersectionRatio > previewMotion.visibleThreshold;
          update();
        },
        { threshold: [0, previewMotion.visibleThreshold] },
      ).observe(viewport);
      measure();
    });
}
