export interface ProfileData {
  avatar: string | null;
  cover: string | null;
  slug: string;
  layout: string;
  color: string;
  blocks: Array<{ type: string; text?: string; url?: string; style?: string }>;
}

const STORAGE_KEY = 'profileCustomization';

export async function fetchProfile(): Promise<ProfileData> {
  await new Promise((r) => setTimeout(r, 300));
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as ProfileData;
    } catch {
      /* ignore */
    }
  }
  return {
    avatar: null,
    cover: null,
    slug: '',
    layout: 'feed',
    color: '#2f80ed',
    blocks: [],
  };
}

export async function saveProfile(data: ProfileData): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
