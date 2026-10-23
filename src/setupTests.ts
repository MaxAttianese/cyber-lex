import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
// Adds jest-dom matchers (toBeInTheDocument, toHaveTextContent, ...) to Vitest's expect.
import '@testing-library/jest-dom/vitest';

// Vitest globals are off, so Testing Library cannot auto-cleanup between tests.
afterEach(() => {
  cleanup();
});
