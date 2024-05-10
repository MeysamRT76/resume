export function isMobileWidth() {
  const mobileWidthThreshold = 768; // This is a common threshold for mobile devices
  return window.innerWidth <= mobileWidthThreshold;
}
