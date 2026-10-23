import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SeasonalEasterEgg from './SeasonalEasterEgg';

describe('SeasonalEasterEgg', () => {
  beforeEach(() => {
    // Fake only the Date clock so React rendering is not affected.
    vi.useFakeTimers({ toFake: ['Date'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the pumpkin on October 31st', () => {
    vi.setSystemTime(new Date(2026, 9, 31, 12, 0, 0));

    render(<SeasonalEasterEgg />);

    expect(screen.getByText('🎃')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Happy Halloween, Chooms! 🎃');
  });

  it('renders nothing on an ordinary day', () => {
    vi.setSystemTime(new Date(2026, 9, 23, 12, 0, 0));

    const { container } = render(<SeasonalEasterEgg />);

    expect(container).toBeEmptyDOMElement();
  });
});
