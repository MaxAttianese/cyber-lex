import { describe, expect, it } from 'vitest';
import { parseFile } from './fileParsers';

describe('parseFile language detection', () => {
  it('assigns the detected language to a parsed English text file', async () => {
    const file = new File(['The cat is on the mat and the dog is of the house.'], 'story.txt', {
      type: 'text/plain',
    });

    const article = await parseFile(file);

    expect(article.title).toBe('story');
    expect(article.language).toBe('EN');
  });

  it('assigns the detected language to a parsed Markdown file', async () => {
    const file = new File(
      ['# Titolo\n\nIl gatto è sul tavolo e la casa di Marco è di un amico.'],
      'articolo.md',
      { type: 'text/markdown' },
    );

    const article = await parseFile(file);

    expect(article.title).toBe('Titolo');
    expect(article.language).toBe('IT');
  });
});
