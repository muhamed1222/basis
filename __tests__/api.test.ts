import { describe, it, expect, vi } from 'vitest';
import { fetchJson } from '../services/api';
import { z } from 'zod';

describe('fetchJson', () => {
  it('calls fetch with correct arguments', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ data: 1 }),
    } as Response;
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
    const schema = z.object({ data: z.number() });
    const result = await fetchJson('https://example.com', schema);
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://example.com',
      expect.any(Object)
    );
    expect(result.data).toBe(1);
    fetchSpy.mockRestore();
  });
});
