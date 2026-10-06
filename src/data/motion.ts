export const previewMotion = {
  holdMs: 1400,
  minTravelMs: 5000,
  pixelsPerSecond: 35,
  visibleThreshold: 0.08,
};
export const carouselMotion = {
  transitionMs: 420,
  offsetPx: 24,
};

export const siteMotion = {
  revealMs: 380,
  heroMs: 440,
  interactionMs: 180,
  menuMs: 180,
  disclosureMs: 220,
  staggerMs: 50,
  maxStaggerMs: 100,
  distancePx: 10,
  mobileDistancePx: 6,
  startOpacity: 0.65,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

export const motionCssVariables = [
  `--motion-ui: ${siteMotion.interactionMs}ms`,
  `--motion-menu: ${siteMotion.menuMs}ms`,
  `--motion-disclosure: ${siteMotion.disclosureMs}ms`,
  `--motion-ease: ${siteMotion.easing}`,
].join(';');
