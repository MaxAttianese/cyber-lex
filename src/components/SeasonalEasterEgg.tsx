import { useState } from 'react';
import { getSeasonalEvent, SEASONAL_EVENTS, type SeasonalEvent } from '../utils/seasonalEvents';

const pickRandom = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

/**
 * Dev-only override to preview an event on any day, e.g. `pnpm dev` then open
 * `http://localhost:5173/?egg=halloween`. Valid ids are the `id` fields in seasonalEvents.ts.
 */
const getForcedEvent = (): SeasonalEvent | null => {
  if (!import.meta.env.DEV) return null;
  const id = new URLSearchParams(window.location.search).get('egg');
  return SEASONAL_EVENTS.find((event) => event.id === id) ?? null;
};

const SeasonalEasterEgg = () => {
  const event = getForcedEvent() ?? getSeasonalEvent(new Date());
  const [emoji] = useState(() => (event ? pickRandom(event.emojis) : ''));
  if (!event) return null;

  return (
    <div
      tabIndex={0}
      aria-label={event.tooltip}
      className="group relative cursor-help rounded-full outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-purple-500/60 blur-md transition group-hover:bg-fuchsia-500/80"
      />
      <span
        aria-hidden="true"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/50 bg-black/80 text-xl shadow-[0_0_18px_rgba(168,85,247,0.8)] transition group-hover:scale-110"
      >
        {emoji}
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute right-0 top-full z-20 mt-2 w-max max-w-[240px] translate-y-1 rounded-lg border border-purple-500/40 bg-black/60 px-3 py-2 font-body text-xs text-purple-100 opacity-0 shadow-neon backdrop-blur-md transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        {event.tooltip}
      </span>
    </div>
  );
};

export default SeasonalEasterEgg;
