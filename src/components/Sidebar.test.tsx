import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Article } from '../types';
import Sidebar from './Sidebar';

const presets: Article[] = [
  {
    id: 'preset-1',
    title: 'Preset article',
    content: '<p>a</p>',
    date: '2026-10-01T09:00:00.000Z',
  },
];

const uploads: Article[] = [
  {
    id: 'upload-1',
    title: 'My uploaded file',
    content: '<p>b</p>',
    date: '2026-10-02T09:00:00.000Z',
  },
];

describe('Sidebar', () => {
  it('renders the preset and uploaded article lists', () => {
    render(
      <Sidebar
        presets={presets}
        uploads={uploads}
        selectedId={null}
        onSelect={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Preset article' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'My uploaded file' })).toBeInTheDocument();
  });

  it('calls onSelect with the article id when an article is clicked', () => {
    const onSelect = vi.fn();
    render(
      <Sidebar
        presets={presets}
        uploads={uploads}
        selectedId={null}
        onSelect={onSelect}
        onDelete={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'My uploaded file' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('upload-1');
  });

  it('shows the language tag next to the article title', () => {
    render(
      <Sidebar
        presets={[{ ...presets[0], language: 'EN' }]}
        uploads={[]}
        selectedId={null}
        onSelect={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    const title = screen.getByRole('button', { name: 'Preset article' });
    const tag = screen.getByText('EN');

    expect(title.previousElementSibling).toBe(tag);
  });
});
