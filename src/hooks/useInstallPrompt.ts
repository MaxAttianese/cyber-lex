import { useCallback, useEffect, useState } from 'react';

/** The `beforeinstallprompt` event is not part of the standard DOM typings. */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const INSTALLED_STORAGE_KEY = 'cyberlex:installed';

const detectStandalone = (): boolean =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

const readInstalledFlag = (): boolean => {
  try {
    return window.localStorage.getItem(INSTALLED_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

const writeInstalledFlag = (): void => {
  try {
    window.localStorage.setItem(INSTALLED_STORAGE_KEY, 'true');
  } catch {
    // Storage unavailable (private mode): the button may reappear in browser tabs.
  }
};

export const useInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone] = useState<boolean>(detectStandalone);
  const [isInstalled, setIsInstalled] = useState<boolean>(readInstalledFlag);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // Keep the event so the native prompt can be triggered from our own button.
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      writeInstalledFlag();
      setDeferredPrompt(null);
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<void> => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  return {
    isStandalone,
    isInstalled,
    /** True only on browsers that fire `beforeinstallprompt` (Chromium) and consider the app installable. */
    canPromptNatively: deferredPrompt !== null,
    promptInstall,
  };
};
