export async function checkSlugUnique(slug: string): Promise<{ unique: boolean }> {
  const used = JSON.parse(localStorage.getItem('slugs') || '[]');
  const unique = !used.includes(slug);
  return new Promise((resolve) => setTimeout(() => resolve({ unique }), 500));
}

export function registerSlug(slug: string): void {
  const used = JSON.parse(localStorage.getItem('slugs') || '[]');
  if (!used.includes(slug)) {
    localStorage.setItem('slugs', JSON.stringify([...used, slug]));
  }
}
