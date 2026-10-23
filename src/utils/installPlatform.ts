/** Safari (macOS) and iOS/iPadOS cannot trigger an install prompt from JavaScript. */
export const isSafariLike = (): boolean => {
  const ua = navigator.userAgent;
  const isIos = /iPad|iPhone|iPod/.test(ua);
  const isMacSafari = /Safari/.test(ua) && !/Chrome|Chromium|Edg/.test(ua);
  return isIos || isMacSafari;
};

export const isIosDevice = (): boolean => /iPad|iPhone|iPod/.test(navigator.userAgent);
