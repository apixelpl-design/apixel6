export const analytics = {
  measurementId: import.meta.env.PUBLIC_GA_MEASUREMENT_ID ?? '',
};
export const analyticsEnabled = /^G-[A-Z0-9]+$/.test(analytics.measurementId);
