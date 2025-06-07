import { z } from 'zod';
import { fetchJson } from './api';

export const SlugCheckResponse = z.object({ unique: z.boolean() });

export async function checkSlugUnique(slug: string) {
  // Placeholder API call
  const url = `/api/check-slug?slug=${encodeURIComponent(slug)}`;
  const res = await fetchJson(url, SlugCheckResponse);
  return res.unique;
}

export async function publishProfile(slug: string, data: unknown) {
  const url = `/api/publish/${encodeURIComponent(slug)}`;
  await fetchJson(url, z.any(), { method: 'POST', body: data });
}
