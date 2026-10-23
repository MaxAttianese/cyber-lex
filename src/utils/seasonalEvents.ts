export interface SeasonalEvent {
  id: string;
  /** One of these is picked at random each time the page loads. */
  emojis: string[];
  tooltip: string;
  matches: (date: Date) => boolean;
}

/** Anonymous Gregorian algorithm (Meeus/Jones/Butcher). */
export const getEasterSunday = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
};

/** US Thanksgiving: fourth Thursday of November. */
const getThanksgiving = (year: number): Date => {
  const firstOfNovember = new Date(year, 10, 1);
  const firstThursdayOffset = (4 - firstOfNovember.getDay() + 7) % 7;
  return new Date(year, 10, 1 + firstThursdayOffset + 21);
};

const addDays = (date: Date, days: number): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/** Fixed calendar date. `month` is 0-based (0 = January). */
const on = (month: number, day: number) => (date: Date) =>
  date.getMonth() === month && date.getDate() === day;

export const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    id: 'new-year',
    emojis: ['🥂', '🍾', '✨'],
    tooltip: 'Happy New Year, Chooms! 🎆',
    matches: (date) => on(11, 31)(date) || on(0, 1)(date),
  },
  {
    id: 'valentine',
    emojis: ['♥️', '🌹'],
    tooltip: "Happy Valentine's Day, Chooms! 💘",
    matches: on(1, 14),
  },
  {
    id: 'women-day',
    emojis: ['🌼', '💛'],
    tooltip: "Happy Women's Day! 🌼",
    matches: on(2, 8),
  },
  {
    id: 'st-patrick',
    emojis: ['🍀'],
    tooltip: "Happy St. Patrick's Day! 🍀",
    matches: on(2, 17),
  },
  {
    id: 'spring',
    emojis: ['🌸'],
    tooltip: 'Spring is here! 🌸',
    matches: on(2, 20),
  },
  {
    id: 'summer',
    emojis: ['☀️'],
    tooltip: 'Summer has started! ☀️',
    matches: on(5, 21),
  },
  {
    id: 'ferragosto',
    emojis: ['🏖️'],
    tooltip: 'Happy Ferragosto! 🍉',
    matches: on(7, 15),
  },
  {
    id: 'back-to-school',
    emojis: ['🎒', '📚', '✏️'],
    tooltip: 'Back to school, Chooms! 🎒',
    matches: on(8, 15),
  },
  {
    id: 'autumn',
    emojis: ['🍁'],
    tooltip: 'Autumn is here! 🍁',
    matches: on(8, 22),
  },
  {
    id: 'halloween',
    emojis: ['🎃'],
    tooltip: 'Happy Halloween, Chooms! 🎃',
    matches: on(9, 31),
  },
  {
    id: 'black-friday',
    emojis: ['🛍️'],
    tooltip: 'Black Friday deals! 🛍️',
    matches: (date) => isSameDay(date, addDays(getThanksgiving(date.getFullYear()), 1)),
  },
  {
    id: 'cyber-monday',
    emojis: ['💻'],
    tooltip: 'Cyber Monday deals! 💻',
    matches: (date) => isSameDay(date, addDays(getThanksgiving(date.getFullYear()), 4)),
  },
  {
    id: 'winter',
    emojis: ['❄️'],
    tooltip: 'Winter is here! ❄️',
    matches: on(11, 21),
  },
  {
    id: 'christmas',
    emojis: ['🎄'],
    tooltip: 'Merry Cyber-Xmas! 🎄',
    matches: on(11, 25),
  },
  {
    id: 'birthday',
    emojis: ['🐉'],
    tooltip: 'Happy Birthday to the Dev! 🐉',
    matches: on(11, 29),
  },
  {
    id: 'easter',
    emojis: ['🥚'],
    tooltip: 'Happy Easter! 🥚',
    matches: (date) => isSameDay(date, getEasterSunday(date.getFullYear())),
  },
];

/** Returns the seasonal event for the given day, or `null` on ordinary days. */
export const getSeasonalEvent = (date: Date): SeasonalEvent | null =>
  SEASONAL_EVENTS.find((event) => event.matches(date)) ?? null;
