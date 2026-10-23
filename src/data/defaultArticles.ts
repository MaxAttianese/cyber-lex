import type { Article } from '../types';

export const defaultArticles: Article[] = [
  {
    id: 'default-developer-evolution',
    title: 'The Evolution of the Developer in the Age of AI',
    content: '<p>Placeholder text that I will replace with my article.</p>',
    date: '2026-10-01T09:00:00.000Z',
  },
  {
    id: 'default-do-not-open',
    title: 'DO NOT OPEN.txt',
    content:
      '<p>Congratulations, you found the easter egg! Remember to drink water and commit often.</p>',
    date: '2026-10-01T09:00:00.000Z',
    isEasterEgg: true,
  },
];
