import { z } from 'zod';
import { fetchJson } from './api';

const checkResponse = z.object({ unique: z.boolean() });
const registerResponse = z.object({ success: z.boolean() });

export async function checkSlugUnique(slug: string): Promise<{ unique: boolean }> {
}
