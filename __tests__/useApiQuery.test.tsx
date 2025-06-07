import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';
import { useApiQuery } from '../hooks/useApiQuery';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

describe('useApiQuery', () => {
  it('fetches and returns data', async () => {
    const mockData = { data: 5 };
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const schema = z.object({ data: z.number() });

    const { result } = renderHook(
      () => useApiQuery('key', 'https://example.com', schema),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });
  });
});
