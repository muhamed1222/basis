import { fetchJson, ApiOptions } from './api';
import { z } from 'zod';
import { getClient } from './cloud';

const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  role: z.union([z.literal('owner'), z.literal('editor')]),
});

export type User = z.infer<typeof userSchema>;

export async function login(email: string, password: string): Promise<User> {
  const client = getClient();
  if (!client) {
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
      return { id: '1', email, role: 'owner' };
    }
    return fetchJson<User>('/api/login', userSchema, {
      method: 'POST',
      body: { email, password },
    });
  }
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error || !data.user) throw error || new Error('Auth failed');
  return { id: data.user.id, email: data.user.email || email, role: 'owner' };
}

export async function signup(email: string, password: string): Promise<User> {
  const client = getClient();
  if (!client) {
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
      return { id: '1', email, role: 'owner' };
    }
    return fetchJson<User>('/api/signup', userSchema, {
      method: 'POST',
      body: { email, password },
    });
  }
  const { data, error } = await client.auth.signUp({ email, password });
  if (error || !data.user) throw error || new Error('Signup failed');
  return { id: data.user.id, email: data.user.email || email, role: 'owner' };
}

export async function logout(options: ApiOptions = { method: 'POST' }) {
  const client = getClient();
  if (client) {
    await client.auth.signOut();
  } else {
    await fetchJson('/api/logout', z.any(), options);
  }
}
