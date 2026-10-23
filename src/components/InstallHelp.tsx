import { createPortal } from 'react-dom';
import { isIosDevice } from '../utils/installPlatform';

interface InstallHelpProps {
  onClose: () => void;
}

const getInstructions = (): string[] => {
  if (isIosDevice()) {
    return [
      'Tap the Share button in Safari.',
      'Choose "Add to Home Screen".',
      'Confirm with "Add".',
    ];
  }

  return ['Open the File menu in Safari.', 'Choose "Add to Dock" (Safari 17 or later).'];
};

/** Rendered in a portal so no ancestor stacking context (e.g. the blurred header) can trap it. */
const InstallHelp = ({ onClose }: InstallHelpProps) =>
  createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-help-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-xl border border-purple-500/30 bg-black/80 p-6 shadow-neon backdrop-blur-md"
      >
        <h2 id="install-help-title" className="mb-4 text-xl text-fuchsia-400">
          Install CyberLex
        </h2>
        <ol className="mb-6 list-decimal space-y-2 pl-5 font-body text-sm text-purple-100/80 marker:text-pink-400">
          {getInstructions().map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-lg border border-purple-500/40 bg-purple-500/10 py-2 font-orbitron text-xs font-bold uppercase tracking-widest text-purple-200 transition hover:bg-purple-500/20"
        >
          Got it
        </button>
      </div>
    </div>,
    document.body,
  );

export default InstallHelp;
