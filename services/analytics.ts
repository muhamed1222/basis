export interface Comment {
  id: string;
  text: string;
  createdAt: string;
}

export interface AnalyticsData {
  views: number;
  uniqueViews: number;
  linkClicks: Record<string, number>;
  reactions: Record<string, number>;
  comments: Comment[];
}

const STORAGE_KEY = 'analytics-data';
const INCOGNITO_KEY = 'analytics-incognito';

function emptyData(): AnalyticsData {
  return { views: 0, uniqueViews: 0, linkClicks: {}, reactions: {}, comments: [] };
}

function load(): AnalyticsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AnalyticsData) : emptyData();
  } catch {
    return emptyData();
  }
}

function save(data: AnalyticsData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function isIncognito(): boolean {
  return localStorage.getItem(INCOGNITO_KEY) === '1';
}

export function setIncognito(value: boolean) {
  localStorage.setItem(INCOGNITO_KEY, value ? '1' : '0');
}

export function recordView() {
  if (isIncognito()) return;
  const data = load();
  data.views += 1;
  if (!sessionStorage.getItem('unique-viewed')) {
    data.uniqueViews += 1;
    sessionStorage.setItem('unique-viewed', '1');
  }
  save(data);
}

export function recordLinkClick(id: string) {
  if (isIncognito()) return;
  const data = load();
  data.linkClicks[id] = (data.linkClicks[id] || 0) + 1;
  save(data);
}

export function recordReaction(emoji: string) {
  if (isIncognito()) return;
  const data = load();
  data.reactions[emoji] = (data.reactions[emoji] || 0) + 1;
  save(data);
}

export function addComment(text: string) {
  if (isIncognito()) return;
  const data = load();
  data.comments.push({
    id: Math.random().toString(36).slice(2),
    text,
    createdAt: new Date().toISOString(),
  });
  save(data);
}

export function deleteComment(id: string) {
  const data = load();
  data.comments = data.comments.filter((c) => c.id !== id);
  save(data);
}

export function getAnalytics(): AnalyticsData {
  return load();
}

export function clearAnalytics() {
  localStorage.removeItem(STORAGE_KEY);
}
