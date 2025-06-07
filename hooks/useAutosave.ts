import { useEffect, useState } from 'react';

export function useAutosave<T>(userId: string, key: string, state: T) {
  const storageKey = `draft_${userId}_${key}`;
  const [saved, setSaved] = useState(true);

  // Save state to localStorage with debounce
  useEffect(() => {
    setSaved(false);
    const handle = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
        setSaved(true);
      } catch {
        setSaved(false);
      }
    }, 500);
    return () => clearTimeout(handle);
  }, [state, storageKey]);

  const loadDraft = (): T | undefined => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return undefined;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return undefined;
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(storageKey);
  };

  return { saved, loadDraft, clearDraft };
}
