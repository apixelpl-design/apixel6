import { previewMotion } from '../data/motion';

let cleanupCurrent: (() => void) | null = null;
let previewsPaused = false;

export function initSitePreviews() {
  cleanupCurrent?.();
  let disposed = false;
  const observers: { disconnect: () => void }[] = [];
  const stopAnimations: (() => void)[] = [];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 700px)');
  const control = document.querySelector<HTMLElement>(
    '[data-preview-motion-control]',
  );
  const toggle = control?.querySelector<HTMLButtonElement>(
    '[data-preview-motion-toggle]',
  );
  const label = control?.querySelector<HTMLElement>(
    '[data-preview-motion-label]',
  );
  const pauseIcon = control?.querySelector<HTMLElement>(
    '[data-preview-motion-icon="pause"]',
  );
  const playIcon = control?.querySelector<HTMLElement>(
    '[data-preview-motion-icon="play"]',
  );
  let paused = previewsPaused;
  let controlAvailable = false;
  let controlFrame = 0;
  let controlHeight = 44;
  const header = document.querySelector<HTMLElement>('.site-header');
  const previews: {
    available: () => boolean;
    rect: () => DOMRect;
    update: () => void;
  }[] = [];

  const syncControl = () => {
    if (disposed) return;
    if (controlFrame) return;
    controlFrame = requestAnimationFrame(() => {
      controlFrame = 0;
      const candidates = motion.matches
        ? []
        : previews.filter((preview) => preview.available());
      let available = Boolean(control && toggle && candidates.length);
      let top: number | undefined;

      // Batch geometry reads before changing the fixed control's placement.
      // On phones it stays on a screenshot, rather than covering its caption.
      if (mobile.matches && available) {
        const margin = 12;
        const safeBottom = control
          ? Number.parseFloat(
              getComputedStyle(control).getPropertyValue(
                '--preview-safe-bottom',
              ),
            ) || 0
          : 0;
        controlHeight = control?.offsetHeight || controlHeight;
        const headerBottom = Math.max(
          0,
          header?.getBoundingClientRect().bottom ?? 0,
        );
        let largestArea = 0;
        candidates.forEach((preview) => {
          const rect = preview.rect();
          const visibleTop = Math.max(rect.top, headerBottom);
          const visibleBottom = Math.min(
            rect.bottom,
            window.innerHeight - safeBottom,
          );
          const visibleHeight = visibleBottom - visibleTop;
          const visibleWidth =
            Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);
          const area = visibleHeight * visibleWidth;
          if (
            visibleHeight >= controlHeight + margin * 2 &&
            visibleWidth > 0 &&
            area > largestArea
          ) {
            largestArea = area;
            top = visibleBottom - controlHeight - margin;
          }
        });
        available = top !== undefined;
      }

      if (control) {
        if (mobile.matches && top !== undefined) {
          control.style.top = `${Math.round(top)}px`;
          control.style.bottom = 'auto';
        } else {
          control.style.removeProperty('top');
          control.style.removeProperty('bottom');
        }
        control.hidden = !available;
      }
      if (toggle) toggle.disabled = !available;
      if (label)
        label.textContent = paused ? 'Wznów podglądy' : 'Zatrzymaj podglądy';
      pauseIcon?.toggleAttribute('hidden', paused);
      playIcon?.toggleAttribute('hidden', !paused);
      if (available !== controlAvailable) {
        controlAvailable = available;
        // A clipped screenshot cannot keep moving without an accessible pause.
        previews.forEach((preview) => preview.update());
      }
    });
  };

  toggle?.addEventListener('click', () => {
    if (motion.matches) return;
    paused = !paused;
    previewsPaused = paused;
    previews.forEach((preview) => preview.update());
    syncControl();
  });
  const updateAll = () => {
    previews.forEach((preview) => preview.update());
    syncControl();
  };
  document.addEventListener('visibilitychange', updateAll);
  motion.addEventListener('change', updateAll);

  document
    .querySelectorAll<HTMLElement>('[data-site-preview]')
    .forEach((preview) => {
      // The homepage carousel uses static screenshots, including deferred ones.
      if (preview.closest('[data-project-carousel]')) return;
      const viewport = preview.querySelector<HTMLElement>(
        '[data-preview-viewport]',
      );
      const image = viewport?.querySelector<HTMLImageElement>('img');
      if (!viewport || !image) return;
      const interaction = preview.closest<HTMLElement>('a') ?? preview;
      let visible = false;
      let hovered = false;
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
      stopAnimations.push(stop);
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
        if (disposed) {
          stop();
          return;
        }
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
          !controlAvailable ||
          paused ||
          hovered ||
          interaction.contains(document.activeElement) ||
          preview
            .closest('[data-project-slide]')
            ?.getAttribute('aria-hidden') === 'true' ||
          motion.matches ||
          document.hidden
        )
          stop();
        else if (!frame) frame = requestAnimationFrame(tick);
      };
      const measure = () => {
        if (disposed) return;
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
        syncControl();
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
      image.addEventListener('error', () => {
        stop();
        syncControl();
      });
      preview.addEventListener('pointerenter', () => {
        hovered = true;
        update();
      });
      preview.addEventListener('pointerleave', () => {
        hovered = false;
        update();
      });
      interaction.addEventListener('focusin', update);
      interaction.addEventListener('focusout', () => queueMicrotask(update));
      const resize = new ResizeObserver(measure);
      observers.push(resize);
      resize.observe(viewport);
      resize.observe(image);
      const visibility = new IntersectionObserver(
        (entries) => {
          visible =
            entries[0].isIntersecting &&
            entries[0].intersectionRatio > previewMotion.visibleThreshold;
          update();
          syncControl();
        },
        { threshold: [0, previewMotion.visibleThreshold] },
      );
      observers.push(visibility);
      visibility.observe(viewport);
      previews.push({
        available: () => visible && distance > 2 && image.naturalWidth > 0,
        rect: () => viewport.getBoundingClientRect(),
        update,
      });
      measure();
    });
  if (previews.length) {
    window.addEventListener('scroll', syncControl, { passive: true });
    window.addEventListener('resize', syncControl, { passive: true });
    mobile.addEventListener('change', syncControl);
  }
  syncControl();
  cleanupCurrent = () => {
    disposed = true;
    stopAnimations.forEach((stop) => stop());
    observers.forEach((observer) => observer.disconnect());
    document.removeEventListener('visibilitychange', updateAll);
    motion.removeEventListener('change', updateAll);
    if (previews.length) {
      window.removeEventListener('scroll', syncControl);
      window.removeEventListener('resize', syncControl);
      mobile.removeEventListener('change', syncControl);
    }
    if (controlFrame) cancelAnimationFrame(controlFrame);
    if (control) control.hidden = true;
    cleanupCurrent = null;
  };
}
