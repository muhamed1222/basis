import { fetchJson, ApiOptions } from './api';
import { z } from 'zod';

const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  role: z.union([z.literal('owner'), z.literal('editor')]),
});

export type User = z.infer<typeof userSchema>;

export async function login(email: string, password: string) {
  return fetchJson<User>('/api/login', userSchema, {
    method: 'POST',
    body: { email, password },
  });
}

export async function signup(email: string, password: string) {
  return fetchJson<User>('/api/signup', userSchema, {
    method: 'POST',
    body: { email, password },
  });
}

export async function logout(options: ApiOptions = { method: 'POST' }) {
  await fetchJson('/api/logout', z.any(), options);
}
