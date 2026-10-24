import { useState } from 'react';
import logo from '../assets/logo.png';
import { useInstallPrompt } from '../hooks/useInstallPrompt';
import { isSafariLike } from '../utils/installPlatform';
import InstallHelp from './InstallHelp';
import SeasonalEasterEgg from './SeasonalEasterEgg';

const Header = () => {
  const { isStandalone, isInstalled, canPromptNatively, promptInstall } = useInstallPrompt();
  const [showInstallHelp, setShowInstallHelp] = useState(false);

  // Chromium: shown only when installable. Safari/iOS: no way to detect installability, so always offered.
  const showInstallButton = !isStandalone && !isInstalled && (canPromptNatively || isSafariLike());

  const handleInstallClick = () => {
    if (canPromptNatively) {
      void promptInstall();
    } else {
      setShowInstallHelp(true);
    }
  };

  return (
    <header className="relative flex w-full flex-col gap-4 rounded-xl border border-purple-500/30 bg-black/40 p-5 shadow-neon backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
      <div className="absolute -right-4 -top-4">
        <SeasonalEasterEgg />
      </div>

      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="CyberLex logo"
          className="h-10 w-10 animate-pulse rounded-lg object-contain shadow-neon"
        />
        <h1 className="font-orbitron bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 bg-clip-text text-3xl font-bold uppercase tracking-widest text-transparent md:text-4xl">
          CYBERLEX
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:justify-end">
        {showInstallButton && (
          <button
            type="button"
            onClick={handleInstallClick}
            className="rounded-lg border border-fuchsia-500/70 bg-fuchsia-500/10 px-4 py-2 font-orbitron text-xs font-bold uppercase tracking-widest text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.45)] transition hover:bg-fuchsia-500/20 hover:shadow-[0_0_25px_rgba(217,70,239,0.7)]"
          >
            DOWNLOAD APP
          </button>
        )}

        <span className="rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1 font-body text-xs uppercase tracking-widest text-purple-200">
          v0.1 · beta
        </span>
      </div>

      {showInstallHelp && <InstallHelp onClose={() => setShowInstallHelp(false)} />}
    </header>
  );
};

export default Header;
