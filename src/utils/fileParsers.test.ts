import { describe, expect, it } from 'vitest';
import { markdownToHtml, plainTextToHtml } from './fileParsers';

describe('markdownToHtml', () => {
  it('converts an H1 heading', () => {
    expect(markdownToHtml('# Main title')).toBe('<h1>Main title</h1>');
  });

  it('converts an H2 heading', () => {
    expect(markdownToHtml('## Section')).toBe('<h2>Section</h2>');
  });

  it('converts bold text', () => {
    expect(markdownToHtml('This is **bold** text')).toBe(
      '<p>This is <strong>bold</strong> text</p>',
    );
  });

  it('escapes HTML in the source so it cannot be injected', () => {
    expect(markdownToHtml('<script>alert(1)</script>')).toBe(
      '<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>',
    );
  });
});

describe('plainTextToHtml (TXT heuristic)', () => {
  it('treats a short line without final punctuation, isolated by blank lines, as a subtitle', () => {
    const text = 'Short subtitle\n\nThis is a regular paragraph with a full stop.';

    expect(plainTextToHtml(text)).toBe(
      '<h2>Short subtitle</h2>\n<p>This is a regular paragraph with a full stop.</p>',
    );
  });

  it('keeps short lines ending with punctuation as paragraphs', () => {
    expect(plainTextToHtml('Fine.')).toBe('<p>Fine.</p>');
  });

  it('does not turn a wrapped line inside a paragraph into a subtitle', () => {
    const text = 'The first line of a paragraph\nand its continuation.';

    expect(plainTextToHtml(text)).toBe(
      '<p>The first line of a paragraph and its continuation.</p>',
    );
  });
});
