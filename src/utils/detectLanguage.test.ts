import { describe, expect, it } from 'vitest';
import { detectLanguage } from './fileParsers';

describe('detectLanguage', () => {
  it('detects English text', () => {
    expect(detectLanguage('This is the start of the story and the end of it.')).toBe('EN');
  });

  it('detects Italian text', () => {
    expect(detectLanguage('Il sistema è pronto e la rete di tutti gli utenti funziona.')).toBe(
      'IT',
    );
  });

  it('returns MIX when both languages are present in similar amounts', () => {
    expect(detectLanguage('The cat is sleeping. Il gatto e la casa di Marco.')).toBe('MIX');
  });

  it('returns MIX when no keyword is found', () => {
    expect(detectLanguage('xyz qwerty 12345')).toBe('MIX');
  });

  it('ignores case and punctuation around keywords', () => {
    expect(detectLanguage('THE END. And, of course, it is over!')).toBe('EN');
  });
});
