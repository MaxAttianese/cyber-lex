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
      '<p>CRITICAL ERROR:</br> 1,432 malware files downloaded. Webcam activated. Hard drive wiping in 3... 2... 1...</br></br></br></br></br></br></br></br>...Just kidding! 😜 Your PC is completely fine. But seriously, why did you open this? Close it and go grab a coffee!</p>',
    date: '2026-10-01T09:00:00.000Z',
    isEasterEgg: true,
    language: 'EN',
  },
];
