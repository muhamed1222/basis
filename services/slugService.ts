export async function checkSlugUnique(slug: string): Promise<{ unique: boolean }> {
  const response = await fetch(`/api/check-slug?slug=${encodeURIComponent(slug)}`);
  if (!response.ok) {
    throw new Error('Failed to check slug');
  }
  return response.json() as Promise<{ unique: boolean }>;
}

export async function registerSlug(slug: string): Promise<void> {
  const response = await fetch('/api/register-slug', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug }),
  });
  if (!response.ok) {
    throw new Error('Failed to register slug');
  }
}
