/**
 * Mobile checks
 * @module utils/mobile_utils.js
 */

const { navigator, document } = typeof window !== "undefined" ? window : {};

function isIpadOS() {
  return (
    navigator?.userAgent.match(/iPad/i) ||
    (navigator?.maxTouchPoints &&
      navigator?.maxTouchPoints > 2 &&
      /MacIntel/.test(navigator?.platform))
  );
}

export const isiPhone = !!(
  navigator?.userAgent.match(/iPhone/i) || navigator?.userAgent.match(/iPod/i)
);
export const isiPad = isIpadOS();
export const isAndroid = !!navigator?.userAgent.match(/Android/i);
export const isMobile = isiPhone || isiPad || isAndroid;
export const isDesktop = !isMobile;

document?.body.parentNode.classList.add(isDesktop ? "desktop" : "mobile");
