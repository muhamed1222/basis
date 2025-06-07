import { describe, it, expect, beforeEach } from 'vitest';
import {
  recordView,
  getAnalytics,
  clearAnalytics,
  setIncognito,
} from '../services/analytics';

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  clearAnalytics();
  setIncognito(false);
});

describe('analytics', () => {
  it('tracks views and unique views', () => {
    recordView();
    recordView();
    const data = getAnalytics();
    expect(data.views).toBe(2);
    expect(data.uniqueViews).toBe(1);
  });

  it('honors incognito mode', () => {
    setIncognito(true);
    recordView();
    expect(getAnalytics().views).toBe(0);
  });
});
