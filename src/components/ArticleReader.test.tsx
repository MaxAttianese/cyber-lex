import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Article } from '../types';
import ArticleReader from './ArticleReader';

const baseArticle: Article = {
  id: 'article-1',
  title: 'A test article',
  content: '<p>Body text.</p>',
  date: '2026-10-01T09:00:00.000Z',
};

describe('ArticleReader language badge', () => {
  it('shows the detected language when the article has one', () => {
    render(<ArticleReader article={{ ...baseArticle, language: 'EN' }} />);

    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('renders no badge when the article has no language', () => {
    render(<ArticleReader article={baseArticle} />);

    expect(screen.queryByText(/^(IT|EN|MIX)$/)).not.toBeInTheDocument();
  });

  it('places the badge after the title, never beside it', () => {
    render(<ArticleReader article={{ ...baseArticle, language: 'IT' }} />);

    const title = screen.getByRole('heading', { level: 1 });
    const badge = screen.getByText('IT');

    expect(title.compareDocumentPosition(badge) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(badge.parentElement).toBe(title.parentElement);
  });
});
