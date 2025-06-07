import { sanitize } from '../utils/sanitize';
import { describe, it, expect } from 'vitest';

describe('sanitize', () => {
  it('escapes html', () => {
    expect(sanitize('<script>')).toBe('&lt;script&gt;');
  });
});
